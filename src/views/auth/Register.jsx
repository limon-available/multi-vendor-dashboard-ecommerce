import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import {
  seller_register,
  seller_google_login,
  seller_facebook_login,
  messageClear,
} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { facebookLogin } from "../../utils/facebookAuth";

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth,
  );

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_register(state));
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      dispatch(seller_google_login(tokenResponse.access_token)),
    onError: () => toast.error("Google sign-in failed"),
  });

  const handleFacebookLogin = async () => {
    try {
      const { accessToken } = await facebookLogin();
      dispatch(seller_facebook_login(accessToken));
    } catch (error) {
      toast.error(error.message || "Facebook sign-in failed");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex justify-center items-center px-4">
      <div className="w-[380px] text-[#ffffff] p-2 animate-fade-in-up">
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 p-7 rounded-2xl shadow-soft">
          <h2 className="text-2xl mb-1 font-bold font-display">Welcome to Ecommerce</h2>
          <p className="text-sm mb-5 font-medium text-white/70">
            Please register your account
          </p>

          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name</label>
              <input
                onChange={inputHandle}
                value={state.name}
                className="px-3 py-2.5 outline-none border border-white/20 bg-white/10 rounded-lg text-white placeholder-white/50 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/30 transition-all"
                type="text"
                name="name"
                placeholder="Name"
                id="name"
                required
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-2.5 outline-none border border-white/20 bg-white/10 rounded-lg text-white placeholder-white/50 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/30 transition-all"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                required
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-2.5 outline-none border border-white/20 bg-white/10 rounded-lg text-white placeholder-white/50 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/30 transition-all"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
              />
            </div>

            <div className="flex items-center w-full gap-3 mb-3">
              <input
                className="w-4 h-4 text-blue-600 overflow-hidden bg-gray-200 rounded border-gray-300 focus:ring-blue-500"
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox">
                {" "}
                I agree to privacy policy & treams
              </label>
            </div>

            <button
              type="submit"
              disabled={loader ? true : false}
              className="bg-gradient-to-r from-indigo-600 to-indigo-500 w-full hover:shadow-indigo-500/40 hover:shadow-lg font-semibold text-white rounded-lg px-7 py-2.5 mb-3 transition-all"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already Have an account ?{" "}
                <Link className="font-bold" to="/login">
                  Sing In
                </Link>{" "}
              </p>
            </div>

            <div className="w-full flex justify-center items-center mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="pb-1">Or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px] "></div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <div
                onClick={() => googleLogin()}
                className="w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden"
              >
                <span>
                  <FaGoogle />
                </span>
              </div>

              <div
                onClick={handleFacebookLogin}
                className="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden"
              >
                <span>
                  <FaFacebook />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
