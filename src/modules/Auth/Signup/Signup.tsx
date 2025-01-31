import { Button } from "@/components/ui/button";
import { Lock, Mail, Phone } from "lucide-react";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

const SignUp = () => {
  return (
    <div className="max-w-xl mx-auto my-10 w-full px-6 rounded-lg shadow-lg py-10 bg-white">
      <h2
        className={cn([
          "text-[32px] leading-[36px] md:text-5xl mb-8 md:mb-10 text-center capitalize",
        ])}
      >
        Sign Up
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
        <InputGroup className="flex bg-white rounded-lg border mb-[14px]">
          <InputGroup.Text>
            <Phone />
          </InputGroup.Text>
          <InputGroup.Input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
          />
        </InputGroup>
        <InputGroup className="flex bg-white rounded-lg border mb-[14px]">
          <InputGroup.Text>
            <Mail />
          </InputGroup.Text>
          <InputGroup.Input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
          />
        </InputGroup>
        <InputGroup className="flex bg-white rounded-lg border mb-[14px]">
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
        <InputGroup className="flex bg-white rounded-lg border mb-[14px]">
          <InputGroup.Text>
            <Lock />
          </InputGroup.Text>
          <InputGroup.Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
          />
        </InputGroup>
        <Button className="w-full">Sign Up</Button>
      </div>
    </div>
  );
};

export default SignUp;
