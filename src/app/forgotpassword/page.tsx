import AuthLayout from "@/components/authLayout";
import BackButton from "@/components/backButton";

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <BackButton />
      <h1 className="text-xl font-bold my-4 ">Reset your password</h1>

      <p className="text-sm mb-4">
        Tell us the email address associated with your Tabata Timer account, and
        we’ll send you an email with a link to reset your password.
      </p>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground [&>input]:outline-none"
        action="/auth/sign-in"
        method="post"
      >
        <input
          className="rounded-md px-4 py-2 border"
          id="email"
          name="email"
          placeholder="email"
          pattern=".+@.+\.com"
          required
        />
        <button
          formAction="/auth/sign-up"
          className="bg-gray-500 rounded px-4 py-2 text-white mb-2 hover:bg-gray-500 font-bold"
        >
          Reset password
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
