import {
  Box,
  Text,
  Flex,
  HStack,
  Button,
  Center,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { waivedAdminApi } from "@services/api";
import Spinner from "@components/spinner";
import ViewVendor from "./viewVendorDetails";

const Vendors = () => {
  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useToast();

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Fetch vendors data using useQuery
  const {
    data: vendorsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: waivedAdminApi.getVendorAndProducts,
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to fetch vendors",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  console.log("vendorsData", vendorsData);

  // Transform API data for the table
  const vendorRows =
    vendorsData?.data?.pageItems?.map((vendor, index) => ({
      "S/N": index + 1,
      Vendor: vendor.name || vendor.vendorName || "N/A",
      LGA: vendor.lga || "N/A",
      "Phone Number": vendor.phoneNumber || "N/A",
      id: vendor.id || index,
      // Include additional fields needed for the modal
      email: vendor.email || "N/A",
      address: vendor.address || "N/A",
      dateAdded: vendor.dateAdded || new Date().toISOString(),
      profileImage: vendor.profileImage || "",
    })) || [];

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
    // Format the vendor data for the modal
    const vendor = {
      id: params.row.id,
      businessName: params.row.Vendor,
      phoneNumber: params.row["Phone Number"],
      lga: params.row.LGA,
      email: params.row.email,
      address: params.row.userAddress,
      dateAdded: formatDate(params.row.dateAdded),
      profileImage: params.row.profileImage,
    };

    setSelectedVendor(vendor);
    onOpen();
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return `${date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}; ${date
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase()}`;
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Box w={["100%", "100%"]}>
      {/* Vendors List Header */}
      <Box display={"flex"} mt={5} mb={6} justifyContent="space-between">
        <Text fontWeight={"bold"} fontSize="lg" color={"black"}>
          Vendors List
        </Text>
      </Box>

      {/* Search Section */}
      <Flex mt="6" mb="6">
        <Box w="100%" h="40px" maxW="320px">
          <SearchInput
            placeHolder="Search for a vendor"
            showSelect={true}
            selectMenu={[{ name: "All LGAs", value: "all lgas" }]}
          />
        </Box>
      </Flex>

      {/* Table */}
      <Box mt={["10px", "24px"]}>
        {isLoading ? (
          <Center py={10}>
            <Spinner />
          </Center>
        ) : isError ? (
          <Center py={10}>
            <Text color="red.500">
              Error loading vendors. Please try again.
            </Text>
          </Center>
        ) : vendorRows.length === 0 ? (
          <Center py={10}>
            <Text>No vendors found.</Text>
          </Center>
        ) : (
          <Tables
            onRowClick={handleRowClick}
            columns={columns}
            rows={vendorRows}
          />
        )}

        {/* Pagination */}
        {!isLoading && !isError && vendorRows.length > 0 && (
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

      {/* Vendor Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent borderRadius="12px" maxW="450px">
          <ModalBody p={0}>
            <ViewVendor vendor={selectedVendor} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Vendors;
