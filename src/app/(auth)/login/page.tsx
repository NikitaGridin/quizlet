import { LoginEmailForm } from "@/features/login-email-form/pub/login-email-form";

type Props = {};

export default function Page({}: Props) {
  return (
    <main className="flex justify-center items-center h-screen">
      <LoginEmailForm />
    </main>
  );
}
