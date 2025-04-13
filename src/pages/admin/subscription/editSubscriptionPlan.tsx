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

interface EditSubscriptionPlanProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  planData: {
    id: string | number;
    amount: string | number;
    frequency: string;
  };
}

const EditSubscriptionPlan = ({
  isOpen,
  onClose,
  onSuccess,
  planData,
}: EditSubscriptionPlanProps) => {
  const toast = useToast();

  // Real API mutation for subscription plan update
  const updateSubscriptionMutation = useMutation({
    mutationFn: (data: any) => {
      return waivedAdminApi.updateSubscriptionPlan(data);
    },
    onSuccess: () => {
      toast({
        title: "Subscription plan updated",
        description: "Subscription plan has been updated successfully",
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
        description:
          error?.data?.message || "Failed to update subscription plan",
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

  // Format the amount without commas for the input field
  const formatAmount = (amount) => {
    if (typeof amount === "string") {
      return amount.replace(/,/g, "");
    }
    return amount;
  };

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
            Edit Subscription Plan
          </Heading>

          <Formik
            initialValues={{
              amount: formatAmount(planData?.amount) || "",
              frequency: planData?.frequency?.toLowerCase() || "",
            }}
            enableReinitialize
            validationSchema={SubscriptionPlanSchema}
            onSubmit={(values) => {
              const payload = {
                id: planData.id,
                amount: parseFloat(values.amount),
                frequency: values.frequency,
              };

              updateSubscriptionMutation.mutate(payload);
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
                  <Input
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    placeholder="₦"
                    bg="#F5F5F5"
                    border="none"
                    borderRadius="4px"
                    p="12px 16px"
                    height="40px"
                    fontSize="14px"
                    _placeholder={{ color: "gray.400" }}
                  />
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
                    bg="#F5F5F5"
                    border="none"
                    borderRadius="4px"
                    p="12px 16px"
                    height="40px"
                    fontSize="14px"
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
                  isLoading={updateSubscriptionMutation.isPending}
                  loadingText="Updating..."
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
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditSubscriptionPlan;
