import { create, StateCreator } from "zustand";

const PASSWORD_LENGTH = 8;

/****** Interfaces *******/

interface EmailSlice {
  email: string;
}

interface PasswordsSlice {
  password: string;
  confirmPassword: string;
  passwordValidated: () => boolean;
  passwordsValidated: () => boolean;
}

interface ModifySlice {
  modifyField: (field: string, value: string) => void;
}

/*********************/

/****** Slices *******/

const createPasswordsSlice: StateCreator<
  PasswordsSlice & EmailSlice,
  [],
  [],
  PasswordsSlice
> = (_, get) => ({
  password: "",
  confirmPassword: "",
  passwordValidated: () => {
    const { password } = get();
    return password.length >= PASSWORD_LENGTH;
  },
  passwordsValidated: () => {
    const { password, confirmPassword } = get();
    return password == confirmPassword && password.length >= PASSWORD_LENGTH;
  },
});

const createEmailSlice: StateCreator<
  PasswordsSlice & EmailSlice,
  [],
  [],
  EmailSlice
> = () => ({
  email: "",
});

const createModifySlice: StateCreator<
  PasswordsSlice & EmailSlice,
  [],
  [],
  ModifySlice
> = (set) => ({
  modifyField: (field, value) => set(() => ({ [field]: value })),
});

/*********************/

/****** Store *******/

export const useCredentialsStore = create<
  PasswordsSlice & EmailSlice & ModifySlice
>()((...a) => ({
  ...createEmailSlice(...a),
  ...createPasswordsSlice(...a),
  ...createModifySlice(...a),
}));
