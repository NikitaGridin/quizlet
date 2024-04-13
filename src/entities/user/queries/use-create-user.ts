import { useMutation } from "@tanstack/react-query";
import { createUser } from "../actions/repository";

export function useCreateUser() {
  const emailSignInMutation = useMutation({
    mutationFn: (email: string) => createUser({ email }),
  });

  return {
    isLoading: emailSignInMutation.isPending,
    isSuccess: emailSignInMutation.isSuccess,
    isError: emailSignInMutation.isError,
    createUser: emailSignInMutation.mutateAsync,
  };
}
