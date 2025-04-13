import { Box, FormControl, Heading, Image, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import logo from "@assets/lock.png";
import Inputs from "@components/inputs";
import { Link, useNavigate } from "react-router-dom";
import { globalStyles } from "../../theme/styles";
import Buttons from "@components/button";
import { useMutation } from "@tanstack/react-query";
import { vendorApi } from "@services/api";
import { toast } from "react-toastify";
import Loader from "@components/spinner";
import { useState } from "react";

// Validation schema
const ForgotPasswordSchema = Yup.object().shape({
  emailOrPhone: Yup.string()
    .required("Email or phone number is required")
    .test(
      "is-email-or-phone",
      "Please enter a valid email or phone number",
      (value) => {
        // Check if it's an email
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        // Check if it's a phone number (simple validation)
        const phoneRegex = /^\+?[0-9]{10,15}$/;

        return emailRegex.test(value) || phoneRegex.test(value);
      }
    ),
});

const ForgetPassEmail = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Mutation for forgot password
  const { mutate } = useMutation({
    mutationFn: (data: {
      emailAddress?: string;
      phoneNumber?: string;
      originalInput: string; // Add original input to pass through
    }) => {
      // Only send relevant fields to API, excluding originalInput
      const apiPayload = data.emailAddress
        ? { emailAddress: data.emailAddress }
        : { phoneNumber: data.phoneNumber };

      return vendorApi.forgotPassword(apiPayload);
    },
    onSuccess: (response, variables) => {
      setIsLoading(false);
      toast.success("OTP has been sent successfully");

      // Store the user input in sessionStorage for the next steps
      // Use the original input that was passed through the mutation variables
      sessionStorage.setItem("resetPasswordContact", variables.originalInput);
      sessionStorage.setItem(
        "resetPasswordMethod",
        variables.originalInput.includes("@") ? "email" : "phone"
      );

      // Navigate to OTP verification page
      navigate("/verify-otp");
    },
    onError: (error: any) => {
      setIsLoading(false);
      toast.error(
        error?.data?.message || "Failed to send OTP. Please try again."
      );
    },
  });

  const handleSubmit = (values: { emailOrPhone: string }) => {
    setIsLoading(true);

    // Determine if input is email or phone
    const isEmail = values.emailOrPhone.includes("@");

    const payload = isEmail
      ? {
          emailAddress: values.emailOrPhone,
          originalInput: values.emailOrPhone,
        }
      : {
          phoneNumber: values.emailOrPhone,
          originalInput: values.emailOrPhone,
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
            <Image height={["200px"]} src={logo} alt="lock icon" />
            <Heading
              color="secondaryGray.900"
              fontSize={["30px", "32px"]}
              fontWeight={"700"}
              lineHeight="48px"
            >
              Forgot Your Password
            </Heading>
            <Text
              fontWeight="400"
              fontSize="16px"
              lineHeight="22.4px"
              mb="22.4px"
              color={"gray.300"}
              textAlign={"center"}
            >
              Enter your registered email or phone number and we'll send you a
              6-digit code to reset it
            </Text>
          </Box>

          <Formik
            initialValues={{
              emailOrPhone: "",
            }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, handleChange, handleSubmit }) => (
              <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <FormControl>
                  <Box mb="20px">
                    <Inputs
                      showPrefix={false}
                      onChange={handleChange}
                      name="emailOrPhone"
                      value={values.emailOrPhone}
                      placeholder="Enter email or phone number"
                      title="Email or Phone Number"
                      errorMsg={errors.emailOrPhone}
                      error={
                        errors.emailOrPhone != null &&
                        touched.emailOrPhone != null
                      }
                    />
                  </Box>

                  <Box mt={["36px"]}>
                    <Buttons
                      variant={"brand"}
                      isDisabled={isLoading}
                      label="Continue"
                      type="submit"
                    />
                  </Box>
                  <Box display={"flex"} mt="20px" justifyContent="center">
                    <Text>Remember Password?</Text>
                    <Link to={"/"}>
                      <Text
                        ms={"3"}
                        color={globalStyles.colors.green[600]}
                        fontWeight={"bold"}
                      >
                        Login Now
                      </Text>
                    </Link>
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

export default ForgetPassEmail;
