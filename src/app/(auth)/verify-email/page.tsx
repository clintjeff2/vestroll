"use client";
import EmailVerification from "@/components/shared/emailVerificationModal";
import { useRouter } from "next/navigation";

function VerifyEmailPage() {
  const router = useRouter();
  const mockEmail = "zanab12ab@gmail.com";

  const handleVerify = async (otp: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const isValid = otp === "123456";

    if (isValid) {
      // Update localStorage
      const existingData = JSON.parse(
        localStorage.getItem("registrationData") || "{}",
      );
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          ...existingData,
          emailVerified: true,
          step: 3,
        }),
      );

      router.push("/account-type");
    }

    return isValid;
  };

  const handleResend = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Verification code resent!");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <EmailVerification
      email={mockEmail}
      onVerify={handleVerify}
      onResend={handleResend}
      onGoBack={handleGoBack}
      resendCooldown={60}
    />
  );
}

export default VerifyEmailPage;
