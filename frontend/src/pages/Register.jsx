import { useState,useCallback } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase"; // adjust path to wherever you initialize Firebase
import { useNavigate, Link } from "react-router-dom";
import usePost from "../hooks/usePost";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const navigate = useNavigate();

  const mockapi4 = import.meta.env.VITE_MOCKAPI4;
  const {postData:postUser} = usePost(`https://${mockapi4}/api/users`);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirebaseError("");

    if (!validate()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, { displayName: formData.name.trim() });
      postUser({firebase_uid:userCredential.user.uid,avatar:""});
      navigate("/explore"); // change to wherever a new user should land
    } catch (err) {
      setFirebaseError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4">
  <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
    <h1 className="text-3xl font-bold text-blue-600 mb-1">Create account</h1>
    <p className="text-gray-500 dark:text-gray-400 mb-6">Start planning your next trip.</p>

    {firebaseError && (
      <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-2">
        {firebaseError}
      </div>
    )}

    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`w-full rounded-xl border px-4 py-2.5 outline-none transition focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
            errors.name ? "border-red-400" : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder="Your full name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded-xl border px-4 py-2.5 outline-none transition focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
            errors.email ? "border-red-400" : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full rounded-xl border px-4 py-2.5 outline-none transition focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
            errors.password ? "border-red-400" : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder="••••••••"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full rounded-xl border px-4 py-2.5 outline-none transition focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
            errors.confirmPassword ? "border-red-400" : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-xl py-3 transition"
      >
        {loading ? "Creating account..." : "Register"}
      </button>
    </form>

    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-600 font-semibold hover:underline">
        Log in
      </Link>
    </p>
  </div>
</div>
  );
}

function mapFirebaseError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "That email address looks invalid.";
    case "auth/weak-password":
      return "Password is too weak.";
    default:
      return "Something went wrong. Please try again.";
  }
}