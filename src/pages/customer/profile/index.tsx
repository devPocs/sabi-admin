import { Avatar, Box, FormControl, Text } from "@chakra-ui/react";
import Buttons from "@components/button";
import Inputs from "@components/inputs";
import { Formik, Form } from "formik";
import { globalStyles } from "../../../theme/styles";

const Profile = () => {
  return (
    <Box mt={5} w="100%">
      <Box bg="brand.1000" w="95%" >
        <Box padding={{ base: "10px", md: "40px" }} w="100%" maxW="410px">
          <Box mb={{ base: "10px", md: "24px" }} mt="20px">
            <Avatar
              w="64px"
              h="64px"
              size="sm"
              bg="orange"
              color="secondaryGray.1000"
              name={`ma`}
              src="https://bit.ly/broken-link"
            />
             <Text color={globalStyles.colors.green[500]}>Replace Photo</Text>
          </Box>
          
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={{}}
            onSubmit={(values: object) => {
              setTimeout(() => { }, 100);
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
                      placeholder={"Business Name"}
                      title="ID No"
                    //   errorMsg={errors.email}
                    // error={}
                    />
                  </Box>
                  <Box mb="20px">
                    <Inputs
                      showPrefix={false}
                      onChange={handleChange}
                      name="buisName"
                      value={""}
                      placeholder={"Business Name"}
                      title="Business Name"
                    //   errorMsg={errors.email}
                    // error={}
                    />
                  </Box>
                  <Box mb="20px">
                    <Inputs
                      showPrefix={false}
                      onChange={handleChange}
                      name="buisName"
                      value={""}
                      placeholder={"Business Name"}
                      title="Business Name"
                    //   errorMsg={errors.email}
                    // error={}
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
                    //   errorMsg={errors.email}
                    // error={}
                    />
                  </Box>
                  <Box mb="20px">
                    <Inputs
                      showPrefix={false}
                      onChange={handleChange}
                      name=""
                      value={""}
                      placeholder={"Phone Number"}
                      title={"Phone Number"}
                    //   errorMsg={errors.email}
                    // error={}
                    />
                  </Box>
                  <Box mb="20px">
                    <Inputs
                      showPrefix={false}
                      onChange={handleChange}
                      name=""
                      value={""}
                      placeholder={"LGA"}
                      title={"LGA"}
                    //   errorMsg={errors.email}
                    // error={}
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
                </FormControl>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
