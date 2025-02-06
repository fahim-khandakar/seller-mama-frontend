"use client";

import { Mail, Phone, User } from "lucide-react"; // Add Eye and EyeOff icons
import InputGroup from "@/components/ui/input-group";
import { useEffect, useState } from "react"; // Import useState for form state management
import {
  useGetSingleUserQuery,
  useUserEditMutation,
} from "@/redux/features/users";
import { showToast } from "@/shared/helpers/showToast";
import CustomButton from "@/components/common/Button/Button";
import { getFromCookie } from "@/shared/helpers/localStorage";
import { authKey } from "@/shared/config/constants";
import Loading from "@/components/common/Loading/Loading";

const UserEdit = ({
  id,
  setIsOpen,
}: {
  id: string;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const token = getFromCookie(authKey);
  // State for form inputs
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const { data: singleData, isLoading: dataLoading } = useGetSingleUserQuery(
    { token, id },
    { skip: !id }
  );
  const [editUser, { isLoading }] = useUserEditMutation();

  useEffect(() => {
    if (singleData?.data) {
      setEmail(singleData?.data?.email);
      setPhone(singleData?.data?.phone);
      setName(singleData?.data?.name);
    }
  }, [singleData]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullData = {
      email,
      phone,
      name,
    };

    const result = await editUser({ fullData, id, token });
    const isToastTrue = showToast(result);
    if (isToastTrue) {
      setIsOpen(false);
    }
  };

  if (dataLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-xl mx-auto  w-full px-6 rounded-lg shadow-lg py-10 bg-white">
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

        <CustomButton loading={isLoading} type="submit" className="w-full">
          Update
        </CustomButton>
      </form>
    </div>
  );
};

export default UserEdit;
