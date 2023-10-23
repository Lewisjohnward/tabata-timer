import { create, StateCreator } from "zustand";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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

interface ResetPasswordStore {
  password: string;
  confirmPassword: string;
  modifyField: (field: string, value: string) => void;
  passwordValidated: () => boolean;
  passwordsValidated: () => boolean;
  loading: boolean;
  toggleLoading: () => void;
  user: any;
  getUser: () => void;
  updatePassword: (password: string) => void;
}

export const resetPasswordStore = create<ResetPasswordStore>()((set, get) => ({
  password: "",
  confirmPassword: "",
  modifyField: (field, value) => set(() => ({ [field]: value })),
  passwordValidated: () => {
    const { password } = get();
    return password.length >= PASSWORD_LENGTH;
  },
  passwordsValidated: () => {
    const { password, confirmPassword } = get();
    return password == confirmPassword && password.length >= PASSWORD_LENGTH;
  },
  user: {},
  getUser: async () => {
    const supabase = createClientComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    set(() => ({ user }));
  },
  loading: false,
  toggleLoading: () => set((state) => ({ loading: !state.loading })),
  updatePassword: async (password: string) => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.updateUser({ password });
    console.log(error);
  },
}));
