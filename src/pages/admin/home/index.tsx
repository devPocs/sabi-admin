import { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  Text,
  Card,
  CardBody,
  Grid,
  GridItem,
  Flex,
  IconButton,
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
import { Link } from "react-router-dom";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import { GridColDef } from "@mui/x-data-grid";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers, FiShoppingBag, FiEdit2, FiPlus } from "react-icons/fi";
import { globalStyles } from "../../../theme/styles";
import { useQuery } from "@tanstack/react-query";
import { waivedAdminApi } from "@services/api";
import WaivedMarketDate from "../addWaivedMarketDate";
import EditWaivedMarket from "../editWaivedMarket";
import Spinner from "@components/spinner";

// Define types
interface Vendor {
  id: string;
  name?: string;
  vendorName?: string;
  lga?: string;
  phoneNumber?: string;
}

interface VendorRow {
  "S/N": number;
  Vendor: string;
  LGA: string;
  "Phone Number": string;
  id: string | number;
}

const Home = () => {
  // State for waived market date
  const [marketDate, setMarketDate] = useState<string>("Nov 12, 2024");
  const [marketVenue, setMarketVenue] = useState<string>("");
  const [hasMarketDate, setHasMarketDate] = useState<boolean>(true);

  // Modal state for adding and editing dates
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const toast = useToast();

  // Responsive values
  const cardSpacing = useBreakpointValue({ base: 4, md: 6 });
  const modalSize = useBreakpointValue({ base: "sm", md: "md" });
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Handle add waived market date
  const handleAddMarketDate = (date: string, venue: string): void => {
    // Format the date for display
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Update state
    setMarketDate(formattedDate);
    setMarketVenue(venue);
    setHasMarketDate(true);

    // Show success toast
    toast({
      title: "Market date added",
      description: `New waived market date: ${formattedDate}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle update waived market date
  const handleUpdateMarketDate = (date: string, venue: string): void => {
    // Format the date for display
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Update state
    setMarketDate(formattedDate);
    setMarketVenue(venue);

    // Show success toast
    toast({
      title: "Market date updated",
      description: `Updated waived market date: ${formattedDate}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Fetch vendors data using useQuery
  const {
    data: vendorsData,
    isLoading: isVendorsLoading,
    isError: isVendorsError,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: () => waivedAdminApi.getVendorAndProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
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

  // Fetch urgent products data
  const { data: urgentProductsData } = useQuery({
    queryKey: ["urgentProducts"],
    queryFn: () => waivedAdminApi.getUrgentPurchaseWaivedProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Calculate vendor count and urgent purchases count
  const vendorCount = vendorsData?.data?.pageItems?.length || 0;
  const urgentPurchasesCount = urgentProductsData?.data?.length || 0;

  // Transform API data for the table
  const vendorRows: VendorRow[] =
    vendorsData?.data?.pageItems?.map((vendor: Vendor, index: number) => ({
      "S/N": index + 1,
      Vendor: vendor.name || vendor.vendorName || "N/A",
      LGA: vendor.lga || "N/A",
      "Phone Number": vendor.phoneNumber || "N/A",
      id: vendor.id || index,
    })) || [];

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
      flex: isMobile ? 0 : 1.2,
      minWidth: 120,
    },
    {
      field: "LGA",
      headerName: "LGA",
      width: 150,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 0.8,
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

  const handleRowClick = (params: any): void => {
    console.log(params);
  };

  return (
    <Box w="100%">
      {/* Info Cards Section */}
      <Box mt={{ base: "15px", md: "20px" }}>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={cardSpacing}
        >
          {/* Next Waived Market Card */}
          <GridItem colSpan={{ base: 1, sm: 2, md: 1 }}>
            <Card
              width="100%"
              borderRadius="8px"
              p={{ base: 3, md: 4 }}
              bg="white"
              boxShadow="sm"
              position="relative"
            >
              <CardBody
                overflow="hidden"
                display="flex"
                flexDirection="column"
                p={0}
                position="relative"
              >
                <HStack
                  alignItems="flex-start"
                  justifyContent="space-between"
                  mb={hasMarketDate ? 6 : 0}
                >
                  <Box>
                    <Text fontSize="sm" color="gray.700">
                      Waived Market
                    </Text>
                    {hasMarketDate ? (
                      <Heading
                        fontWeight="600"
                        fontSize={{ base: "20px", md: "24px" }}
                        mt={1}
                      >
                        {marketDate}
                      </Heading>
                    ) : (
                      <>
                        <Heading
                          fontWeight="600"
                          fontSize={{ base: "20px", md: "24px" }}
                          mt={1}
                          color="gray.700"
                        >
                          NA
                        </Heading>
                        <Button
                          leftIcon={<FiPlus size={16} />}
                          variant="unstyled"
                          size="sm"
                          height="auto"
                          mt={1}
                          fontSize="sm"
                          fontWeight="normal"
                          color={globalStyles.colors.green[500]}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onAddModalOpen();
                          }}
                          px={0}
                          _hover={{ textDecoration: "underline" }}
                        >
                          Add date
                        </Button>
                      </>
                    )}
                  </Box>
                  <Box
                    display="flex"
                    width={10}
                    height={10}
                    bg="blue.50"
                    borderRadius="md"
                    alignItems="center"
                    justifyContent="center"
                    color="blue.500"
                    cursor="pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAddModalOpen();
                    }}
                  >
                    <FaRegCalendarAlt size={20} />
                  </Box>
                </HStack>
                {hasMarketDate && (
                  <Flex
                    position="static"
                    mt={2}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <IconButton
                      icon={<FiEdit2 size={16} />}
                      aria-label="Edit date"
                      size="sm"
                      colorScheme="teal"
                      variant="outline"
                      borderColor={globalStyles.colors.green[500]}
                      color={globalStyles.colors.green[500]}
                      borderRadius="md"
                      _hover={{
                        bg: "green.50",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onEditModalOpen();
                      }}
                      mr={2}
                    />
                    <Text fontSize="sm" color="green.500">
                      Edit
                    </Text>
                  </Flex>
                )}
              </CardBody>
            </Card>
          </GridItem>

          {/* Number of Vendors Card */}
          <GridItem>
            <Card
              width="100%"
              borderRadius="8px"
              p={{ base: 3, md: 4 }}
              bg="white"
              boxShadow="sm"
            >
              <CardBody
                overflow="hidden"
                display="flex"
                flexDirection="column"
                p={0}
              >
                <HStack alignItems="flex-start" justifyContent="space-between">
                  <Box>
                    <Text fontSize="sm" color="gray.700">
                      Number of Vendors
                    </Text>
                    <Heading
                      fontWeight="600"
                      fontSize={{ base: "20px", md: "24px" }}
                      mt={1}
                    >
                      {vendorCount}
                    </Heading>
                  </Box>
                  <Box
                    display="flex"
                    width={10}
                    height={10}
                    bg="green.50"
                    borderRadius="md"
                    alignItems="center"
                    justifyContent="center"
                    color="green.500"
                  >
                    <FiUsers size={20} />
                  </Box>
                </HStack>
              </CardBody>
            </Card>
          </GridItem>

          {/* Number of Urgent Purchases Card */}
          <GridItem>
            <Card
              width="100%"
              borderRadius="8px"
              p={{ base: 3, md: 4 }}
              bg="white"
              boxShadow="sm"
            >
              <CardBody
                overflow="hidden"
                display="flex"
                flexDirection="column"
                p={0}
              >
                <HStack alignItems="flex-start" justifyContent="space-between">
                  <Box>
                    <Text fontSize="sm" color="gray.700">
                      No. of Urgent Purchases
                    </Text>
                    <Heading
                      fontWeight="600"
                      fontSize={{ base: "20px", md: "24px" }}
                      mt={1}
                    >
                      {urgentPurchasesCount}
                    </Heading>
                  </Box>
                  <Box
                    display="flex"
                    width={10}
                    height={10}
                    bg="orange.50"
                    borderRadius="md"
                    alignItems="center"
                    justifyContent="center"
                    color="orange.500"
                  >
                    <FiShoppingBag size={20} />
                  </Box>
                </HStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Box>

      {/* Vendors List Section */}
      <Flex
        mt={{ base: 6, md: 10 }}
        mb={{ base: 3, md: 5 }}
        justifyContent="space-between"
        alignItems={{ base: "flex-start", sm: "center" }}
        flexDirection={{ base: "column", sm: "row" }}
        gap={{ base: 2, sm: 0 }}
      >
        <Text fontWeight="bold" fontSize={["md", "lg"]} color="black">
          Vendors List
        </Text>
        <Link to="/vendors">
          <Text fontWeight="bold" color={globalStyles.colors.green[500]}>
            View All
          </Text>
        </Link>
      </Flex>

      {/* Search Section - Improved responsiveness */}
      <Flex
        mt={{ base: 3, md: 5 }}
        mb={{ base: 3, md: 5 }}
        flexDirection={{ base: "column", sm: "row" }}
        alignItems="center"
        gap={3}
        width="100%"
      >
        <Box flex="1" minW={0} maxW={{ base: "100%", sm: "320px" }}>
          <SearchInput
            placeHolder="Search for a vendor"
            showSelect={true}
            selectMenu={[{ name: "All LGAs", value: "all lgas" }]}
          />
        </Box>
      </Flex>

      {/* Table */}
      <Box mt={{ base: 3, md: 4 }} overflowX="auto">
        {isVendorsLoading ? (
          <Center py={10}>
            <Spinner size="xl" color="teal" />
          </Center>
        ) : isVendorsError ? (
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
        {!isVendorsLoading && !isVendorsError && vendorRows.length > 0 && (
          <Flex
            justify={{ base: "center", sm: "space-between" }}
            align="center"
            mt={4}
            p={2}
            flexDirection={{ base: "column", sm: "row" }}
            gap={{ base: 3, sm: 0 }}
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

      {/* Add Waived Market Date Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        isCentered
        size={modalSize}
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent borderRadius="12px" maxW={{ base: "90%", md: "450px" }}>
          <ModalBody p={0}>
            <WaivedMarketDate
              onClose={onAddModalClose}
              onSave={handleAddMarketDate}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Edit Waived Market Date Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        isCentered
        size={modalSize}
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent borderRadius="12px" maxW={{ base: "90%", md: "450px" }}>
          <ModalBody p={0}>
            <EditWaivedMarket
              onClose={onEditModalClose}
              onUpdate={handleUpdateMarketDate}
              currentDate={marketDate}
              currentVenue={marketVenue}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
