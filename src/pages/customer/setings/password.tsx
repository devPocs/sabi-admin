import { Box, FormControl } from "@chakra-ui/react";
import Buttons from "@components/button";
import Inputs from "@components/inputs";
import { Formik, Form } from "formik";
import SecuredInput from "@components/securedInputs";

const Password = () => {
  return (
    <Box mt={{ base: "10px", md: "40px" }} w="100%">
      <Box bg="brand.1000" w="95%" h="473px">
        <Box padding={{ base: "10px", md: "40px" }} w="100%" maxW="410px">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={{}}
            onSubmit={(values: object) => {
              setTimeout(() => {}, 100);
            }}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form style={{ width: "100%" }}>
                <FormControl>
                  <Box mb="10px">
                    <SecuredInput
                      name="password"
                      onChange={handleChange}
                      value={""}
                      title="Current Password"
                      placeholder="Min. 8 characters"
                      errorMsg={""}
                      error={false}
                    />
                  </Box>
                  <Box mb="10px">
                    <SecuredInput
                      name="password"
                      onChange={handleChange}
                      value={""}
                      title="New Password"
                      placeholder="Min. 8 characters"
                      errorMsg={""}
                      error={false}
                    />
                  </Box>
                  <Box mb="10px">
                    <SecuredInput
                      name="password"
                      onChange={handleChange}
                      value={""}
                      title="Confirm New Password"
                      placeholder="Min. 8 characters"
                      errorMsg={""}
                      error={false}
                    />
                  </Box>
                  <Box mt={["36px"]}>
                    <Buttons
                      variant={"brand"}
                      isDisabled={status == "pending"}
                      label="Save"
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

export default Password;
