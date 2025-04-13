import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  FormControl,
  useToast,
  Text,
  Heading,
  Input,
  Button,
  Select,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { waivedAdminApi } from "@services/api";

// Validation schema for subscription plan
const SubscriptionPlanSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  frequency: Yup.string().required("Frequency is required"),
});

interface AddSubscriptionPlanProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddSubscriptionPlan = ({
  isOpen,
  onClose,
  onSuccess,
}: AddSubscriptionPlanProps) => {
  const toast = useToast();

  // Real API mutation for subscription plan creation
  const createSubscriptionMutation = useMutation({
    mutationFn: (planData: any) => {
      return waivedAdminApi.addSubscriptionPlan(planData);
    },
    onSuccess: (data) => {
      toast({
        title: "Subscription plan added",
        description: "Subscription plan has been added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Close the modal
      onClose();

      // Call onSuccess callback if provided
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess();
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to add subscription plan",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const frequencyOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="8px" maxW="400px">
        <ModalCloseButton
          bg="teal.100"
          color="teal.500"
          borderRadius="full"
          size="sm"
          m="16px"
        />
        <ModalBody p="32px 24px">
          <Heading
            as="h3"
            fontSize="20px"
            fontWeight="600"
            mb="24px"
            textAlign="center"
          >
            Add New Subscription Plan
          </Heading>

          <Formik
            initialValues={{
              amount: "",
              frequency: "",
            }}
            validationSchema={SubscriptionPlanSchema}
            onSubmit={(values, { resetForm }) => {
              const payload = {
                amount: parseFloat(values.amount),
                frequency: values.frequency,
              };

              createSubscriptionMutation.mutate(payload);
              resetForm();
            }}
          >
            {({ errors, touched, values, handleChange, setFieldValue }) => (
              <Form style={{ width: "100%" }}>
                <FormControl mb="16px">
                  <Text
                    fontSize="14px"
                    fontWeight="500"
                    mb="8px"
                    color="gray.600"
                  >
                    Amount
                  </Text>
                  <InputGroup size="md" height="40px">
                    <InputLeftAddon
                      children="₦"
                      bg="#E2E8F0"
                      color="gray.700"
                      border="none"
                      height="40px"
                    />
                    <Input
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      placeholder="5000"
                      bg="#F5F5F5"
                      border="none"
                      borderRadius="0 4px 4px 0"
                      p="12px 16px"
                      height="40px"
                      fontSize="14px"
                      _placeholder={{ color: "gray.400" }}
                    />
                  </InputGroup>
                  {errors.amount && touched.amount && (
                    <Text color="red.500" fontSize="12px" mt="4px">
                      {errors.amount}
                    </Text>
                  )}
                </FormControl>

                <FormControl mb="24px">
                  <Text
                    fontSize="14px"
                    fontWeight="500"
                    mb="8px"
                    color="gray.600"
                  >
                    Frequency
                  </Text>
                  <Select
                    name="frequency"
                    value={values.frequency}
                    onChange={handleChange}
                    placeholder="E.g. daily, monthly, yearly"
                    bg="#F5F5F5"
                    border="none"
                    borderRadius="4px"
                    p="12px 16px"
                    height="40px"
                    fontSize="14px"
                    _placeholder={{ color: "gray.400" }}
                  >
                    {frequencyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  {errors.frequency && touched.frequency && (
                    <Text color="red.500" fontSize="12px" mt="4px">
                      {errors.frequency}
                    </Text>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  isLoading={createSubscriptionMutation.isPending}
                  loadingText="Saving..."
                  bg="#00BFA5"
                  color="white"
                  width="100%"
                  borderRadius="4px"
                  p="10px"
                  height="40px"
                  fontSize="14px"
                  fontWeight="500"
                  _hover={{ bg: "teal.600" }}
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddSubscriptionPlan;
