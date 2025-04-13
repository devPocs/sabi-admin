import React, { useState, useEffect } from "react";
import { Box, FormControl, Heading, Image, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import logo from "@assets/mail.png";
import Inputs from "@components/inputs";
import { useNavigate } from "react-router-dom";
import Buttons from "@components/button";
import { useMutation } from "@tanstack/react-query";
import { vendorApi } from "@services/api";
import { toast } from "react-toastify";
import Loader from "@components/spinner";

// Validation schema
const OtpSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "OTP must be a 6-digit number"),
});

const ForgetPassCode = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [contactMethod, setContactMethod] = useState("");

  // Retrieve contact info from session storage on component mount
  useEffect(() => {
    const storedContact = sessionStorage.getItem("resetPasswordContact");
    const storedMethod = sessionStorage.getItem("resetPasswordMethod");

    if (!storedContact) {
      // If no contact info found, redirect back to forgot password page
      toast.error("Please enter your email or phone number first");
      navigate("/forgot-password");
      return;
    }

    setContactInfo(storedContact);
    setContactMethod(storedMethod || "email"); // Default to email if not specified
  }, [navigate]);

  // Mutation for OTP verification
  const { mutate } = useMutation({
    mutationFn: (data: {
      emailAddress?: string;
      phoneNumber?: string;
      otp: string;
    }) => {
      return vendorApi.verifyOtp(data);
    },
    onSuccess: (response) => {
      setIsLoading(false);
      toast.success("OTP verified successfully");

      // Navigate to change password page
      navigate("/reset-password");
    },
    onError: (error: any) => {
      setIsLoading(false);
      toast.error(error?.data?.message || "Invalid OTP. Please try again.");
    },
  });

  const handleSubmit = (values: { otp: string }) => {
    setIsLoading(true);

    // Create payload based on contact method
    const payload =
      contactMethod === "email"
        ? {
            emailAddress: contactInfo,
            otp: values.otp,
          }
        : {
            phoneNumber: contactInfo,
            otp: values.otp,
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
            <Image height={["200px"]} src={logo} alt="mail icon" />
            <Heading
              color="secondaryGray.900"
              fontSize={["30px", "32px"]}
              fontWeight={"700"}
              lineHeight="48px"
            >
              OTP Verification
            </Heading>
            <Text
              fontWeight="400"
              fontSize="16px"
              lineHeight="22.4px"
              mb="22.4px"
              color={"gray.300"}
              textAlign={"center"}
            >
              Enter the 6-digit OTP code sent to{" "}
              {contactMethod === "email"
                ? "your email address"
                : "your phone number"}{" "}
              <strong>{contactInfo}</strong>
              <Box as="span" display="block" fontSize="14px" mt={1}>
                (check spam folder if using email)
              </Box>
            </Text>
          </Box>
          <Formik
            initialValues={{
              otp: "",
            }}
            validationSchema={OtpSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, handleChange, handleSubmit }) => (
              <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <FormControl>
                  <Box mb="20px">
                    <Inputs
                      showPrefix={false}
                      onChange={handleChange}
                      name="otp"
                      value={values.otp}
                      placeholder="Enter 6-digit OTP"
                      title="OTP Code"
                      errorMsg={errors.otp}
                      error={errors.otp != null && touched.otp != null}
                    />
                  </Box>
                  <Box mt={["36px"]}>
                    <Buttons
                      variant={"brand"}
                      isDisabled={isLoading}
                      label="Verify OTP"
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

export default ForgetPassCode;
