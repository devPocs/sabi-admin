import { Box, Heading, FormControl, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Inputs from "@components/inputs";
import Buttons from "@components/button";
import { useMutation } from "@tanstack/react-query";
import { waivedAdminApi } from "@services/api";
import * as Yup from "yup";

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

interface EditTeamMateProps {
  onSuccess?: () => void;
  onClose?: () => void;
  teamMateData: {
    id: string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
  };
}

const EditTeamMate = ({
  onSuccess,
  onClose,
  teamMateData,
}: EditTeamMateProps) => {
  const toast = useToast();

  // Using useMutation for team mate update
  const updateTeamMateMutation = useMutation({
    mutationFn: (data: any) => {
      return waivedAdminApi.editTeamMate(data, teamMateData.id);
    },
    onSuccess: (data) => {
      toast({
        title: "Team mate updated",
        description: "Team mate has been updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Close the modal if onClose is provided
      if (onClose && typeof onClose === "function") {
        onClose();
      }

      // Call onSuccess callback if provided
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess();
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to update team mate",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
        Edit Team Mate
      </Heading>

      <Formik
        initialValues={{
          fullName: teamMateData?.fullName || "",
          emailAddress: teamMateData?.emailAddress || "",
          phoneNumber: teamMateData?.phoneNumber || "",
        }}
        enableReinitialize
        validationSchema={TeamMateSchema}
        onSubmit={(values) => {
          // Prepare payload - don't include ID in the payload
          const payload = {
            fullName: values.fullName,
            emailAddress: values.emailAddress,
            phoneNumber: values.phoneNumber.replace(/\D/g, ""), // Remove non-digit characters
          };

          updateTeamMateMutation.mutate(payload);
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
                    isDisabled={updateTeamMateMutation.isPending}
                    label={
                      updateTeamMateMutation.isPending
                        ? "Updating..."
                        : "Update Team Mate"
                    }
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

export default EditTeamMate;
