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
  useBreakpointValue,
} from "@chakra-ui/react";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { waivedAdminApi } from "@services/api";
import Spinner from "@components/spinner";
import ViewVendor from "./viewVendorDetails";
import { useLGAs } from "@hooks/useFetchLGAs";
import { LGA } from "@interface/ILGA";
import { toast } from "react-toastify";

interface VendorType {
  id: number | string;
  businessName: string;
  phoneNumber: string;
  lga: string;
  email: string;
  address: string;
  dateAdded: string;
  profileImage: string;
}

const Vendors = () => {
  const toast = useToast();

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [selectedLGA, setSelectedLGA] = useState<string>("all lgas");

  const isMobile = useBreakpointValue({ base: true, md: false });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVendor, setSelectedVendor] = useState<VendorType | null>(null);

  const { data: lgasData = [], isLoading: isLGAsLoading } = useLGAs();

  const lgaOptions = useMemo(() => {
    if (!lgasData || lgasData.length === 0) {
      return [{ name: "All LGAs", value: "all lgas" }];
    }

    try {
      const options = lgasData.map((lga: LGA) => ({
        name: lga.name,
        value: lga.name.toLowerCase(),
      }));

      return [{ name: "All LGAs", value: "all lgas" }, ...options];
    } catch (error) {
      console.error("Error processing LGAs:", error);
      return [{ name: "All LGAs", value: "all lgas" }];
    }
  }, [lgasData]);

  const {
    data: vendorsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: waivedAdminApi.getVendorAndProducts,
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to fetch vendors",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const vendorRows =
    vendorsData?.data?.pageItems?.map((vendor: any, index: number) => ({
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
      userAddress: vendor.address || "N/A", // ensuring this field is included for the modal
    })) || [];

  // Search functionality
  const getFilteredVendors = () => {
    if (
      (!isSearchActive || !searchQuery.trim()) &&
      selectedLGA === "all lgas"
    ) {
      return vendorRows;
    }

    return vendorRows.filter((vendor) => {
      const matchesSearch =
        !isSearchActive ||
        !searchQuery.trim() ||
        vendor.Vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor["Phone Number"]
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesLGA =
        selectedLGA === "all lgas" ||
        vendor.LGA.toLowerCase() === selectedLGA.toLowerCase();

      return matchesSearch && matchesLGA;
    });
  };

  // Handle search
  const handleSearch = (value: string): void => {
    setSearchQuery(value);
    setIsSearchActive(true);
  };

  // Handle LGA selection
  const handleLGASelect = (value: string): void => {
    setSelectedLGA(value);
  };

  // Table columns with responsive configuration
  const columns: GridColDef[] = [
    {
      field: "S/N",
      headerName: "S/N",
      width: 70,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 0.5,
      minWidth: 50,
    },
    {
      field: "Vendor",
      headerName: "Vendor",
      width: 200,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 1.5,
      minWidth: 120,
    },
    {
      field: "LGA",
      headerName: "LGA",
      width: 150,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 1,
      minWidth: 80,
    },
    {
      field: "Phone Number",
      headerName: "Phone Number",
      width: 150,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 1,
      minWidth: 120,
    },
  ];

  const handleRowClick = (params: any) => {
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
  const formatDate = (dateString: string) => {
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
    <Box w="100%">
      {/* Vendors List Header */}
      <Box
        display="flex"
        mt={[3, 4, 5]}
        mb={[4, 5, 6]}
        justifyContent="space-between"
      >
        <Text fontWeight="bold" fontSize={["md", "lg"]} color="black">
          Vendors List
        </Text>
      </Box>

      {/* Search Section */}
      <Flex mt={[4, 5, 6]} mb={[4, 5, 6]}>
        <Box w="100%" h="40px" maxW={["100%", "100%", "320px"]}>
          <SearchInput
            placeHolder="Search for a vendor"
            showSelect={true}
            selectMenu={
              isLGAsLoading
                ? [{ name: "All LGAs", value: "all lgas" }]
                : lgaOptions
            }
            onSearch={handleSearch}
            onSelectChange={handleLGASelect}
          />
        </Box>
      </Flex>

      {/* Table */}
      <Box mt={["10px", "16px", "24px"]} overflowX="auto">
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
        ) : getFilteredVendors().length === 0 ? (
          <Center py={10}>
            <Text>
              {isSearchActive && searchQuery.trim() !== ""
                ? "No vendors match your search criteria."
                : "No vendors found."}
            </Text>
          </Center>
        ) : (
          <Tables
            onRowClick={handleRowClick}
            columns={columns}
            rows={getFilteredVendors()}
          />
        )}

        {/* Pagination */}
        {!isLoading && !isError && getFilteredVendors().length > 0 && (
          <Flex
            justify={["center", "space-between"]}
            align="center"
            mt={4}
            p={2}
            flexDirection={["column", "row"]}
            gap={[3, 0]}
          >
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
        <ModalContent borderRadius="12px" maxW={["90%", "450px"]}>
          <ModalBody p={0}>
            <ViewVendor vendor={selectedVendor} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Vendors;
