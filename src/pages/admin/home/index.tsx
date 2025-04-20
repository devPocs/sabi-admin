import React, { useState } from "react";
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

const Home = () => {
  // State for waived market date
  const [marketDate, setMarketDate] = useState("Nov 12, 2024");
  const [marketVenue, setMarketVenue] = useState("");
  const [hasMarketDate, setHasMarketDate] = useState(true);

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

  // Sample data for stats cards

  const urgentPurchasesCount = 200;

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useToast();

  // Handle add waived market date
  const handleAddMarketDate = (date: string, venue: string) => {
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
  const handleUpdateMarketDate = (date: string, venue: string) => {
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
  const { data: urgentProductsData } = useQuery({
    queryKey: ["urgent products"],
    queryFn: waivedAdminApi.getUrgentPurchaseWaivedProducts,
    Success: () => {
      console.log(urgentProductsData);
    },
  });

  const vendorCount = vendorsData?.data?.pageItems?.length;
  // Transform API data for the table
  const vendorRows =
    vendorsData?.data?.pageItems?.map((vendor, index) => ({
      "S/N": index + 1,
      Vendor: vendor.name || vendor.vendorName || "N/A",
      LGA: vendor.lga || "N/A",
      "Phone Number": vendor.phoneNumber || "N/A",
      id: vendor.id || index,
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
  };

  return (
    <Box w={["100%", "100%"]}>
      {/* Info Cards Section */}
      <Box mt={["25px", "20px"]}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {/* Next Waived Market Card */}
          <GridItem>
            <Card
              width="100%"
              borderRadius="8px"
              p={4}
              bg="white"
              boxShadow="sm"
              position="relative"
            >
              <CardBody
                overflow={"hidden"}
                display={"flex"}
                flexDirection={"column"}
                p={0}
              >
                <HStack
                  alignItems={"flex-start"}
                  justifyContent={"space-between"}
                >
                  <Box>
                    <Text fontSize="sm" color="gray.700">
                      Waived Market
                    </Text>
                    {hasMarketDate ? (
                      <Heading fontWeight="600" fontSize="24px" mt={1}>
                        {marketDate}
                      </Heading>
                    ) : (
                      <>
                        <Heading
                          fontWeight="600"
                          fontSize="24px"
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
                          onClick={onAddModalOpen}
                          px={0}
                          _hover={{ textDecoration: "underline" }}
                        >
                          Add date
                        </Button>
                      </>
                    )}
                  </Box>
                  <Box
                    display={"flex"}
                    width={10}
                    height={10}
                    bg="blue.50"
                    borderRadius="md"
                    alignItems={"center"}
                    justifyContent={"center"}
                    color="blue.500"
                    cursor="pointer"
                    onClick={onAddModalOpen}
                  >
                    <FaRegCalendarAlt size={20} />
                  </Box>
                </HStack>
                {hasMarketDate && (
                  <Box position="absolute" bottom={3} right={20}>
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
                      onClick={onEditModalOpen}
                    />
                    <Text fontSize="sm" color="green.500">
                      Edit
                    </Text>
                  </Box>
                )}
              </CardBody>
            </Card>
          </GridItem>

          {/* Number of Vendors Card */}
          <GridItem>
            <Card
              width="100%"
              borderRadius="8px"
              p={4}
              bg="white"
              boxShadow="sm"
            >
              <CardBody
                overflow={"hidden"}
                display={"flex"}
                flexDirection={"column"}
                p={0}
              >
                <HStack
                  alignItems={"flex-start"}
                  justifyContent={"space-between"}
                >
                  <Box>
                    <Text fontSize="sm" color="gray.700">
                      Number of Vendors
                    </Text>
                    <Heading fontWeight="600" fontSize="24px" mt={1}>
                      {vendorCount}
                    </Heading>
                  </Box>
                  <Box
                    display={"flex"}
                    width={10}
                    height={10}
                    bg="green.50"
                    borderRadius="md"
                    alignItems={"center"}
                    justifyContent={"center"}
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
              p={4}
              bg="white"
              boxShadow="sm"
            >
              <CardBody
                overflow={"hidden"}
                display={"flex"}
                flexDirection={"column"}
                p={0}
              >
                <HStack
                  alignItems={"flex-start"}
                  justifyContent={"space-between"}
                >
                  <Box>
                    <Text fontSize="sm" color="gray.700">
                      No. of Urgent Purchases
                    </Text>
                    <Heading fontWeight="600" fontSize="24px" mt={1}>
                      {urgentPurchasesCount}
                    </Heading>
                  </Box>
                  <Box
                    display={"flex"}
                    width={10}
                    height={10}
                    bg="orange.50"
                    borderRadius="md"
                    alignItems={"center"}
                    justifyContent={"center"}
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
      <Box display={"flex"} mt="10" justifyContent="space-between">
        <Text fontWeight={"bold"} pe="2" color={"black"}>
          Vendors List
        </Text>
        <Link to="/vendors">
          <Text
            fontWeight={"bold"}
            pe="2"
            color={globalStyles.colors.green[500]}
          >
            View All
          </Text>
        </Link>
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
            <Spinner size="xl" color="teal" />
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

      {/* Add Waived Market Date Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        isCentered
        size="md"
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent borderRadius="12px" maxW="450px">
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
        size="md"
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent borderRadius="12px" maxW="450px">
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
