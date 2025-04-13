import { useState } from "react";
import { Box, Text, Flex, HStack, Button } from "@chakra-ui/react";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import { GridColDef } from "@mui/x-data-grid";

const Customers = () => {
  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Table data
  const vendorRows = [
    {
      "S/N": 1,
      Vendor: "Mr. Kosofe",
      LGA: "Ikorodu",
      "Phone Number": "08171878521",
      id: 1,
    },
    {
      "S/N": 2,
      Vendor: "Mr. Kosofe",
      LGA: "Ikorodu",
      "Phone Number": "08171878521",
      id: 2,
    },
    {
      "S/N": 3,
      Vendor: "Mr. Kosofe",
      LGA: "Ikorodu",
      "Phone Number": "08171878521",
      id: 3,
    },
    {
      "S/N": 4,
      Vendor: "Mr. Kosofe",
      LGA: "Ikorodu",
      "Phone Number": "08171878521",
      id: 4,
    },
    {
      "S/N": 5,
      Vendor: "Mr. Kosofe",
      LGA: "Ikorodu",
      "Phone Number": "08171878521",
      id: 5,
    },
    {
      "S/N": 6,
      Vendor: "Mr. Kosofe",
      LGA: "Ikorodu",
      "Phone Number": "08171878521",
      id: 6,
    },
  ];

  // Table columns
  const columns: GridColDef[] = [
    {
      field: "S/N",
      headerName: "S/N",
      width: 70,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "Vendor",
      headerName: "Vendor",
      width: 200,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "LGA",
      headerName: "LGA",
      width: 150,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "Phone Number",
      headerName: "Phone Number",
      width: 150,
      disableColumnMenu: true,
      flex: 1,
    },
  ];

  const handleRowClick = (params) => {
    console.log(params);
  };

  return (
    <Box w={["100%", "100%"]}>
      {/* Customers List Header */}
      <Box display={"flex"} mt={5} mb={6} justifyContent="space-between">
        <Text fontWeight={"bold"} fontSize="lg" color={"black"}>
          Customers List
        </Text>
      </Box>

      {/* Search Section */}
      <Flex mt="6" mb="6">
        <Box w="100%" h="40px" maxW="320px">
          <SearchInput
            placeHolder="Search for a customer"
            showSelect={true}
            selectMenu={[{ name: "All LGAs", value: "all lgas" }]}
          />
        </Box>
      </Flex>

      {/* Table */}
      <Box mt={["10px", "24px"]}>
        <Tables
          onRowClick={handleRowClick}
          columns={columns}
          rows={vendorRows}
        />

        {/* Pagination */}
        <Flex justify="space-between" align="center" mt={4} p={2}>
          <Flex align="center">
            <Text fontSize="sm" color="gray.600" mr={2}>
              Rows per page: 10
            </Text>
          </Flex>

          <HStack spacing={1}>
            <Button variant="ghost" size="sm" isDisabled={true}>
              ‹
            </Button>
            <Button
              size="sm"
              colorScheme="teal"
              variant="solid"
              borderRadius="md"
            >
              1
            </Button>
            <Button variant="ghost" size="sm">
              2
            </Button>
            <Button variant="ghost" size="sm">
              ›
            </Button>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Customers;
