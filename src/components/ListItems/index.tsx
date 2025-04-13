import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const ListItems = () => {
  return (
    <HStack alignItems={"flex-start"}>
      <Box
        width="10px"
        height="10px"
        bg="orange.200"
        borderRadius="full"
        display="inline-block"
      />
      <VStack alignItems={"flex-start"}>
        <Heading
          fontWeight="400"
          fontSize={["13px", "16px"]}
          lineHeight="24px"
          as="p"
        >
          John Doe has paid her levy to Caretaker A
        </Heading>
        <Text
          color="gray.300"
          fontWeight="400"
          fontSize="14px"
          lineHeight="7px"
          as="p"
        >
          Yesterday at 11:42 PM
        </Text>
      </VStack>
    </HStack>
  );
};

export default ListItems;
