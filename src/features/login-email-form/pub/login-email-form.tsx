"use client";

import { useLognEmailStore } from "../model/store";
import { FormSendCode } from "../ui/form-send-code";
import { FormVerifyCode } from "../ui/form-verify-code";
import { GoogleLoginButton } from "../ui/google-login-button";

export function LoginEmailForm() {
  const { step } = useLognEmailStore();

  return (
    <div>
      {step === 0 ? (
        <>
          <FormSendCode />
          <GoogleLoginButton />
        </>
      ) : (
        <FormVerifyCode />
      )}
    </div>
  );
}
