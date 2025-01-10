/* eslint-disable default-case */
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  setPage: (page: string) => void;
}

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC<Props> = (props) => {
  const [loginForm, setLoginform] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const onChangeForm = (label: keyof LoginForm, event: ChangeEvent<HTMLInputElement>) => {
    setLoginform({ ...loginForm, [label]: event.target.value });
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(loginForm);
    try {
      const response = await axios.post<{ detail: string, result: { access_token: string, token_type: string } }>("http://localhost:8888/auth/login", loginForm);
      console.log(response);
      // Save token to local storage
      localStorage.setItem("auth_token", response.data.result.access_token);
      localStorage.setItem(
        "auth_token_type",
        response.data.result.token_type
      );

      // add successfully notif
      toast.success(response.data.detail);
      // reload page after success login
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      // add error notif
      console.log(error);
      toast.error(error.response?.data.detail || "An error occurred");
    }
  };

  return (
    <React.Fragment>
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          Welcome to Resume Maker
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
          Please login to your account!
        </p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            value={loginForm.username}
            onChange={(event) => onChangeForm("username", event)}
          />
          <input
            type="password"
            placeholder="Password"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            value={loginForm.password}
            onChange={(event) => onChangeForm("password", event)}
          />
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-3 w-64 text-xl text-white bg-yellow-400 rounded-2xl hover:bg-yellow-300 active:bg-yellow-500 outline-none"
          >
            Sign In
          </button>
          <p className="mt-4 text-sm">
            You don't have an account?{" "}
            <Link
              to="/?register"
              onClick={() => {
                props.setPage("register");
              }}
            >
              <span className="underline cursor-pointer">Register</span>
            </Link>{" "}
            or{" "}
            <Link
              to="/?forgot"
              onClick={() => {
                props.setPage("forgot");
              }}
            >
              <span className="underline cursor-pointer">Forgot Password?</span>
            </Link>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
