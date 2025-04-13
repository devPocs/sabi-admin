import Buttons from "@components/button";
import {
  Box,
  FormControl,
  Heading,
  Image,
  Text,
  Textarea,
} from "@chakra-ui/react";
import prod1 from "@assets/add.png";

import { Formik, Form } from "formik";
import Inputs from "@components/inputs";
const AddComplaint = () => {
  return (
    <Box width="100%" padding={5} borderRadius="8px" bg="brand.1000">
      <Heading
        fontWeight={"700"}
        lineHeight={"30px"}
        fontSize={{ base: "30px", md: "32px" }}
        mt="20"
      >
        Add New Complaint
      </Heading>
      <Box mt="7">
        <Image
          src={prod1}
          alt="man"
          width="100px"
        />
      </Box>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        // validationSchema={LoginSchema}
        onSubmit={(values: any) => { }}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form style={{ width: "100%", marginTop: "24px" }}>
            <FormControl>
              <Box mb="20px">
                <Inputs
                  showPrefix={false}
                  onChange={handleChange}
                  name="email"
                  value={values.email}
                  placeholder={"Vendor ID"}
                  title="Vendor ID"
                //   errorMsg={errors.email}
                // error={errors.email != null && touched.email != null}
                />
              </Box>
              <Box mb="20px">
                <Textarea 
                 onChange={handleChange}
                 name="email"
                 value={values.email}
                 placeholder={"Vendor ID"}
                 title="Vendor ID"
                 border={"1px solid #E2E8F0"}
                 rows={5}
                 />
              
              </Box>
              
              

              <Box mt={["36px"]}>
                <Buttons
                  variant={"brand"}
                  isDisabled={status == "pending"}
                  label="Update"
                  type="submit"
                />
              </Box>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddComplaint;
