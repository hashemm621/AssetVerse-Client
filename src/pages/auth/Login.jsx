import React, { useState } from "react";
import { motion } from "framer-motion";
import MyContainer from "../../components/MyContainer";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {signIn,loading} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignin =async data => {
    const {email,password} = data
    try {
      await signIn(email,password)

      navigate(from,{replace:true})
      toast.success('Login Successful')
    } catch (error) {
      console.log(error);
      toast.error(error?.message)
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200">
      <MyContainer className="max-w-md w-full">
        <motion.div
          className="bg-white p-10 rounded-3xl shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-bold text-center text-primary mb-6">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Login to your AssetVerse account
          </p>

          <form
            onSubmit={handleSubmit(handleSignin)}
            className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="mb-2 font-medium text-gray-700">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  validate: {
                    minLength: v =>
                      v.length >= 6 ||
                      "Password must be at least 6 characters long",
                    hasUpper: v =>
                      /[A-Z]/.test(v) ||
                      "Password must contain at least 1 uppercase letter",
                    hasLower: v =>
                      /[a-z]/.test(v) ||
                      "Password must contain at least 1 lowercase letter",
                    hasSpecial: v =>
                      /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(v) ||
                      "Password must contain at least 1 special character",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary focus:outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-500 z-50 hover:text-primary">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-full py-3 mt-3 rounded-xl text-lg hover:bg-accent hover:border-0 transition">
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-primary font-semibold hover:underline">
              {loading?<span className="loading loading-bars loading-xl"></span>:'Sign Up'}
              
            </a>
          </div>
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default Login;
