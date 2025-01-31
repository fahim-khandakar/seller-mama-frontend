import { Button } from "@/components/ui/button";
import { Lock, Mail } from "lucide-react";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import Link from "next/link"; // Import the Link component from Next.js

const SignIn = () => {
  return (
    <div className="max-w-xl mx-auto my-10 w-full px-6 rounded-lg shadow-lg py-10 bg-white">
      <h2
        className={cn([
          "text-[32px] leading-[36px] md:text-5xl mb-8 md:mb-10 text-center capitalize",
        ])}
      >
        Sign In
      </h2>
      <div className="space-y-8">
        <InputGroup className="flex bg-white rounded-lg border mb-[14px]">
          <InputGroup.Text>
            <Mail />
          </InputGroup.Text>
          <InputGroup.Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
          />
        </InputGroup>
        <InputGroup className="flex border bg-white rounded-lg mb-[14px]">
          <InputGroup.Text>
            <Lock />
          </InputGroup.Text>
          <InputGroup.Input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
          />
        </InputGroup>
        <Button className="w-full">Sign In</Button>
      </div>
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
