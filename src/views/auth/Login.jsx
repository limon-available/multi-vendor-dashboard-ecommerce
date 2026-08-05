import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { overrideStyle } from "../../utils/utils";
import {
  seller_login,
  seller_google_login,
  seller_facebook_login,
  messageClear,
  get_user_info,
} from "../../store/Reducers/authReducer";
import { useGoogleLogin } from "@react-oauth/google";
import { facebookLogin } from "../../utils/facebookAuth";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.auth,
  );

  const [state, setState] = useState({
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
    dispatch(seller_login(state));
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

      dispatch(get_user_info());

      dispatch(messageClear());
    }
  }, [successMessage, dispatch]);

  useEffect(() => {
    if (userInfo) {
      navigate("/seller/dashboard");
    }
  }, [userInfo, navigate]);
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage]);

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex justify-center items-center px-4">
      <div className="w-[380px] text-[#ffffff] p-2 animate-fade-in-up">
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 p-7 rounded-2xl shadow-soft">
          <h2 className="text-2xl mb-1 font-bold font-display">Welcome to Ecommerce</h2>
          <p className="text-sm mb-5 font-medium text-white/70">
            Please Sign In your account
          </p>

          <form onSubmit={submit}>
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

            <button
              type="submit"
              disabled={loader ? true : false}
              className="bg-gradient-to-r from-indigo-600 to-indigo-500 w-full hover:shadow-indigo-500/40 hover:shadow-lg font-semibold text-white rounded-lg px-7 py-2.5 mb-3 transition-all"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "Sign In"
              )}
            </button>

            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Don't Have an account ?{" "}
                <Link className="font-bold" to="/register">
                  Sign Up
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

export default Login;
