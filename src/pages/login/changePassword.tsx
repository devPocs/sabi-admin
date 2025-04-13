import React, { useState, useEffect } from "react";
import { Box, FormControl, Heading, Image, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import logo from "@assets/lock-2.png";
import { useNavigate } from "react-router-dom";
import Buttons from "@components/button";
import SecuredInput from "@components/securedInputs";
import { useMutation } from "@tanstack/react-query";
import { vendorApi } from "@services/api";
import { toast } from "react-toastify";
import Loader from "@components/spinner";

// Validation schema
const PasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [otpCode, setOtpCode] = useState("");

  // Retrieve contact info and OTP from session storage on component mount
  useEffect(() => {
    const storedContact = sessionStorage.getItem("resetPasswordContact");
    const storedMethod = sessionStorage.getItem("resetPasswordMethod");
    const storedOtp = sessionStorage.getItem("resetPasswordOtp");

    if (!storedContact) {
      // If no contact info found, redirect back to forgot password page
      toast.error("Please start the password reset process from the beginning");
      navigate("/forgot-password");
      return;
    }

    setContactInfo(storedContact);
    setContactMethod(storedMethod || "email"); // Default to email if not specified

    if (storedOtp) {
      setOtpCode(storedOtp);
    }
  }, [navigate]);

  // Mutation for reset password
  const { mutate } = useMutation({
    mutationFn: (data: {
      emailAddress?: string;
      phoneNumber?: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      return vendorApi.resetPassword(data);
    },
    onSuccess: (response) => {
      setIsLoading(false);
      toast.success("Password changed successfully");

      // Clear reset password data from session storage
      sessionStorage.removeItem("resetPasswordContact");
      sessionStorage.removeItem("resetPasswordMethod");
      sessionStorage.removeItem("resetPasswordOtp");

      // Navigate to login page
      navigate("/login");
    },
    onError: (error: any) => {
      setIsLoading(false);
      toast.error(
        error?.data?.message || "Failed to change password. Please try again."
      );
    },
  });

  const handleSubmit = (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);

    // Create payload based on contact method
    const payload =
      contactMethod === "email"
        ? {
            emailAddress: contactInfo,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          }
        : {
            phoneNumber: contactInfo,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          };

    mutate(payload);
  };

  return (
    <Box
      bg="brand.100"
      display="flex"
      justifyContent="space-between"
      h="100vh"
      overflow={"hidden"}
    >
      {isLoading && <Loader />}
      <Box
        width={["100%"]}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor="brand.700"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition={["inherit", "right"]}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          className="loginBox"
          alignItems={"center"}
          borderRadius={["20"]}
          position="relative"
          bg={"white"}
          padding={"20"}
          width={"600px"}
        >
          <Box
            w={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Image height={"200"} src={logo} alt="lock icon" />
            <Heading
              color="secondaryGray.900"
              fontSize={["30px", "32px"]}
              fontWeight={"700"}
              lineHeight="48px"
            >
              Change Your Password
            </Heading>
            <Text
              fontWeight="400"
              fontSize="16px"
              lineHeight="22.4px"
              mb="22.4px"
              color={"gray.300"}
              textAlign={"center"}
            >
              Create your new login password here
            </Text>
          </Box>

          <Formik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={PasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, handleChange, handleSubmit }) => (
              <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <FormControl>
                  <Box mb="20px">
                    <SecuredInput
                      showPrefix={false}
                      onChange={handleChange}
                      name="newPassword"
                      value={values.newPassword}
                      placeholder="Enter new password"
                      title="New Password"
                      errorMsg={errors.newPassword}
                      error={
                        errors.newPassword != null &&
                        touched.newPassword != null
                      }
                    />
                  </Box>
                  <Box mb="20px">
                    <SecuredInput
                      showPrefix={false}
                      onChange={handleChange}
                      name="confirmPassword"
                      value={values.confirmPassword}
                      placeholder="Confirm new password"
                      title="Confirm New Password"
                      errorMsg={errors.confirmPassword}
                      error={
                        errors.confirmPassword != null &&
                        touched.confirmPassword != null
                      }
                    />
                  </Box>

                  <Box mt={["36px"]}>
                    <Buttons
                      variant={"brand"}
                      isDisabled={isLoading}
                      label="Change Password"
                      type="submit"
                    />
                  </Box>
                </FormControl>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePassword;
