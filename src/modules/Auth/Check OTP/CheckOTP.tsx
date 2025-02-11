/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CustomButton from "@/components/common/Button/Button";
import { Button } from "@/components/ui/button";
import {
  useEmailVerifyMutation,
  useResendOTPMutation,
} from "@/redux/features/auth";
import { getUserInfo } from "@/shared/helpers/authServices";
import { showToast } from "@/shared/helpers/showToast";

import { useState, useEffect } from "react";

const CheckOTP = () => {
  const [user, setUser] = useState<any>(null);

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState(300);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const [emailVerify, { isLoading }] = useEmailVerifyMutation();
  const [resendOTP] = useResendOTPMutation();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    };

    fetchUser();
  }, []);

  console.log("user", user);
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);
  console.log("otp", otp);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;
    otp[index] = value;
    setOtp([...otp]);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(
        `otp-input-${index + 1}`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const result = await emailVerify({
      fullData: { email: user?.email, code: otp.join("") },
    });
    const isToastTrue = showToast(result);

    if (isToastTrue) {
      window.location.href = "/";
    }
  };

  const handleResendOTP = async () => {
    const result = await resendOTP({
      fullData: { email: user?.email },
    });
    const isToastTrue = showToast(result);

    if (isToastTrue) {
      setOtp(new Array(6).fill(""));
      setTimer(300);
      setIsResendDisabled(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-center text-xl font-semibold mb-6">Enter OTP</h2>
        <div className="flex justify-between space-x-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 text-center text-2xl border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <CustomButton
            loading={isLoading}
            className="w-full"
            onClick={handleSubmit}
          >
            Submit
          </CustomButton>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            {timer > 0 ? (
              <span>Resend OTP in {timer}s</span>
            ) : (
              <Button
                onClick={handleResendOTP}
                variant={"link"}
                disabled={isResendDisabled}
                className={`${isResendDisabled ? "cursor-not-allowed" : ""}`}
              >
                Resend OTP
              </Button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckOTP;
