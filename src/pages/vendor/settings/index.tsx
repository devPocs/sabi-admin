import { Box } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { vendorApi } from "@services/api";
import SecuredInput from "@components/securedInputs";

// Password Change Component
const Password = () => {
  // State for form values
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useToast();

  // Set up the mutation
  const changePasswordMutation = useMutation({
    mutationFn: (passwordData: {
      currentPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    }) => vendorApi.changePassword(passwordData),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your password has been updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to change password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Call the mutation
    changePasswordMutation.mutate({
      currentPassword,
      newPassword,
      confirmNewPassword: confirmPassword,
    });
  };

  // Handler for SecuredInput changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmNewPassword") {
      setConfirmPassword(value);
    }
  };

  return (
    <Box maxW="600px" py={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl id="current-password">
            <SecuredInput
              name="currentPassword"
              onChange={handlePasswordChange}
              value={currentPassword}
              title="Current Password"
              placeholder="********"
              width={360}
              customStyle={{ background: "gray.50" }}
            />
          </FormControl>

          <FormControl id="new-password">
            <SecuredInput
              name="newPassword"
              onChange={handlePasswordChange}
              value={newPassword}
              title="New Password"
              placeholder="********"
              width={360}
              customStyle={{ background: "gray.50" }}
            />
          </FormControl>

          <FormControl id="confirm-password">
            <SecuredInput
              name="confirmNewPassword"
              onChange={handlePasswordChange}
              value={confirmPassword}
              title="Confirm New Password"
              placeholder="********"
              width={360}
              customStyle={{ background: "gray.50" }}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            width={360}
            isLoading={changePasswordMutation.isPending}
            loadingText="Saving"
          >
            Save
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

// Main Settings Component
const Settings = () => {
  const { role } = useCurrentUser();

  return (
    <Box width={"100%"}>
      <Tabs isFitted variant="enclosed">
        <TabList
          display="flex"
          gap={2}
          justifyContent="flex-start"
          background="#f5f5f5"
          borderRadius="md"
          p="2"
          pb="0px"
          border={"none"}
          width="fit-content"
        >
          <Tab
            _selected={{
              borderBottom: "3px solid #008698", // Highlight the selected tab
              background: "white", // Keep background white
              color: "black",
            }}
            _hover={{ background: "gray.100" }} // Light gray hover effect
            border="none"
            px="4"
            py="1"
            background={"brand.1000"}
            borderRadius="0"
          >
            Password Change
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Password />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Settings;
