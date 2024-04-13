import nodemailer from "nodemailer";

export const nodemailerSendEmail = async (code: string, email: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: "aruisialalin",
      pass: "unpbyxhnpcfecrzn",
    },
  });

  const mailOption = {
    from: "aruisialalin@yandex.ru",
    to: email,
    subject: "Confirm Code",
    html: `<div>${code}</div>`,
  };

  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    throw error;
  }
};
