import React, { useState, useEffect } from "react";

import {
  Box,
  FormControl,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import AdsSwipper from "@components/adSwipper";
import logo from "@assets/logo.png";
import Inputs from "@components/inputs";
import { LoginSchema } from "@validations/index";
import { IILoginValues } from "@interface/IloginValues";
import SecuredInput from "@components/securedInputs";
import Buttons from "@components/button";
import { useAuthService } from "@helpers/index";
import { useMutation } from "@tanstack/react-query";
import { vendorApi } from "@services/api";
import { serviceLinks } from "@services/serviceLinks";
import Loader from "@components/spinner";
import { toast } from "react-toastify";
import { apiData, ApiResponse } from "./../../types/index";
import { Link, useLocation } from "react-router-dom";

const Login = () => {
  const { handleLogIn } = useAuthService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signupRoute, setSignupRoute] = useState<string>("/customer/register");
  const location = useLocation();

  // Determine the appropriate signup route based on the current path
  useEffect(() => {
    const path = location.pathname;

    // Default to vendor registration
    let registrationPath = "/customer/register";

    // Extract module from path or referrer
    // This assumes the path follows the pattern: /moduleName/...
    const pathSegments = path.split("/").filter((segment) => segment);

    if (pathSegments.length > 0) {
      const module = pathSegments[0];

      // Map the current module to its registration route
      // Add all your modules here
      const moduleRegistrationRoutes: Record<string, string> = {
        customer: "/customer/register",
        vendor: "/vendor/register",
        admin: "/admin/register",
        administrator: "/administrator/register",
        salestaff: "/salestaff/register",
        productstaff: "/productstaff/register",
        shelvestaff: "/shelvestaff/register",
        caretaker: "/caretaker/register",
        chairman: "/chairman/register",
        "assistant-officers": "/assistant-officers/register",
        // Add other modules as needed
      };

      if (moduleRegistrationRoutes[module]) {
        registrationPath = moduleRegistrationRoutes[module];
      }
    }

    setSignupRoute(registrationPath);
  }, [location]);

  const { mutate, status } = useMutation({
    mutationFn: (formData: IILoginValues) => {
      return vendorApi.login(formData);
    },
    mutationKey: [serviceLinks.login],
    onSuccess: (response: apiData) => {
      setIsLoading(false);
      console.log(response.message);
      console.log("response data", response.data);
      console.log("response", response);
      handleLogIn(response.data);
    },
    onError: (res: ApiResponse) => {
      setIsLoading(false);
      console.log(res);
      console.log(res?.data);
      toast(res?.data?.message || "Login error occurred");
    },
  });

  const loginUser = (payload: IILoginValues) => {
    setIsLoading(true);
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
        {isLoading && <Loader />}
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
                <Image src={logo} alt="logo" />
                <Heading
                  color="secondaryGray.900"
                  fontSize={["30px", "32px"]}
                  textAlign={"left"}
                  fontWeight={"700"}
                  lineHeight="48px"
                >
                  Login to Account
                </Heading>
                <Text
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="22.4px"
                  mb="22.4px"
                  color={"gray.300"}
                >
                  Please enter your email and password to continue
                </Text>
              </Box>

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  rememberMe: true,
                }}
                validationSchema={LoginSchema}
                onSubmit={(values: IILoginValues) => {
                  setTimeout(() => {
                    loginUser(values);
                  }, 100);
                }}
              >
                {({ errors, touched, values, handleChange }) => (
                  <Form style={{ width: "100%" }}>
                    <FormControl>
                      <Box mb="20px">
                        <Inputs
                          onChange={handleChange}
                          name="email"
                          value={values.email}
                          placeholder={"Your email"}
                          title="Email"
                          errorMsg={errors.email}
                          error={errors.email != null && touched.email != null}
                        />
                      </Box>
                      <Box mb="10px">
                        <SecuredInput
                          name="password"
                          onChange={handleChange}
                          value={values.password}
                          title="Password"
                          placeholder="Min. 8 characters"
                          errorMsg={errors.password}
                          error={
                            errors.password != null && touched.password != null
                          }
                        />
                      </Box>

                      {/* Forgotten Password link */}
                      <Box textAlign="right" mb="20px">
                        <Link to="/forgot-password">
                          <Text color="teal.500" fontWeight="500">
                            Forgotten Password?
                          </Text>
                        </Link>
                      </Box>

                      <Box mt={["36px"]}>
                        <Buttons
                          variant={"brand"}
                          isDisabled={status == "pending"}
                          label="Log In"
                          type="submit"
                        />
                      </Box>

                      {/* Sign Up call to action with dynamic route */}
                      {/* <Box textAlign="center" mt="20px">
                        <Text>
                          Don't have an account yet?{" "}
                          <Link to={signupRoute}>
                            <Text as="span" color="teal.500" fontWeight="600">
                              Sign Up
                            </Text>
                          </Link>
                        </Text>
                      </Box> */}
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

export default Login;
