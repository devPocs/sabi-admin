import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  Flex,
  CloseButton,
  useColorModeValue,
  Circle,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  FormControl,
} from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";

interface EditWaivedMarketProps {
  onClose: () => void;
  onUpdate: (date: string, venue: string) => void;
  currentDate?: string;
  currentVenue?: string;
}

const EditWaivedMarket: React.FC<EditWaivedMarketProps> = ({
  onClose,
  onUpdate,
  currentDate = "",
  currentVenue = "",
}) => {
  const [date, setDate] = useState<string>("");
  const [venue, setVenue] = useState<string>("");

  // Initialize with current values
  useEffect(() => {
    if (currentDate) {
      // Convert from display format (e.g., "Nov 12, 2024") to date input format (YYYY-MM-DD)
      try {
        const parsedDate = new Date(currentDate);
        const formattedDate = parsedDate.toISOString().split("T")[0];
        setDate(formattedDate);
      } catch (e) {
        setDate("");
      }
    }

    if (currentVenue) {
      setVenue(currentVenue);
    }
  }, [currentDate, currentVenue]);

  const textColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const inputBgColor = useColorModeValue("gray.100", "gray.700");
  const updateBtnColor = useColorModeValue("#00BFA5", "#00BFA5");

  const handleUpdate = () => {
    onUpdate(date, venue);
    onClose();
  };

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
      <Heading size="md" fontWeight="700" color={textColor} mb="24px">
        Edit Waived Market Date
      </Heading>

      {/* Form */}
      <VStack spacing="24px" align="stretch">
        {/* Date Field */}
        <FormControl>
          <Text mb="2" fontWeight="600" fontSize="md">
            Date
          </Text>
          <InputGroup>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              bg={inputBgColor}
              border="none"
              height="48px"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                outline: "none",
                boxShadow: "none",
                borderColor: "transparent",
              }}
            />
            <InputRightElement height="48px" pointerEvents="none">
              <FiCalendar color="gray.500" />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Venue Field */}
        <FormControl>
          <Text mb="2" fontWeight="600" fontSize="md">
            Venue
          </Text>
          <Input
            placeholder="Enter a venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            bg={inputBgColor}
            border="none"
            height="48px"
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
              boxShadow: "none",
              borderColor: "transparent",
            }}
          />
        </FormControl>

        {/* Update Button */}
        <Button
          mt="4"
          bg={updateBtnColor}
          color="white"
          fontWeight="600"
          _hover={{ bg: "#00A895" }}
          height="48px"
          onClick={handleUpdate}
          borderRadius="8px"
        >
          Update
        </Button>
      </VStack>
    </Box>
  );
};

export default EditWaivedMarket;
