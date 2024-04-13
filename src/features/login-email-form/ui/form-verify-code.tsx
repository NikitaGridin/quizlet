"use client";

import { useVerifyCode } from "@/entities/user/queries/use-verify-code";
import { Button } from "@/shared/ui/button";
import { InputOTP, InputOTPSlot } from "@/shared/ui/input-otp";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useLognEmailStore } from "../model/store";

export function FormVerifyCode() {
  const router = useRouter();
  const { email } = useLognEmailStore();

  const [code, setCode] = useState("");
  const { verifyCode, isLoading, isError, isSuccess } = useVerifyCode();
  const handleSendCode = (e: FormEvent) => {
    e.preventDefault();
    verifyCode({ email, code });
  };

  const disabled = !code || isLoading || code.length != 8;

  useEffect(() => {
    if (isSuccess) {
      router.replace("/");
    }
    if (isError) {
      return alert("Ошибка!");
    }
  }, [isSuccess, isError]);

  return (
    <form
      className="border shadow-lg p-4 rounded-lg flex flex-col gap-4 bg-white"
      onSubmit={handleSendCode}
    >
      <h1 className="text-xl font-semibold">Введите код подтверждения</h1>
      <InputOTP maxLength={8} value={code} onChange={(value) => setCode(value)}>
        <InputOTPSlot index={0} className="border rounded-lg border-gray-400" />
        <InputOTPSlot index={1} className="border rounded-lg border-gray-400" />
        <InputOTPSlot index={2} className="border rounded-lg border-gray-400" />
        <InputOTPSlot index={3} className="border rounded-lg border-gray-400" />
        <InputOTPSlot index={4} className="border rounded-lg border-gray-400" />
        <InputOTPSlot index={5} className="border rounded-lg border-gray-400" />
        <InputOTPSlot index={6} className="border rounded-lg border-gray-400" />
        <InputOTPSlot index={7} className="border rounded-lg border-gray-400" />
      </InputOTP>
      <Button type="submit" disabled={disabled}>
        Отправить
      </Button>
    </form>
  );
}
