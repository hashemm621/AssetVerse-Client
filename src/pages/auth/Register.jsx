import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserTie, FaUsers, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

const Register = () => {
  const [role, setRole] = useState("");
  const [showPassHR, setShowPassHR] = useState(false);
  const [showPassEmployee, setShowPassEmployee] = useState(false);

  // HR form
  const {
    register: registerHR,
    handleSubmit: handleHRSubmit,
    formState: { errors: hrErrors },
  } = useForm();

  // Employee form
  const {
    register: registerEmployee,
    handleSubmit: handleEmployeeSubmit,
    formState: { errors: employeeErrors },
  } = useForm();

  // handle HR
  const handleHrRegister = data => {
    console.log("Hr data ==>", data);
  };

  // handle Employee
  const handleEmployeeRegister = data => {
    console.log("Employ data ==>", data);
  };

  const fade = {
    initial: { opacity: 0, y: 20, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.97 },
    transition: { duration: 0.35, ease: "easeOut" },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center px-4 py-10">
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl bg-base-100/80 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-primary text-center mb-8">
          Create Your Account
        </h2>

        {/* Role Select */}
        <div className="form-control mb-8">
          <label className="label text-lg font-semibold mr-3">
            Register As
          </label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="select select-bordered select-lg">
            <option value="">Select Role…</option>
            <option value="hr">HR Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <AnimatePresence mode="wait">
          {/* HR Form */}
          {role === "hr" && (
            <motion.form
            key='hr'
              onSubmit={handleHRSubmit(handleHrRegister)}
              {...fade}
              className="space-y-4">
              <div className="flex items-center gap-3 text-xl font-semibold mb-4">
                <FaUserTie className="text-primary text-2xl" />
                HR Manager Registration
              </div>

              {/* Company Name */}
              <div className="flex flex-col gap-2">
                <label className="font-medium">Company Name:</label>
                <input
                  {...registerHR("companyName", {
                    required: "Company Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Name can only contain letters and spaces",
                    },
                    validate: v =>
                      v.trim().length > 0 || "Name cannot be empty spaces",
                  })}
                  type="text"
                  className="input input-bordered"
                  placeholder="Enter company name"
                />
                {hrErrors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {hrErrors.companyName.message}
                  </p>
                )}
              </div>

              {/* HR Full Name */}
              <div className="flex flex-col gap-2">
                <label className="font-medium">Full Name:</label>
                <input
                  {...registerHR("name", {
                    required: "Full Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Name can only contain letters and spaces",
                    },
                    validate: v =>
                      v.trim().length > 0 || "Name cannot be empty spaces",
                  })}
                  type="text"
                  className="input input-bordered"
                  placeholder="Enter your full name"
                />
                {hrErrors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {hrErrors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="font-medium">Email:</label>
                <input
                  {...registerHR("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  type="email"
                  className="input input-bordered"
                  placeholder="Enter email"
                />
                {hrErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {hrErrors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 relative">
                <label className="font-medium">Password:</label>
                <input
                  type={showPassHR ? "text" : "password"}
                  {...registerHR("password", {
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
                  className="input input-bordered pr-12"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="absolute right-3 md:right-48 top-10 z-50 text-xl text-gray-500 hover:text-primary"
                  onClick={() => setShowPassHR(!showPassHR)}>
                  {showPassHR ? <FaEyeSlash /> : <FaEye />}
                </button>
                {hrErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {hrErrors.password.message}
                  </p>
                )}
              </div>

              {/* Free Package Note */}
              <p className="text-sm text-info mt-1">
                🎁 You will automatically receive a free package for 5
                employees.
              </p>

              <button
                className="btn btn-primary btn-lg w-full mt-4"
                type="submit">
                Register as HR Manager
              </button>

              <p>
                Already Have an Account?{" "}
                <Link
                  className="ms-3 text-blue-600 underline"
                  to={"/login"}>
                  Sign in
                </Link>
              </p>
            </motion.form>
          )}

          {/* Employee Form */}
          {role === "employee" && (
            <motion.form
            key={'employee'}
              onSubmit={handleEmployeeSubmit(handleEmployeeRegister)}
              {...fade}
              className="space-y-4">
              <div className="flex items-center gap-3 text-xl font-semibold mb-4">
                <FaUsers className="text-secondary text-2xl" />
                Employee Registration
              </div>

              {/* Employee Name */}
              <div className="flex flex-col gap-2">
                <label className="font-medium">Full Name:</label>
                <input
                  {...registerEmployee("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Name can only contain letters and spaces",
                    },
                    validate: v =>
                      v.trim().length > 0 || "Name cannot be empty spaces",
                  })}
                  type="text"
                  className="input input-bordered"
                  placeholder="Enter full name"
                />
                {employeeErrors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {employeeErrors.name.message}
                  </p>
                )}
              </div>

              {/* Profile Image */}
              <div className="flex flex-col gap-2">
                <label className="font-medium">Profile Image:</label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Enter profile image link"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="font-medium">Email:</label>
                <input
                  {...registerEmployee("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  type="email"
                  className="input input-bordered"
                  placeholder="Enter email"
                />
                {employeeErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {employeeErrors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 relative">
                <label className="font-medium">Password:</label>
                <input
                  type={showPassEmployee ? "text" : "password"}
                  {...registerEmployee("password", {
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
                  className="input input-bordered pr-12"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="absolute right-3 md:right-48 top-10 z-50 text-xl text-gray-500 hover:text-primary"
                  onClick={() => setShowPassEmployee(!showPassEmployee)}>
                  {showPassEmployee ? <FaEyeSlash /> : <FaEye />}
                </button>
                {employeeErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {employeeErrors.password.message}
                  </p>
                )}
              </div>

              <p className="text-sm text-warning mt-1">
                ⚠ You will not be linked to any company until an HR Manager adds
                you.
              </p>

              <button
                className="btn btn-secondary btn-lg w-full mt-4"
                type="submit">
                Register as Employee
              </button>

              <p>
                Already Have an Account?{" "}
                <Link
                  className="ms-3 text-blue-600 underline"
                  to={"/login"}>
                  Sign in
                </Link>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
};

export default Register;
