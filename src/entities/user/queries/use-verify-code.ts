import { useMutation } from "@tanstack/react-query";
import { verifyCode } from "../actions/repository";

export function useVerifyCode() {
  const emailSignInMutation = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyCode({ email, code }),
  });

  return {
    isLoading: emailSignInMutation.isPending,
    isSuccess: emailSignInMutation.isSuccess,
    isError: emailSignInMutation.isError,
    verifyCode: emailSignInMutation.mutateAsync,
  };
}
