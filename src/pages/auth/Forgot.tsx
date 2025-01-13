import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface ForgotFormProps {
  email: string;
  new_password: string;
}

interface ForgotProps {
  setPage: (page: string) => void;
}

const Forgot: React.FC<ForgotProps> = (props) => {
  const [forgotForm, setForgotForm] = useState<ForgotFormProps>({
    email: "",
    new_password: "",
  });

  const onChangeForm = (label: keyof ForgotFormProps, event: ChangeEvent<HTMLInputElement>) => {
    setForgotForm({ ...forgotForm, [label]: event.target.value });
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8888/auth/forgot-password", forgotForm);
      toast.success(response.data.detail);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "An error occurred");
    }
  };

  return (
    <React.Fragment>
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          Forgot your password ?
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold  tracking-wide cursor-pointer mx-auto">
          Now update your password account!
        </p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => onChangeForm("email", event)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => onChangeForm("new_password", event)}
          />
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-3 w-64 text-xl text-white bg-yellow-400 rounded-2xl hover:bg-yellow-300 active:bg-yellow-500 outline-none"
          >
            Update Password
          </button>
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/?signin"
              onClick={() => {
                props.setPage("login");
              }}
            >
              <span className="underline cursor-pointer">Sign In</span>
            </Link>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Forgot;
