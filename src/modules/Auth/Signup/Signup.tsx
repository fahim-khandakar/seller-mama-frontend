"use client";

import { Button } from "@/components/ui/button";
import { Lock, Mail, Phone, User, Eye, EyeOff } from "lucide-react"; // Add Eye and EyeOff icons
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { useState } from "react"; // Import useState for form state management

const SignUp = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // States for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Custom password matching validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(
      "form submission",
      email,
      phone,
      name,
      password,
      confirmPassword
    );
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="max-w-xl mx-auto my-10 w-full px-6 rounded-lg shadow-lg py-10 bg-white">
      <h2
        className={cn([
          "text-[32px] leading-[36px] md:text-5xl mb-8 md:mb-10 text-center capitalize",
        ])}
      >
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name Input */}
        <InputGroup className="flex bg-white rounded-lg border mb-[14px]">
          <InputGroup.Text>
            <User />
          </InputGroup.Text>
          <InputGroup.Input
            required
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
          />
        </InputGroup>

        {/* Phone Input */}
        <InputGroup className="flex bg-white rounded-lg border mb-[14px]">
          <InputGroup.Text>
            <Phone />
          </InputGroup.Text>
          <InputGroup.Input
            required
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
          />
        </InputGroup>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
          />
        </InputGroup>

        {/* Password Input */}
        <InputGroup className="flex bg-white rounded-lg border mb-[14px] relative">
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

        <InputGroup className="flex bg-white rounded-lg border mb-[14px] relative">
          <InputGroup.Text>
            <Lock />
          </InputGroup.Text>
          <InputGroup.Input
            required
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}{" "}
          </button>
        </InputGroup>

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
