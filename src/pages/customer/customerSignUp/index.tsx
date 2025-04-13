import {
  Box,
  FormControl,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  RadioGroup,
  Radio,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

import { Formik, Form } from "formik";
import AdsSwipper from "@components/adSwipper";
import logo from "@assets/logo.png";
import add from "@assets/add.png";
import Inputs from "@components/inputs";
import SecuredInput from "@components/securedInputs";
import Buttons from "@components/button";
import { useAuthService } from "@helpers/index";
import { Link, useNavigate } from "react-router-dom";
import { globalStyles } from "../../../theme/styles";
import Selects from "@components/selects";
import { useMutation, useQuery } from "@tanstack/react-query";
import { vendorApi, waivedCustomerApi } from "@services/api";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as Yup from "yup";

// Complete payload structure interface matching backend requirements
export interface CustomerSignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  address: string;
  profileImageUrl: string;
  vendorDetails: {
    businessName: string;
    businessType: string;
    businessDescription: string;
    localGovernmentId: string;
    currency: string;
    vendorTypeEnum: number;
  };
  customerDetails: {
    preferredMarket: string;
    localGovernmentId: string;
  };
  advertiserDetails: {
    companyName: string;
    businessType: string;
    website: string;
  };
}

// Validation schema
const CustomerSignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  address: Yup.string().required("Address is required"),
  lga: Yup.string().required("LGA is required"),
});

