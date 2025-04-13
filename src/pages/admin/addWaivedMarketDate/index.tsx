import React, { useState } from "react";
import {
  Box,
  Text,
  Heading,
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

interface WaivedMarketDateProps {
  onClose: () => void;
  onSave: (date: string, venue: string) => void;
}

const WaivedMarketDate: React.FC<WaivedMarketDateProps> = ({
  onClose,
  onSave,
}) => {
  const [date, setDate] = useState<string>("");
  const [venue, setVenue] = useState<string>("");

  const textColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const inputBgColor = useColorModeValue("gray.100", "gray.700");
  const saveBtnColor = useColorModeValue("#00BFA5", "#00BFA5");

  const handleSave = () => {
    onSave(date, venue);
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
      <Heading size="lg" fontWeight="700" color={textColor} mb="24px">
        Waived Market Date
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
              placeholder="Select"
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

        {/* Save Button */}
        <Button
          mt="4"
          bg={saveBtnColor}
          color="white"
          fontWeight="600"
          _hover={{ bg: "#00A895" }}
          height="48px"
          onClick={handleSave}
          borderRadius="8px"
        >
          Save
        </Button>
      </VStack>
    </Box>
  );
};

export default WaivedMarketDate;
