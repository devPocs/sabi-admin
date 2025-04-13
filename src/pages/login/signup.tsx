import React from "react";

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
import AdsSwipper from "@components/adSwipper";
import logo from "@assets/logo.png";
import add from "@assets/add.png";
import Inputs from "@components/inputs";
import { LoginSchema } from "@validations/index";
import { IILoginValues } from "@interface/IloginValues";
import SecuredInput from "@components/securedInputs";
import Buttons from "@components/button";
import { mockUserData } from "@mocks/index";
import { useAuthService } from "@helpers/index";
import { Link } from "react-router-dom";
import { globalStyles } from "../../theme/styles";
import Selects from "@components/selects";

const Signup = () => {
    const { handleLogIn, handleLogout } = useAuthService();

    const loginUser = (payload: IILoginValues) => {
        handleLogIn(mockUserData);
    };
    return (
        <Box
            bg="brand.100"
            display="flex"
            justifyContent="space-between"
            // overflow='hidden'
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
                // h="100vh"
                overflowY="auto"
                pb={["1px", "8px"]}
                px={["8%", "1%"]}
                backgroundColor="brand.700"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundPosition={["inherit", "right"]}
            // width='100%'
            // height= '300px'+
            >
                <HStack
                    // w="100%"
                    // alignItems={"center"}
                    justifyContent="center"
                    position="relative"
                ></HStack>
                <Box pt={["18%", "2%"]}>
                    <Stack alignItems="center">
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            minH={["549px"]}
                            className="loginBox"
                            alignItems={"center"}
                            w={["100%", "410px"]}
                            //   px={["0px", "50px"]}
                            borderRadius={["8px", "10px"]}
                            pt={["20px", "41px"]}
                            pb={["20px"]}
                            position="relative"
                        >
                            <Box w={"100%"}>
                                <Image
                                    //   h={["30px", "40px", "40px", "40px"]}
                                    src={logo}
                                    alt="man"
                                />
                                <Heading
                                    color="secondaryGray.900"
                                    fontSize={["30px", "32px"]}
                                    textAlign={"left"}
                                    fontWeight={"700"}
                                    lineHeight="48px"
                                >
                                    Create an account
                                </Heading>
                                <Text
                                    fontWeight="400"
                                    fontSize="16px"
                                    lineHeight="22.4px"
                                    mb="22.4px"
                                    color={"gray.300"}
                                >
                                    Please tell us about you
                                </Text>
                                <Image
                                    mb={"10"}
                                    src={add}
                                    alt="man"
                                />
                            </Box>

                            <Formik
                                initialValues={{
                                    email: "",
                                    password: "",
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
                                                    showPrefix={false}
                                                    onChange={handleChange}
                                                    name=""
                                                    value={""}
                                                    placeholder={"Your Business Name"}
                                                    title="Business Name"
                                                    errorMsg={""}
                                                />
                                            </Box>
                                            <Box mb="20px">
                                                <Inputs
                                                    showPrefix={false}
                                                    onChange={handleChange}
                                                    name=""
                                                    value={""}
                                                    placeholder={"Email Address"}
                                                    title="Email Address"
                                                    errorMsg={""}
                                                />
                                            </Box>
                                            <Box mb="20px">
                                                <Inputs
                                                    showPrefix={false}
                                                    onChange={handleChange}
                                                    name=""
                                                    value={""}
                                                    placeholder={"Phone Number"}
                                                    title="Phone Number"
                                                    errorMsg={""}
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
                                            <Box mb="20px">
                                                <Selects
                                                    showPrefix={false}
                                                    onChange={handleChange}
                                                    name=""
                                                    value={""}
                                                    placeholder={"LGA"}
                                                    title="LGA"
                                                    errorMsg={""}
                                                />
                                            </Box>
                                            <Box mb="20px">
                                                <Selects
                                                    showPrefix={false}
                                                    onChange={handleChange}
                                                    name=""
                                                    value={""}
                                                    placeholder={"Currency"}
                                                    title="Currency"
                                                    errorMsg={""}
                                                />
                                            </Box>
                                            <Box mb="20px">
                                                <Inputs
                                                    showPrefix={false}
                                                    onChange={handleChange}
                                                    name=""
                                                    value={""}
                                                    placeholder={"Address"}
                                                    title="Address"
                                                    errorMsg={""}
                                                />
                                            </Box>
                                            <Box mt={["36px"]}>
                                                <Buttons
                                                    variant={"brand"}
                                                    isDisabled={status == "pending"}
                                                    label="Sign In"
                                                    type="submit"
                                                />
                                            </Box>
                                            <Box display={"flex"}>
                                                <Text>Already have an account ? </Text>
                                                <Link to={"/"}> <Text ms={"3"} color={globalStyles.colors.green[600]} fontWeight={"bold"}>Sign in</Text></Link>
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

export default Signup;
