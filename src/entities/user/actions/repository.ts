"use server";
import { db } from "@/shared/lib/db";
import { nodemailerSendEmail } from "@/shared/lib/nodemailer";
import { generateCode } from "@/shared/lib/react";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

type SendCode = {
  email: string;
};

type VerifyCode = {
  email: string;
  code: string;
};

type CreateUser = {
  email: string;
};

const CODE_EXPIRATION_TIME = 5 * 60000; // 5 minutes in milliseconds
const CODE_LENGTH = 8;

export const sendCode = async ({ email }: SendCode) => {
  const currentTime = new Date();

  try {
    const existingCode = await db.confirmCode.findUnique({
      where: { email },
    });

    if (existingCode) {
      if (existingCode.expires_at > currentTime) {
        await nodemailerSendEmail(existingCode.code, email);
      } else {
        const newCode = generateCode(CODE_LENGTH);
        const newExpiresAt = new Date(
          currentTime.getTime() + CODE_EXPIRATION_TIME
        );

        await db.confirmCode.update({
          where: { email },
          data: { code: newCode, expires_at: newExpiresAt },
        });

        await nodemailerSendEmail(newCode, email);
      }
    } else {
      const newCode = generateCode(CODE_LENGTH);
      const expires_at = new Date(currentTime.getTime() + CODE_EXPIRATION_TIME);
      await db.confirmCode.create({
        data: { email, code: newCode, expires_at },
      });
      await nodemailerSendEmail(newCode, email);
    }
  } catch (error) {
    throw error;
  }
};

export const verifyCode = async ({ email, code }: VerifyCode) => {
  try {
    const existingCode = await db.confirmCode.findUnique({
      where: { email },
    });

    if (existingCode) {
      if (existingCode.code === code) {
        const user = await db.user.findUnique({
          where: { email },
        });
        if (user) {
          const token = jwt.sign({ user }, "secret");
          cookies().set("token", token);
        } else {
          const newUser = await db.user.create({ data: { email } });
          const token = jwt.sign({ newUser }, "secret");
          cookies().set("token", token);
        }
      } else {
        throw "Invalid Code!";
      }
    } else {
      throw "Code not found!";
    }
  } catch (error) {
    throw error;
  }
};

export const createUser = async ({ email }: CreateUser) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    if (user) {
      const token = jwt.sign({ user }, "secret");
      cookies().set("token", token);
    } else {
      const newUser = await db.user.create({ data: { email } });
      const token = jwt.sign({ newUser }, "secret");
      cookies().set("token", token);
    }
  } catch (error) {
    throw error;
  }
};
