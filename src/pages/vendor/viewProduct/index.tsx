import {
  Image,
  Text,
  Heading,
  Flex,
  VStack,
  CloseButton,
  useColorModeValue,
  Box,
  Circle,
  Icon,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

interface ViewProductProps {
  product?: {
    id: string;
    productName: string;
    price: number;
    imageUrl: string;
    productCategoryId: string;
    isAvailbleForUrgentPurchase: boolean;
    categoryName?: string;
  };
  onClose: () => void;
}

const ViewProduct: React.FC<ViewProductProps> = ({ product, onClose }) => {
  const [categoryName, setCategoryName] = useState<string>("");

  // Map category IDs to names
  useEffect(() => {
    if (product?.productCategoryId) {
      switch (product.productCategoryId) {
        case "1":
          setCategoryName("Electronics");
          break;
        case "2":
          setCategoryName("Clothing");
          break;
        case "3":
          setCategoryName("Food");
          break;
        case "4":
          setCategoryName("Other");
          break;
        default:
          setCategoryName("Unknown Category");
      }
    }
  }, [product]);

  const textColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  if (!product) {
    return null;
  }

  return (
    <Box width="100%" bg={bgColor} borderRadius="8px" overflow="hidden">
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
      <Heading
        size="lg"
        fontWeight="700"
        color={textColor}
        pt="24px"
        pb="16px"
        textAlign="center"
      >
        Product Details
      </Heading>

      {/* Product image */}
      <Flex justifyContent="center" alignItems="center" mb="24px" p="4">
        <Image
          src={product.imageUrl}
          alt={product.productName}
          width="120px"
          height="120px"
          objectFit="cover"
          borderRadius="md"
          fallbackSrc="https://via.placeholder.com/150"
          boxShadow="sm"
        />
      </Flex>

      {/* Product details */}
      <VStack align="stretch" spacing="20px" px="24px" pb="24px">
        <DetailItem label="Product Name" value={product.productName} />

        <DetailItem
          label="Price"
          value={`₦ ${product.price.toLocaleString()}`}
        />

        <DetailItem label="Category" value={categoryName} />

        <DetailItem
          label="Urgent Purchase"
          value={product.isAvailbleForUrgentPurchase ? "Yes" : "No"}
        />
      </VStack>
    </Box>
  );
};

// Helper component for consistent detail items
const DetailItem = ({ label, value, icon = null }) => {
  return (
    <Box>
      <Text fontSize="14px" fontWeight="600" color="black" mb="4px">
        {label}
      </Text>
      <HStack>
        <Text fontSize="15px" fontWeight="500" color="gray.700">
          {value}
        </Text>
        {icon}
      </HStack>
      {/* No divider */}
    </Box>
  );
};

export default ViewProduct;
