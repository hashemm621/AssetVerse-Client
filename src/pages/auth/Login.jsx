import React, { useState } from "react";
import { motion } from "framer-motion";
import MyContainer from "../../components/MyContainer";
import { Eye, EyeOff, ShieldCheck, UserCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate, Link } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    setValue, 
    formState: { errors },
  } = useForm();

  const handleSignin = async (data) => {
    const { email, password } = data;
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  
  const handleDemoLogin = (role) => {
    const credentials = {
      hr: { email: "tom@cruise.com", pass: "Aaaa@2" },
      employee: { email: "lina@lina.com", pass: "Aaaa@2" },
    };

    const user = role === "hr" ? credentials.hr : credentials.employee;
    

    setValue("email", user.email);
    setValue("password", user.pass);
    handleSignin({ email: user.email, password: user.pass });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <MyContainer className="max-w-md w-full">
        <motion.div
          className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Welcome <span className="text-primary">Back</span>
            </h2>
            <p className="text-sm font-medium text-slate-400 mt-2">
              Access your AssetVerse dashboard
            </p>
          </div>


          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              type="button"
              onClick={() => handleDemoLogin("hr")}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-all group"
            >
              <ShieldCheck className="text-blue-500 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">Demo HR</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("employee")}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 transition-all group"
            >
              <UserCircle className="text-emerald-500 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Demo Staff</span>
            </button>
          </div>

          <div className="divider text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-8">OR LOGIN WITH EMAIL</div>

          <form onSubmit={handleSubmit(handleSignin)} className="space-y-5">
            <div className="flex flex-col">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full h-12 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 focus:outline-none font-medium"
              />
              {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col relative">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input input-bordered w-full h-12 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 focus:outline-none pr-12 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-slate-300 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full h-14 rounded-2xl text-white font-black text-lg border-none shadow-lg shadow-blue-100 mt-4 normal-case tracking-wide"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-bold text-slate-400">
            New here?{" "}
            <Link to="/register" className="text-primary hover:underline ml-1">
              Create an account
            </Link>
          </p>
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default Login;