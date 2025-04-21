import { Box, Heading, FormControl } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Inputs from "@components/inputs";
import Buttons from "@components/button";
import { useMutation } from "@tanstack/react-query";
import { waivedAdminApi } from "@services/api";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Define TeamMate type for better type safety
interface TeamMateData {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
}

// Validation schema for team mate
const TeamMateSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits"),
});

// Properly type the component props
interface AddTeamMateProps {
  onSuccess: () => void;
}

const AddTeamMate = ({ onSuccess }: AddTeamMateProps) => {
  // Using useMutation with standard React Query pattern and proper typing
  const { mutate, isPending } = useMutation({
    mutationFn: (teamMateData: TeamMateData) =>
      waivedAdminApi.addTeamMate(teamMateData),
    onSuccess: () => {
      toast.success("Team mate added successfully!");
      onSuccess();
    },
    onError: (error) => {
      toast.error("Failed to add team mate");
      console.error("Error adding team mate:", error);
    },
  });

  return (
    <Box width="100%">
      <Heading
        fontWeight="600"
        fontSize="24px"
        color="gray.700"
        mb="24px"
        textAlign="center"
      >
        Add Team Mate
      </Heading>

      <Formik
        initialValues={{
          fullName: "",
          emailAddress: "",
          phoneNumber: "",
        }}
        validationSchema={TeamMateSchema}
        onSubmit={(values, { resetForm }) => {
          // Prepare payload
          const payload = {
            ...values,
            phoneNumber: values.phoneNumber.replace(/\D/g, ""), // Remove non-digit characters
          };

          mutate(payload);
          resetForm();
        }}
      >
        {({ errors, touched, values, handleChange }) => {
          return (
            <Form style={{ width: "100%" }}>
              <FormControl>
                <Box mb="16px">
                  <Inputs
                    showPrefix={false}
                    onChange={handleChange}
                    name="fullName"
                    value={values.fullName}
                    placeholder={"Full Name"}
                    title="Full Name"
                    errorMsg={errors.fullName}
                    error={errors.fullName != null && touched.fullName != null}
                    height="40px"
                    fontSize="14px"
                  />
                </Box>
                <Box mb="16px">
                  <Inputs
                    showPrefix={false}
                    onChange={handleChange}
                    name="emailAddress"
                    value={values.emailAddress}
                    placeholder={"Email Address"}
                    title="Email Address"
                    errorMsg={errors.emailAddress}
                    error={
                      errors.emailAddress != null &&
                      touched.emailAddress != null
                    }
                    height="40px"
                    fontSize="14px"
                  />
                </Box>
                <Box mb="24px">
                  <Inputs
                    showPrefix={false}
                    onChange={handleChange}
                    name="phoneNumber"
                    value={values.phoneNumber}
                    placeholder={"Phone Number"}
                    title="Phone Number"
                    errorMsg={errors.phoneNumber}
                    error={
                      errors.phoneNumber != null && touched.phoneNumber != null
                    }
                    height="40px"
                    fontSize="14px"
                  />
                </Box>

                <Box>
                  <Buttons
                    variant={"brand"}
                    isDisabled={isPending}
                    label={isPending ? "Adding..." : "Add Team Mate"}
                    type="submit"
                    width="100%"
                    height="40px"
                  />
                </Box>
              </FormControl>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddTeamMate;
