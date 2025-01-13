import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface RegisterProps {
  setPage: (page: string) => void;
}

interface FormRegister {
  name: string;
  username: string;
  email: string;
  phone_number: string;
  password: string;
  birth: string;
  sex: string;
  profile: string;
}

interface Option {
  value: string;
  label: string;
}

const Register: React.FC<RegisterProps> = (props) => {
  const options: Option[] = [
    { value: "", label: "Select Your gender !" },
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
  ];

  const navigate = useNavigate();

  // Register Form
  const [formRegister, setFormRegister] = useState<FormRegister>({
    name: "",
    username: "",
    email: "",
    phone_number: "",
    password: "",
    birth: "",
    sex: "",
    profile: "",
  });

  // Default value for DatePicker
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  // Convert date to string in DD-MM-YYYY format
  const formatDate = (date: Date): string => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day, month, year].join("-");
  };

  const onChangeForm = (label: keyof FormRegister, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.value;
    switch (label) {
      case "email":
        // Email validation
        const emailValidation = /\S+@\S+\.\S+/;
        if (emailValidation.test(value)) {
          setFormRegister({ ...formRegister, email: value });
        }
        break;
      case "birth":
        if (event.target instanceof HTMLInputElement) {
          const date = new Date(value);
          setBirthDate(date);
          setFormRegister({ ...formRegister, birth: formatDate(date) });
        }
        break;
      default:
        setFormRegister({ ...formRegister, [label]: value });
    }
  };

  const onDateChange = (date: Date | null) => {
    if (date) {
      setBirthDate(date);
      setFormRegister({ ...formRegister, birth: formatDate(date) });
    }
  };

  // Submit handler
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8888/auth/register", formRegister);
      navigate("/?signin");
      toast.success(response.data.detail);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Registration failed.");
    }
  };

  return (
    <React.Fragment>
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          Create An Account
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold  tracking-wide cursor-pointer mx-auto">
          Welcome to Resume Maker!
        </p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => onChangeForm("name", event)}
          />
          <DatePicker
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            dateFormat="dd-MM-yyyy"
            placeholderText="Birth date"
            selected={birthDate}
            onChange={onDateChange}
          />
          <select
            value={formRegister.sex}
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => onChangeForm("sex", event)}
          >
            {options.map((data) => (
              <option key={data.label} value={data.value} disabled={!data.value}>
                {data.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Username"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => onChangeForm("username", event)}
          />
          {/* <input
            type="number"
            placeholder="Phone number"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => onChangeForm("phone_number", event)}
          /> */}
          <input
            type="email"
            placeholder="Email"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => onChangeForm("email", event)}
          />
          <input
            type="password"
            placeholder="Password"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => onChangeForm("password", event)}
          />
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-3 w-64 text-xl text-white bg-yellow-400 rounded-2xl hover:bg-yellow-300 active:bg-yellow-500 outline-none"
          >
            Create Account
          </button>
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/?signin"
              onClick={() => props.setPage("login")}
            >
              <span className="underline cursor-pointer">Sign In</span>
            </Link>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Register;
