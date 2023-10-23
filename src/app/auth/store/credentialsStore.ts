import { create } from "zustand";

const PASSWORD_LENGTH = 8;

interface PasswordsStore {
  password: string;
  confirmPassword: string;
  modifyField: (field: string, value: string) => void;
  passwordsValidated: () => boolean;
}

export const passwordsStore = create<PasswordsStore>((set, get) => ({
  password: "",
  confirmPassword: "",
  modifyField: (field, value) => set(() => ({ [field]: value })),
  passwordsValidated: () => {
    const { password, confirmPassword } = get();
    return password == confirmPassword && password.length >= PASSWORD_LENGTH;
  },
}));

interface CredentialsStore {
  email: string;
  password: string;
  confirmPassword: string;
  modifyField: (field: string, value: string) => void;
  passwordsValidated: () => boolean;
}

export const useBoundStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}));

const emailStore = create()((set) => ({
  email: "",
}));

export const credentialsStore = create((...a) => ({
  ...emailStore(...a),
  ...passwordsStore(...a),
}));
