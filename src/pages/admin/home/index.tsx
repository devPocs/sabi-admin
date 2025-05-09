import { useState, useEffect, useMemo } from "react";
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
import { FiUsers, FiShoppingBag, FiEdit2 } from "react-icons/fi";
import { globalStyles } from "../../../theme/styles";
import { useQuery } from "@tanstack/react-query";
import { waivedAdminApi } from "@services/api";
import WaivedMarketDate from "../addWaivedMarketDate";
import EditWaivedMarket from "../editWaivedMarket";
import Spinner from "@components/spinner";
import { useLGAs } from "@hooks/useFetchLGAs";
import { LGA } from "@interface/ILGA";

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
  const [marketDate, setMarketDate] = useState<string>("");
  const [marketVenue, setMarketVenue] = useState<string>("");

  // Use the same search state pattern as TeamMembers component
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [selectedLGA, setSelectedLGA] = useState<string>("all lgas");

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

  const cardSpacing = useBreakpointValue({ base: 4, md: 6 });
  const modalSize = useBreakpointValue({ base: "sm", md: "md" });
  const isMobile = useBreakpointValue({ base: true, md: false });
  const searchBoxWidth = useBreakpointValue({
    base: "100%",
    sm: "100%",
    md: "320px",
  });

  // Get LGAs using the hook
  const { data: lgasData = [], isLoading: isLGAsLoading } = useLGAs();

  // Format LGAs for dropdown
  const lgaOptions = useMemo(() => {
    if (!lgasData || lgasData.length === 0) {
      return [{ name: "All LGAs", value: "all lgas" }];
    }

    try {
      const options = lgasData.map((lga: LGA) => ({
        name: lga.name,
        value: lga.name.toLowerCase(), // Use lowercase for comparison
      }));

      return [{ name: "All LGAs", value: "all lgas" }, ...options];
    } catch (error) {
      console.error("Error processing LGAs:", error);
      return [{ name: "All LGAs", value: "all lgas" }];
    }
  }, [lgasData]);

  const vendorsQuery = useQuery({
    queryKey: ["vendors"],
    queryFn: () => waivedAdminApi.getVendorAndProducts(),
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: vendorsData,
    isLoading: isVendorsLoading,
    isError: isVendorsError,
  } = vendorsQuery;

  const urgentProductsQuery = useQuery({
    queryKey: ["urgentProducts"],
    queryFn: () => waivedAdminApi.getUrgentPurchaseWaivedProducts(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: urgentProductsData } = urgentProductsQuery;

  const nextWaivedMarketQuery = useQuery({
    queryKey: ["nextWaiveMarketDate"],
    queryFn: () => waivedAdminApi.getNextWaivedMarketDate(),
  });

  const { data: nextWaiveMarketDate, isSuccess: isNextWaivedMarketSuccess } =
    nextWaivedMarketQuery;

  const vendorCount = vendorsData?.data?.pageItems?.length || 0;
  const urgentPurchasesCount = urgentProductsData?.data?.length || 0;

  const vendorRows: VendorRow[] =
    vendorsData?.data?.pageItems?.map((vendor: Vendor, index: number) => ({
      "S/N": index + 1,
      Vendor: vendor.name || vendor.vendorName || "N/A",
      LGA: vendor.lga || "N/A",
      "Phone Number": vendor.phoneNumber || "N/A",
      id: vendor.id || index,
    })) || [];

  // Use the same search handler pattern as TeamMembers component
  const handleSearch = (value: string): void => {
    console.log("Search handler called with:", value);
    setSearchQuery(value);
    setIsSearchActive(true);
  };

  // Handle LGA selection
  const handleLGASelect = (value: string): void => {
    console.log("LGA selection changed to:", value);
    setSelectedLGA(value);
  };

  // Get filtered vendors - use the same pattern as getFilteredMembers in TeamMembers
  const getFilteredVendors = (): VendorRow[] => {
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

  useEffect(() => {
    if (isNextWaivedMarketSuccess && nextWaiveMarketDate?.data) {
      const rawDate = nextWaiveMarketDate.data;
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(rawDate));

      setMarketDate(formattedDate);
    } else {
      setMarketDate("NA");
    }
  }, [isNextWaivedMarketSuccess, nextWaiveMarketDate]);

  const handleAddMarketDate = (date: string, venue: string): void => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    setMarketDate(formattedDate);
    setMarketVenue(venue);
  };

  const handleUpdateMarketDate = (date: string, venue: string): void => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    setMarketDate(formattedDate);
    setMarketVenue(venue);
  };

  const handleRowClick = (params): void => {
    console.log(params);
  };

  return (
    <Box w="100%">
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
          <GridItem>
            <Card
              width="100%"
              borderRadius="8px"
              p={{ base: 3, md: 4 }}
              bg="white"
              boxShadow="sm"
              position="relative"
              border="1px solid"
              borderColor="gray.100"
              height="100%"
            >
              <CardBody
                overflow="hidden"
                display="flex"
                flexDirection="column"
                p={0}
                position="relative"
              >
                <HStack alignItems="flex-start" justifyContent="space-between">
                  <Box>
                    <Text fontSize="sm" color="gray.700">
                      Next Waived Market
                    </Text>
                    <Heading
                      fontWeight="600"
                      fontSize={{ base: "xl", md: "2xl" }}
                      mt={1}
                    >
                      {marketDate}
                    </Heading>
                  </Box>
                  <Flex></Flex>
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
                  <Flex mt={2} alignItems="center" height="26px">
                    <IconButton
                      icon={<FiEdit2 size={14} />}
                      aria-label="Edit date"
                      size="xs"
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
                      mr={1}
                    />
                    <Text fontSize="sm" color="green.500">
                      Edit
                    </Text>
                  </Flex>
                </HStack>
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
              border="1px solid"
              borderColor="gray.100"
              height="100%"
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
                      fontSize={{ base: "xl", md: "2xl" }}
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

          {/* Urgent Purchases Card */}
          <GridItem>
            <Card
              width="100%"
              borderRadius="8px"
              p={{ base: 3, md: 4 }}
              bg="white"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
              height="100%"
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
                      fontSize={{ base: "xl", md: "2xl" }}
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

      {/* Search Section - Match the pattern from TeamMembers */}
      <Flex mt={[4, 5, 6]} mb={[4, 5, 6]}>
        <Box w="100%" h="40px" maxW={searchBoxWidth}>
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

      <Box mt={{ base: 3, md: 4 }} overflowX="auto">
        {isVendorsLoading ? (
          <Center py={10}>
            <Spinner />
          </Center>
        ) : isVendorsError ? (
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

        {!isVendorsLoading &&
          !isVendorsError &&
          getFilteredVendors().length > 0 && (
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
