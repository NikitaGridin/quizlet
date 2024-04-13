"use client";

import { useSendCode } from "@/entities/user/queries/use-send-code";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { FormEvent, useEffect } from "react";
import { useLognEmailStore } from "../model/store";

export function FormSendCode() {
  const { setStep, step, email, setEmail } = useLognEmailStore();
  const { sendCode, isLoading, isError, isSuccess } = useSendCode();

  const handleSendCode = (e: FormEvent) => {
    e.preventDefault();
    sendCode(email);
  };
  const disabled = isLoading || !email;

  useEffect(() => {
    if (isSuccess) {
      return setStep(step + 1);
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
      <h1 className="text-xl font-semibold">Вход</h1>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" disabled={disabled}>
        Войти
      </Button>
    </form>
  );
}
