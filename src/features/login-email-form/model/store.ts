import { create } from "zustand";

interface LoginEmailState {
  step: number;
  setStep: (step: number) => void;
  email: string;

  setEmail: (email: string) => void;
}

export const useLognEmailStore = create<LoginEmailState>()((set) => ({
  step: 0,
  setStep(step) {
    set({ step });
  },
  email: "",
  setEmail(email) {
    set({ email });
  },
}));
