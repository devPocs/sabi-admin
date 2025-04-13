import {
  Text,
  Heading,
  Flex,
  VStack,
  CloseButton,
  useColorModeValue,
  Box,
  Circle,
  Button,
  Avatar,
} from "@chakra-ui/react";

interface ComplaintDetailsProps {
  complaint?: {
    id?: string;
    complaintId?: string;
    sender?: string;
    vendorId?: string;
    description?: string;
    dateSent?: string;
    status?: string;
  };
  onClose: () => void;
}

const ViewComplaint: React.FC<ComplaintDetailsProps> = ({
  complaint,
  onClose,
}) => {
  const textColor = useColorModeValue("gray.900", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const resolvedBtnBg = useColorModeValue("#E6FFF9", "#E6FFF9");

  if (!complaint) {
    return null;
  }

  return (
    <Box
      width="100%"
      bg={bgColor}
      borderRadius="8px"
      p="24px"
      position="relative"
    >
      {/* Close button */}
      <Box position="absolute" top="12px" right="12px" zIndex="1">
        <Circle
          size="32px"
          bg="rgba(230, 255, 250, 0.8)"
          cursor="pointer"
          onClick={onClose}
        >
          <CloseButton size="sm" />
        </Circle>
      </Box>

      {/* Heading */}
      <Heading size="lg" fontWeight="700" color={textColor} mb="24px">
        Complaint Details
      </Heading>

      {/* Complaint icon */}
      <Flex justifyContent="center" alignItems="center" mb="24px">
        <Avatar
          size="lg"
          bg="orange.100"
          icon={
            <Box as="span" fontSize="2xl" color="orange.500">
              ⚠️
            </Box>
          }
        />
      </Flex>

      {/* Complaint details */}
      <VStack align="stretch" spacing="20px">
        <DetailItem
          label="Complaint ID"
          value={complaint.complaintId || "#12345"}
        />
        <DetailItem
          label="Vendor ID"
          value={complaint.vendorId || "VEND1234"}
        />
        <DetailItem
          label="Date Sent"
          value={complaint.dateSent || "Oct 29, 2024; 10:00 am"}
        />
        <DetailItem label="Sender" value={complaint.sender || "Idowu Jide"} />
        <DetailItem
          label="Complaint"
          value={
            complaint.description ||
            "Vendor 123 shouted at me all just because I requested for a nylon bag to pack all the items I got from her store at the waived market jingles on the 5th of May."
          }
        />
        <DetailItem label="Status" value={complaint.status || "Pending"} />
      </VStack>

      {/* Mark as resolved button */}
      <Button
        w="100%"
        mt="32px"
        bg={resolvedBtnBg}
        color="teal.500"
        fontWeight="600"
        _hover={{ bg: "teal.50" }}
        height="48px"
        borderRadius="8px"
      >
        Mark as Resolved
      </Button>
    </Box>
  );
};

// Helper component for consistent detail items
const DetailItem = ({ label, value }) => {
  return (
    <Box>
      <Text fontSize="14px" fontWeight="600" color="black" mb="4px">
        {label}
      </Text>
      <Text fontSize="15px" fontWeight="400" color="gray.700">
        {value}
      </Text>
    </Box>
  );
};

export default ViewComplaint;
