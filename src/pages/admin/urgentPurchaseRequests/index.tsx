import { useState } from "react";
import {
  Box,
  HStack,
  Text,
  Flex,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import { GridColDef } from "@mui/x-data-grid";
import { FiEdit2 } from "react-icons/fi";

import ViewUrgentPurchaseRequest from "./viewUrgentPurchaseRequest";

const UrgentPurchaseRequests = () => {
  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Table data for urgent purchase requests
  const requestRows = [
    {
      "S/N": 1,
      Date: "31/12/2025",
      Product: "Banana",
      Customer: "Omas Meg",
      "Vendor ID": "sc1234",
      id: 1,
      // Additional data for the modal
      price: 10000,
      vendorId: "VEND1234",
      customerName: "Omas Meg",
      customerId: "C12345",
      deliveryInfo: "Plot 58a, Omorinre Johnson street, Lekki phase 1",
      image: "/bananas.jpg", // You would need to provide the actual image path
    },
    {
      "S/N": 2,
      Date: "31/12/2025",
      Product: "Rice (50kg)",
      Customer: "John Doe",
      "Vendor ID": "sc1235",
      id: 2,
      price: 45000,
      vendorId: "VEND5678",
      customerName: "John Doe",
      customerId: "C67890",
      deliveryInfo: "24 Admiralty Way, Lekki Phase 1",
    },
    {
      "S/N": 3,
      Date: "31/12/2025",
      Product: "Cooking Oil",
      Customer: "Sarah Brown",
      "Vendor ID": "sc1236",
      id: 3,
      price: 8500,
      vendorId: "VEND9101",
      customerName: "Sarah Brown",
      customerId: "C11213",
      deliveryInfo: "15 Chevron Drive, Lekki",
    },
    {
      "S/N": 4,
      Date: "31/12/2025",
      Product: "Flour (25kg)",
      Customer: "Michael Chen",
      "Vendor ID": "sc1237",
      id: 4,
      price: 22000,
      vendorId: "VEND1415",
      customerName: "Michael Chen",
      customerId: "C16171",
      deliveryInfo: "7 Ajose Adeogun, Victoria Island",
    },
    {
      "S/N": 5,
      Date: "31/12/2025",
      Product: "Sugar (10kg)",
      Customer: "Omas Meg",
      "Vendor ID": "sc1238",
      id: 5,
      price: 15000,
      vendorId: "VEND1920",
      customerName: "Omas Meg",
      customerId: "C12345",
      deliveryInfo: "Plot 58a, Omorinre Johnson street, Lekki phase 1",
    },
  ];

  // Function to filter requests based on search query
  const getFilteredRequests = () => {
    if (!isSearchActive || !searchQuery.trim() || !requestRows.length) {
      return requestRows;
    }

    const lowercasedSearch = searchQuery.toLowerCase();
    return requestRows.filter(
      (request) =>
        (request.Product &&
          request.Product.toLowerCase().includes(lowercasedSearch)) ||
        (request.Customer &&
          request.Customer.toLowerCase().includes(lowercasedSearch)) ||
        (request["Vendor ID"] &&
          request["Vendor ID"].toLowerCase().includes(lowercasedSearch))
    );
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchQuery(value);
    setIsSearchActive(true);
  };

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
      field: "Date",
      headerName: "Date",
      width: 120,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "Product",
      headerName: "Product",
      width: 150,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "Customer",
      headerName: "Customer",
      width: 150,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "Vendor ID",
      headerName: "Vendor ID",
      width: 120,
      disableColumnMenu: true,
      flex: 1,
    },
  ];

  const handleRowClick = (params) => {
    // Set the selected request and open the modal
    setSelectedRequest(params.row);
    onOpen();
  };

  return (
    <Box w={["100%", "100%"]}>
      {/* Urgent Purchase Requests Header */}
      <Box display={"flex"} justifyContent="space-between">
        <Text fontWeight={"bold"} pe="2" color={"black"}>
          Urgent Purchase Requests
        </Text>
      </Box>

      {/* Search Section */}
      <Flex mt="6" mb="6">
        <Box w="100%" h="40px" maxW="320px">
          <SearchInput
            placeHolder="Search requests"
            showSelect={false}
            onSearch={handleSearch}
          />
        </Box>
      </Flex>

      {/* Table */}
      <Box mt={["10px", "24px"]}>
        {getFilteredRequests().length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text>
              {isSearchActive && searchQuery.trim() !== ""
                ? "No purchase requests match your search criteria."
                : "No urgent purchase requests found."}
            </Text>
          </Box>
        ) : (
          <Tables
            onRowClick={handleRowClick}
            columns={columns}
            rows={getFilteredRequests()}
          />
        )}

        {/* Pagination */}
        {getFilteredRequests().length > 0 && (
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
        )}
      </Box>

      {/* Urgent Purchase Request Modal */}
      <ViewUrgentPurchaseRequest
        isOpen={isOpen}
        onClose={onClose}
        requestData={selectedRequest}
      />
    </Box>
  );
};

export default UrgentPurchaseRequests;
