import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const CustomDateRangePicker = () => {
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = () => {
    setRange({});
    setIsOpen(false);
  };

  return (
    <Box>
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom-start"
      >
        <PopoverTrigger>
          <Button
            color="gray.300"
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            borderRadius={"1px"}
            border={"1px solid #dfdfdf"}
          >
            {range.from && range.to
              ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
              : "Date Range"}
          </Button>
        </PopoverTrigger>
        <PopoverContent width="fit-content">
          <PopoverArrow />
          <PopoverBody>
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              styles={{
                caption: { color: "#2D3748" }, // Customize with Chakra theme
                day: { padding: "8px" },
              }}
            />
            <HStack justifyContent="space-between" mt={4}>
              <Button size="sm" variant="outline" onClick={handleClear}>
                Clear
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Confirm
              </Button>
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default CustomDateRangePicker;
