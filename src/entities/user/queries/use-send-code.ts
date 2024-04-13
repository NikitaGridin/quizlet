import { useMutation } from "@tanstack/react-query";
import { sendCode } from "../actions/repository";

export function useSendCode() {
  const emailSignInMutation = useMutation({
    mutationFn: (email: string) => sendCode({ email }),
  });

  return {
    isLoading: emailSignInMutation.isPending,
    isSuccess: emailSignInMutation.isSuccess,
    isError: emailSignInMutation.isError,
    sendCode: emailSignInMutation.mutateAsync,
  };
}
