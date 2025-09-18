import { useActiveAuthProvider } from "@refinedev/core";
import { useMutation } from "@tanstack/react-query";
import type { AuthProvider } from "refine-pocketbase";

export const useOtp = ({
  onError,
  onSuccess,
}: {
  onError: (e: Error) => void;
  onSuccess: () => void;
}) => {
  const auth = useActiveAuthProvider() as Partial<AuthProvider>;

  if (!auth.requestOtp) {
    throw Error("auth provider must implement requestOtp");
  }

  return useMutation({
    mutationFn: auth.requestOtp,
    onError,
    onSuccess,
  });
}
