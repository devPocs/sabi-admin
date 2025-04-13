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

interface VendorDetailsProps {
  vendor?: {
    id?: string;
    name?: string;
    businessName?: string;
    phoneNumber?: string;
    email?: string;
    lga?: string;
    address?: string;
    dateAdded?: string;
    profileImage?: string;
  };
  onClose: () => void;
}

const ViewVendor: React.FC<VendorDetailsProps> = ({ vendor, onClose }) => {
  const textColor = useColorModeValue("gray.900", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const blockBtnBg = useColorModeValue("#FAD3D3", "#FAD3D3");

  if (!vendor) {
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
        Vendor Details
      </Heading>

      {/* Vendor avatar */}
      <Flex justifyContent="center" alignItems="center" mb="24px">
        <Avatar
          size="lg"
          name={vendor.name || vendor.businessName}
          src={vendor.profileImage}
          borderRadius="full"
        />
      </Flex>

      {/* Vendor details */}
      <VStack align="stretch" spacing="20px">
        <DetailItem
          label="Business Name"
          value={vendor.businessName || "Grace & Glory"}
        />
        <DetailItem
          label="Phone Number"
          value={vendor.phoneNumber || "09060355350"}
        />
        <DetailItem
          label="Email Address"
          value={vendor.email || "Musilu@gmail.com"}
        />
        <DetailItem label="LGA" value={vendor.lga || "Ikorodu North"} />
        <DetailItem
          label="Address"
          value={
            vendor.address || "Road 7a, Dr shaffideen amuwo street, Ajah, Lagos"
          }
        />
        <DetailItem
          label="Date Added"
          value={vendor.dateAdded || "Oct 29, 2024; 10:00 am"}
        />
      </VStack>

      {/* Block button */}
      <Button
        w="100%"
        mt="32px"
        bg={blockBtnBg}
        color="#E53E3E"
        fontWeight="600"
        _hover={{ bg: "#F8BEBE" }}
        height="48px"
        borderRadius="8px"
      >
        Block
      </Button>
      {/* Apprive Button */}
      <Button
        w="100%"
        mt="32px"
        bg={"green.500"}
        color="white"
        fontWeight="600"
        _hover={{ bg: "#F8BEBE" }}
        height="48px"
        borderRadius="8px"
      >
        Approve Vendor
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

export default ViewVendor;
