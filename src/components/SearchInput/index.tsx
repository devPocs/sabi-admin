import { useState, useEffect } from "react";
import {
  InputGroup,
  Input,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

interface props {
  showSelect?: boolean;
  showSelect2?: boolean;
  placeHolder?: string;
  selectMenu?: {
    name: string;
    value: string;
  }[];
  defaultOption?: string;
  onSearch?: (searchValue: string) => void; // Add callback for search
}

function SearchInput({
  showSelect,
  placeHolder = "",
  selectMenu,
  showSelect2,
  defaultOption = "",
  onSearch,
}: props) {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [searchValue, setSearchValue] = useState(""); // Add state for search input value

  // Initialize with first item from selectMenu if defaultOption is empty and selectMenu exists
  useEffect(() => {
    if (selectedOption === "" && selectMenu && selectMenu.length > 0) {
      setSelectedOption(selectMenu[0].name);
    }
  }, [selectMenu, selectedOption]);

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <HStack w="560px" spacing="4px" align="center">
      <InputGroup
        w="100%"
        borderRadius="md"
        border="1px solid #E2E8F0"
        bg="white"
        h="40px"
      >
        <Input
          h="100%"
          type="text"
          placeholder={placeHolder}
          borderRadius="md"
          focusBorderColor="gray.300"
          border="none"
          _placeholder={{ color: "gray.400", fontSize: "14px" }}
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <IconButton
          aria-label="Search"
          icon={<FaSearch />}
          position="absolute"
          right="0"
          size="sm"
          colorScheme="teal"
          variant="ghost"
          onClick={handleSearch}
          zIndex="1"
        />
      </InputGroup>
      {showSelect && (
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<FaChevronDown />}
            bg="white"
            border="1px solid #E2E8F0"
            borderRadius="md"
            width="220px"
            height="40px"
            fontSize="14px"
            fontWeight="500"
            color="gray.800"
            _hover={{ bg: "white", borderColor: "gray.300" }}
            _active={{ bg: "white" }}
            _expanded={{ bg: "white", borderColor: "gray.300" }}
          >
            {selectedOption}
          </MenuButton>
          <MenuList
            minWidth="100px"
            border="1px solid #E2E8F0"
            borderRadius="md"
            boxShadow="sm"
            zIndex={10}
          >
            {selectMenu?.map((item, index) => (
              <MenuItem
                key={index}
                fontSize="14px"
                bg={selectedOption === item.name ? "gray.100" : "transparent"}
                _hover={{ bg: "gray.100" }}
                onClick={() => setSelectedOption(item.name)}
              >
                {item.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
      {showSelect2 && (
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<FaChevronDown />}
            bg="white"
            border="1px solid #E2E8F0"
            borderRadius="md"
            width="100px"
            height="40px"
            fontSize="14px"
            fontWeight="500"
          >
            Select
          </MenuButton>
          <MenuList minWidth="100px">
            {selectMenu?.map((item, index) => (
              <MenuItem key={index} fontSize="14px">
                {item.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
    </HStack>
  );
}

export default SearchInput;
