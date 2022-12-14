import React, { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Firebase/Authprovider";
import UserToken from "../../Hooks/UserToken";

const Signup = () => {
  const [signuperror, setsignuperror] = useState("");
  const { signup, updateUser, google } = useContext(AuthContext);
  const [createdemail, setcreatedEmail] = useState("");
  const [token] = UserToken(createdemail);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (token) {
    navigate("/");
  }

  const handlesignup = (data) => {
    console.log(data);
    setsignuperror("");
    signup(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("user create successfully");
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            // sakibuser(data.name, user.email);
            sakibuser(data.name, user.email);
          })

          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
        setsignuperror(error.message);
      });
  };
  /////////////////////////////////
  const handlegooglesingin = () => {
    google()
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => console.error(error));
  };

  const sakibuser = (name, email) => {
    const user = { name, email };
    fetch("https://last-assignment-server-eta.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("save user:", data);
        setcreatedEmail(email);
        console.log({ setcreatedEmail: email });
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 bg-slate-700 p-8">
        <h1 className="text-3xl mb-10 font-semibold text-center text-red-600">
          SIGNUP
        </h1>
        <form onSubmit={handleSubmit(handlesignup)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-2xl font-semibold text-white">
                Name:
              </span>
            </label>
            <input
              type="text"
              {...register("name", { required: "name is required" })}
              className="input input-bordered"
            />
            {errors.name && (
              <p className="text-red-600" role="alert">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-2xl font-semibold text-white">
                Email:
              </span>
            </label>
            <input
              type="email"
              {...register("email", { required: "email is required" })}
              className="input input-bordered"
            />
            {errors.email && (
              <p className="text-red-600" role="alert">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-xs mb-4">
            <label className="label">
              <span className="label-text  text-2xl font-semibold text-white">
                Password:
              </span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "password is required",
                minLength: { value: 6, message: "atleast 6 characters" },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,

                  message: "password strong",
                },
              })}
              className="input input-bordered"
            />
            {errors.password && (
              <p className="text-red-600" role="alert">
                {errors.password?.message}
              </p>
            )}
          </div>

          <input
            type="submit"
            className="btn btn-success w-full font-bold text-xl text-white"
            value="Sign Up"
          />
          <div>
            {signuperror && (
              <p className="text-red-600" role="alert">
                {signuperror}
              </p>
            )}
          </div>
        </form>
        <p className="text-white">
          Already have an account?
          <Link className="text ml-2  text-secondary font-bold" to={"/login"}>
            Login
          </Link>
        </p>
        <div className="divider text-white">OR</div>
        <button
          onClick={handlegooglesingin}
          className="btn btn-primary w-full font-bold"
        >
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Signup;