const CustomerSignUp = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { handleLogIn } = useAuthService();

  // Query to fetch LGAs
  const {
    data: lgaData,
    isLoading: lgaLoading,
    error: lgaError,
  } = useQuery({
    queryKey: ["lgas"],
    queryFn: vendorApi.fetchLGAs,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 3, // Retry failed requests 3 times
  });

  // Process LGA data for the dropdown
  const lgaOptions =
    lgaData?.data?.data.pageItems.map((lga: any) => ({
      value: lga.id || lga._id,
      name: lga.name,
    })) || [];

  // Mutation for signup
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CustomerSignupPayload) =>
      waivedCustomerApi.waivedCustomerSignUp(payload),
    onSuccess: (data) => {
      toast({
        title: "Account created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Navigate to login page after successful signup
      navigate("/");
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create account",
        description: error?.data?.message || "An error occurred during signup",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const registerUser = (values: any) => {
    // Map radio values to correct currency codes if necessary
    const currencyValue =
      values.currency === "dollar"
        ? "USD"
        : values.currency === "naira"
        ? "NGN"
        : values.currency;

    // Create payload with complete structure matching backend requirements
    const signupPayload = {
      // Main user details
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phone,
      password: values.password,
      role: "CUSTOMER",
      address: values.address,
      profileImageUrl: "", // Empty string for optional field

      // Include all the required nested objects
      vendorDetails: {
        businessName: "",
        businessType: "",
        businessDescription: "",
        localGovernmentId: "",
        currency: "",
        vendorTypeEnum: 0,
      },

      customerDetails: {
        preferredMarket: "",
        localGovernmentId: values.lga,
      },

      advertiserDetails: {
        companyName: "",
        businessType: "",
        website: "",
      },
    };

    console.log("Signup payload:", signupPayload);

    // Call the mutation
    mutate(signupPayload);
  };

  return (
    <Box
      bg="brand.100"
      display="flex"
      justifyContent="space-between"
      h="100vh"
      overflow={"hidden"}
    >
      <Box
        borderColor="brand.400"
        borderRightWidth="1px"
        borderLeftWidth="1px"
        borderLeftStyle="solid"
        w="50%"
        display={["none", "block", "block", "block"]}
      >
        <AdsSwipper />
      </Box>

      <Box
        width={["100%", "60%"]}
        overflowY="auto"
        pb={["1px", "8px"]}
        px={["8%", "1%"]}
        backgroundColor="brand.700"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition={["inherit", "right"]}
      >
        <HStack justifyContent="center" position="relative"></HStack>
        <Box pt={["18%", "2%"]}>
          <Stack alignItems="center">
            <Box
              display={"flex"}
              flexDirection={"column"}
              minH={["549px"]}
              className="loginBox"
              alignItems={"center"}
              w={["100%", "410px"]}
              borderRadius={["8px", "10px"]}
              pt={["20px", "41px"]}
              pb={["20px"]}
              position="relative"
            >
              <Box w={"100%"}>
                <Image src={logo} alt="Sabi Market logo" />
                <Heading
                  color="secondaryGray.900"
                  fontSize={["30px", "32px"]}
                  textAlign={"left"}
                  fontWeight={"700"}
                  lineHeight="48px"
                >
                  Create An Account
                </Heading>
                <Text
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="22.4px"
                  mb="22.4px"
                  color={"gray.300"}
                >
                  Please tell us more about you
                </Text>
                <Image mb={"10"} src={add} alt="man" />
              </Box>

              <Formik
                initialValues={{
                  // Only fields we actually collect from users
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  password: "",
                  address: "",
                  lga: "",
                  currency: "NGN", // Default currency preference
                }}
                validationSchema={CustomerSignupSchema}
                onSubmit={(values) => {
                  registerUser(values);
                }}
              >
                {({ values, handleChange, setFieldValue, errors, touched }) => (
                  <Form style={{ width: "100%" }}>
                    <FormControl>
                      {/* Currency Preference Radio Group */}
                      <Box mb="20px">
                        <RadioGroup
                          value={values.currency}
                          onChange={(val) => setFieldValue("currency", val)}
                        >
                          <HStack spacing={6}>
                            <Radio colorScheme="green" value="USD" id="dollar">
                              View in Dollar
                            </Radio>
                            <Radio colorScheme="green" value="NGN" id="naira">
                              View in Naira (local currency)
                            </Radio>
                          </HStack>
                        </RadioGroup>
                      </Box>

                      {/* Full Name Field */}
                      <Box mb="20px">
                        <Text
                          fontWeight="500"
                          lineHeight={["16px", "17px"]}
                          fontSize={["12px", "14px"]}
                          mb={["8px"]}
                          color="neutral.1"
                        >
                          Full Name
                        </Text>
                        <Box display="flex" gap={4}>
                          <Box flex={1}>
                            <Inputs
                              showPrefix={false}
                              onChange={handleChange}
                              name="firstName"
                              value={values.firstName}
                              placeholder="Enter first name"
                              title=""
                              errorMsg={
                                touched.firstName && errors.firstName
                                  ? errors.firstName
                                  : ""
                              }
                            />
                          </Box>
                          <Box flex={1}>
                            <Inputs
                              showPrefix={false}
                              onChange={handleChange}
                              name="lastName"
                              value={values.lastName}
                              placeholder="Enter last name"
                              title=""
                              errorMsg={
                                touched.lastName && errors.lastName
                                  ? errors.lastName
                                  : ""
                              }
                            />
                          </Box>
                        </Box>
                      </Box>

                      {/* Email Address Field */}
                      <Box mb="20px">
                        <Inputs
                          showPrefix={false}
                          onChange={handleChange}
                          name="email"
                          value={values.email}
                          placeholder="Enter email address"
                          title="Email Address"
                          errorMsg={
                            touched.email && errors.email ? errors.email : ""
                          }
                        />
                      </Box>

                      {/* Phone Number Field */}
                      <Box mb="20px">
                        <Inputs
                          showPrefix={false}
                          onChange={handleChange}
                          name="phone"
                          value={values.phone}
                          placeholder="Enter phone number"
                          title="Phone Number"
                          errorMsg={
                            touched.phone && errors.phone ? errors.phone : ""
                          }
                        />
                      </Box>

                      {/* Password Field */}
                      <Box mb="20px">
                        <SecuredInput
                          name="password"
                          onChange={handleChange}
                          value={values.password}
                          title="Password"
                          placeholder="********"
                          errorMsg={
                            touched.password && errors.password
                              ? errors.password
                              : ""
                          }
                        />
                      </Box>

                      {/* LGA Field - Now using the fetched LGAs */}
                      <Box mb="20px">
                        <Selects
                          showPrefix={false}
                          onChange={handleChange}
                          name="lga"
                          value={values.lga}
                          placeholder={
                            lgaLoading ? "Loading LGAs..." : "Select"
                          }
                          title="LGA"
                          errorMsg={touched.lga && errors.lga ? errors.lga : ""}
                          options={lgaOptions}
                          isDisabled={lgaLoading}
                        />
                        {lgaError && (
                          <Text color="red.500" fontSize="sm" mt="1">
                            Failed to load LGAs. Please try again.
                          </Text>
                        )}
                      </Box>

                      {/* Address Field */}
                      <Box mb="20px">
                        <Inputs
                          showPrefix={false}
                          onChange={handleChange}
                          name="address"
                          value={values.address}
                          placeholder="Enter address"
                          title="Address"
                          errorMsg={
                            touched.address && errors.address
                              ? errors.address
                              : ""
                          }
                        />
                      </Box>

                      {/* Sign Up Button */}
                      <Box mt={["36px"]}>
                        <Buttons
                          variant={"brand"}
                          isDisabled={lgaLoading || isPending}
                          label={isPending ? "Signing Up..." : "Sign Up"}
                          type="submit"
                          bgColor="teal.500"
                          color="white"
                          w="100%"
                        />
                      </Box>

                      {/* Login Link */}
                      <Box display={"flex"} justifyContent="center" mt={4}>
                        <Text>Already have an account? </Text>
                        <Link to={"/"}>
                          <Text ms={"3"} color="teal.500" fontWeight={"bold"}>
                            Login Instead
                          </Text>
                        </Link>
                      </Box>
                    </FormControl>
                  </Form>
                )}
              </Formik>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerSignUp;
