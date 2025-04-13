import { Box, Text, useToast } from "@chakra-ui/react";
import Buttons from "@components/button";
import { globalStyles } from "../../../../theme/styles";
import { vendorApi } from "@services/api";
import { useMutation } from "@tanstack/react-query";
import { CgDanger } from "react-icons/cg";

const subscriptionPayload = {
  amount: 23000,
  proofOfPayment: "i have my proof, thanks!",
  subscriberId: "6ce326b2-80a0-45bd-9f12-c6366084a91b",
};

const SubscribAct = ({ setSubscribe }: any) => {
  const toast = useToast();
  const createSubscriptionMutation = useMutation({
    mutationFn: (subscriptionData: any) =>
      vendorApi.vendorSubscribe(subscriptionData),
    onSuccess: (data) => {
      setSubscribe(true);

      toast({
        title: "Subscription added",
        description:
          "You have successfully subscribed. You can now add products.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log(data);
      // You could reset the form or redirect here
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to add subscription",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={["9%"]}
      bg="brand.1000"
      width="100%"
      borderRadius="8px"
      padding="8px"
      gap="8px"
      border={"1px solid #EE5F53"}
    >
      <Box display={"flex"} alignItems={"center"} py="4" px="4">
        <CgDanger fontSize={36} color={globalStyles.colors.red[600]} />
        <Box ms="4">
          <Text
            color={globalStyles.colors.red[600]}
            fontSize={"22"}
            fontWeight={"bold"}
          >
            Subscribe to Activate your products at a waived price.
          </Text>
          <Text fontSize={"16"}>
            You need to pay{" "}
            <Text color={"black"} fontWeight={"bold"} as="span">
              N500/month
            </Text>{" "}
            to activate the waived price feature on
          </Text>
          <Text fontSize={"16"}>
            SabiMarket. Make payment to get access to this platform.
          </Text>
        </Box>
      </Box>

      <Box>
        <Buttons
          onClick={() => createSubscriptionMutation.mutate(subscriptionPayload)}
          bg={globalStyles.colors.red[600]}
          _hover={{ bg: globalStyles.colors.red[600] }}
          label={
            createSubscriptionMutation.isPending ? "Processing..." : "Subscribe"
          }
          type="button"
          fontSize={"14"}
          px="12"
        />
      </Box>
    </Box>
  );
};

export default SubscribAct;
