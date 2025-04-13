import Buttons from "@components/button";
import { Box, Heading, Text, HStack } from "@chakra-ui/react";
import bg from "@assets/add.png";

const traderInfos = [
  {
    title: "Are you sure you want to block this Assistant Officer?",
    value:
      "Kindly note that you can’t undo this action. Click on Yes to block.",
  },
];

interface props {
  onCancel: () => void;
  handleBlock: () => void;
  traderInfo?: {
    title: string;
    value: string;
  }[];
}
const PromptModal = ({
  onCancel,
  handleBlock,
  traderInfo = traderInfos,
}: props) => {
  return (
    <Box
      pt={{ base: "30px", md: "50px" }}
      width="100%"
      maxH="249px"
      borderRadius="8px"
      bg="brand.1000"
    >
      {traderInfo.map((item) => (
        <Box mb={{ base: "15px", md: "24px" }}>
          <Text
            fontWeight="bold"
            fontSize={{ base: "17px", md: "20px" }}
            lineHeight="30.2px"
            letterSpacing="0.02em"
            textAlign="justify"
          >
            {item.title}
          </Text>
          <Text
            fontWeight="400"
            fontSize={{ base: "12px", md: "16px" }}
            lineHeight="22.4px"
            mb={{ base: "8px", md: "10px" }}
            color={"gray.300"}
          >
            {item.value}
          </Text>
        </Box>
      ))}
      <Box mt={["36px"]}>
        <HStack>
          <Buttons
            variant={"ghost"}
            isDisabled={status == "pending"}
            label="Block"
            type="submit"
            onClick={onCancel}
          />
          <Buttons
            variant={"brand"}
            isDisabled={status == "pending"}
            label="Block"
            type="submit"
            onClick={handleBlock}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default PromptModal;
