import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  VStack,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";

interface UrgentPurchaseRequestProps {
  isOpen: boolean;
  onClose: () => void;
  requestData: {
    id: number;
    date?: string;
    product?: string;
    price?: string | number;
    vendorId?: string;
    customerName?: string;
    customerId?: string;
    deliveryInfo?: string;
    image?: string;
  } | null;
}

const ViewUrgentPurchaseRequest = ({
  isOpen,
  onClose,
  requestData,
}: UrgentPurchaseRequestProps) => {
  if (!requestData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent borderRadius="md" overflow="hidden" mx={4}>
        {/* Header with built-in close button */}
        <ModalHeader
          borderColor="blue.100"
          color="gray.800"
          pt={6}
          pb={4}
          textAlign="center"
          position="relative"
        >
          Urgent Purchase Request
          <ModalCloseButton
            position="absolute"
            top={2}
            right={2}
            color="green.500"
            bg="green.50"
            borderRadius="full"
            size="sm"
            _hover={{ bg: "green.100" }}
          />
        </ModalHeader>

        <ModalBody p={0}>
          {/* Product Image */}
          <Flex justify="center" py={4} bg="white">
            <Image
              src={requestData.image || "https://via.placeholder.com/200x150"}
              alt={requestData.product || "Product"}
              maxH="180px"
              objectFit="contain"
            />
          </Flex>

          {/* Request Details */}
          <Box p={6}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight="semibold" color="black">
                  Product
                </Text>
                <Text fontSize="sm">{requestData.product || "N/A"}</Text>
              </Box>

              <Box>
                <Text fontSize="md" fontWeight="semibold" color="black">
                  Price
                </Text>
                <Text fontSize="sm">
                  {typeof requestData.price === "number"
                    ? requestData.price.toLocaleString()
                    : requestData.price || "N/A"}
                </Text>
              </Box>

              <Box>
                <Text fontSize="md" fontWeight="semibold" color="black">
                  Vendor ID
                </Text>
                <Text fontSize="sm">{requestData.vendorId || "N/A"}</Text>
              </Box>

              <Box>
                <Text fontSize="md" fontWeight="semibold" color="black">
                  Customer Name
                </Text>
                <Text fontSize="sm">{requestData.customerName || "N/A"}</Text>
              </Box>

              <Box>
                <Text fontSize="md" color="black">
                  Customer ID
                </Text>
                <Text fontSize="sm">{requestData.customerId || "N/A"}</Text>
              </Box>

              <Box>
                <Text fontSize="md" fontWeight="semibold" color="black">
                  Delivery Info
                </Text>
                <Text fontSize="sm">{requestData.deliveryInfo || "N/A"}</Text>
              </Box>
            </VStack>

            {/* Action Buttons */}
            <Flex gap={4} mt={8} justifyContent="center">
              <Button
                colorScheme="red"
                variant="outline"
                size="md"
                flexGrow={1}
                borderRadius="md"
              >
                Reject
              </Button>
              <Button
                colorScheme="teal"
                size="md"
                flexGrow={1}
                borderRadius="md"
              >
                Approve
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewUrgentPurchaseRequest;
