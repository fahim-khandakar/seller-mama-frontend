"use client";

import { Lock, Mail, Eye, EyeOff } from "lucide-react"; // Add Eye and EyeOff icons
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import Link from "next/link"; // Import the Link component from Next.js
import { useState } from "react"; // Import useState for form state management
import { useSignInMutation } from "@/redux/features/auth";
import { showToast } from "@/shared/helpers/showToast";
import CustomButton from "@/components/common/Button/Button";
import { setCookie } from "cookies-next";
import { authKey } from "@/shared/config/constants";

const SignIn = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [signIn, { isLoading }] = useSignInMutation();

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullData = {
      email,
      password,
    };

    const result = await signIn({ fullData });
    const isToastTrue = showToast(result);
    if (isToastTrue) {
      setCookie(authKey, result?.data?.data?.token);
      window.location.href = "/";
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-xl mx-auto my-10 w-full px-6 rounded-lg shadow-lg py-10 bg-white">
      <h2
        className={cn([
          "text-[32px] leading-[36px] md:text-5xl mb-8 md:mb-10 text-center capitalize",
        ])}
      >
        Sign In
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email Input */}
        <InputGroup className="flex bg-white rounded-lg border mb-[14px]">
          <InputGroup.Text>
            <Mail />
          </InputGroup.Text>
          <InputGroup.Input
            required
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email} // Bind value to state
            onChange={(e) => setEmail(e.target.value)} // Handle input change
            className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
          />
        </InputGroup>

        {/* Password Input */}
        <InputGroup className="flex border bg-white rounded-lg mb-[14px]">
          <InputGroup.Text>
            <Lock />
          </InputGroup.Text>
          <InputGroup.Input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff /> : <Eye />}{" "}
          </button>
        </InputGroup>

        {/* Sign In Button */}
        <CustomButton loading={isLoading} type="submit" className="w-full">
          Sign In
        </CustomButton>
      </form>

      {/* Link to Sign Up page */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
