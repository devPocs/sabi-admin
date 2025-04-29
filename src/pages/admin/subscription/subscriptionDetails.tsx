import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Grid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  useToast,
  Center,
  useBreakpointValue,
  VStack,
  TableContainer,
} from "@chakra-ui/react";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { pageLinks } from "@services/pageLinks";
import { waivedAdminApi } from "@services/api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@components/spinner";

interface Subscriber {
  id: string;
  name: string;
  dateTime: string;
  amount: string;
}

const SubscriptionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  // Responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });
  const gridColumns = useBreakpointValue({
    base: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
  });
  const tabFontSize = useBreakpointValue({ base: "xs", md: "sm" });
  const headerFontSize = useBreakpointValue({ base: "sm", md: "md" });

  // State for active tab
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [currentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch subscription data using React Query
  const {
    data: subscriptionData,
    isLoading: isLoadingSubscription,
    isError: isErrorSubscription,
  } = useQuery({
    queryKey: ["subscription", id],
    queryFn: () => waivedAdminApi.getSubscriptionPlanById(id),
    onError: (err: any) => {
      toast({
        title: "Error",
        description:
          err?.data?.message || "Failed to fetch subscription details",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    enabled: !!id,
  });

  // Format subscription data
  const subscription = {
    id: id,
    amount: subscriptionData?.data?.amount?.toLocaleString() || "0",
    frequency: subscriptionData?.data?.frequency || "N/A",
    subscribers: subscriptionData?.data?.subscribersCount || 0,
  };

  // Mock subscriber data for now - replace with API call later
  const subscribers: Subscriber[] = [
    {
      id: "VEND123",
      name: "John Doe",
      dateTime: "4/01/2025 ; 8:00 PM",
      amount: "5,000",
    },
    {
      id: "CUST123",
      name: "Jane Smith",
      dateTime: "4/01/2025 ; 8:00 PM",
      amount: "5,000",
    },
    {
      id: "VEND123",
      name: "Robert Johnson",
      dateTime: "4/01/2025 ; 8:00 PM",
      amount: "5,000",
    },
  ];

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Navigate back to subscription plans
  const goBackToPlans = () => {
    navigate(pageLinks.subscription);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle confirm payment
  const handleConfirmPayment = (subscriberId: string) => {
    // This would be replaced with your actual API call
    toast({
      title: "Payment Confirmed",
      description: `Payment for ${subscriberId} has been confirmed`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle view receipt
  const handleViewReceipt = (subscriberId: string) => {
    // This would be replaced with your actual receipt view logic
    toast({
      title: "Receipt Opened",
      description: `Receipt for ${subscriberId} is being viewed`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // If loading
  if (isLoadingSubscription) {
    return (
      <Center minH="200px">
        <Spinner />
      </Center>
    );
  }

  // If error
  if (isErrorSubscription) {
    return (
      <Box w="100%">
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          mb={6}
          flexWrap="wrap"
          gap={2}
        >
          <Button
            leftIcon={<FiArrowLeft />}
            variant="ghost"
            onClick={goBackToPlans}
            color="black"
            size={isMobile ? "sm" : "md"}
          ></Button>
          <Text fontWeight="bold" fontSize={headerFontSize} color="black">
            Back to Subscription Plans
          </Text>
        </Flex>
        <Center minH="200px" flexDirection="column">
          <Text color="red.500" mb={4}>
            Error loading subscription details
          </Text>
          <Button colorScheme="teal" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Center>
      </Box>
    );
  }

  return (
    <Box w="100%">
      {/* Header with back button */}
      <Flex
        justifyContent="flex-start"
        alignItems="center"
        mb={[4, 5, 6]}
        flexWrap="wrap"
        gap={2}
      >
        <Button
          leftIcon={<FiArrowLeft />}
          variant="ghost"
          onClick={goBackToPlans}
          color="black"
          size={isMobile ? "sm" : "md"}
        ></Button>
        <Text fontWeight="bold" fontSize={headerFontSize} color="black">
          Subscription Plan / Subscribers
        </Text>
      </Flex>

      {/* Subscription summary card */}
      <Grid
        templateColumns={gridColumns}
        gap={[3, 4]}
        bg="white"
        p={[4, 5, 6]}
        borderRadius="md"
        mb={[4, 5, 6]}
        boxShadow="sm"
      >
        <GridItem>
          <Text fontSize="sm" color="gray.700" mb={1}>
            Amount
          </Text>
          <Text fontSize={["sm", "md"]} fontWeight="medium">
            ₦{subscription.amount}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" color="gray.700" mb={1}>
            Frequency
          </Text>
          <Text fontSize={["sm", "md"]} fontWeight="medium">
            {subscription.frequency}
          </Text>
        </GridItem>
        <GridItem
          colSpan={{ base: isMobile ? 2 : 1, sm: isMobile ? 2 : 1, md: 1 }}
        >
          <Text fontSize="sm" color="gray.700" mb={1}>
            No of Subscribers
          </Text>
          <Text fontSize={["sm", "md"]} fontWeight="medium">
            {subscription.subscribers}
          </Text>
        </GridItem>
      </Grid>

      {/* Tab section and search - Improved responsiveness */}
      <Flex
        mb={[4, 5, 6]}
        justifyContent={["flex-start", "space-between"]}
        alignItems={["flex-start", "center"]}
        flexDirection={["column", "row"]}
        gap={[3, 0]}
        width="100%"
      >
        <HStack spacing={0} mb={[3, 0]}>
          <Box
            as="button"
            fontSize={tabFontSize}
            py={2}
            px={3}
            bg={activeTab === "pending" ? "teal.200" : "white"}
            color={activeTab === "pending" ? "teal.700" : "gray.700"}
            borderRadius="md 0 0 md"
            onClick={() => handleTabChange("pending")}
          >
            Pending (250)
          </Box>
          <Box
            as="button"
            fontSize={tabFontSize}
            py={2}
            px={3}
            bg={activeTab === "confirmed" ? "teal.200" : "white"}
            color={activeTab === "confirmed" ? "teal.700" : "gray.700"}
            borderRadius="0 md md 0"
            onClick={() => handleTabChange("confirmed")}
          >
            Confirmed (250)
          </Box>
        </HStack>

        {/* Search input */}
        <InputGroup maxW={["100%", "100%", "320px"]} width="100%">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.400" />
          </InputLeftElement>
          <Input
            color="gray.700"
            placeholder="Search for a subscriber by name or ID"
            bg="white"
            borderRadius="md"
            size={isMobile ? "sm" : "md"}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Flex>

      {/* Subscribers table - with horizontal scroll on mobile */}
      <Box bg="white" borderRadius="md" boxShadow="sm" overflow="hidden" mb={4}>
        <TableContainer overflowX="auto">
          <Table variant="simple" size={isMobile ? "sm" : "md"}>
            <Thead bg="gray.50">
              <Tr>
                <Th color="gray.700" fontSize={["xs", "sm"]}>
                  S/N
                </Th>
                <Th color="gray.700" fontSize={["xs", "sm"]}>
                  Date & Time
                </Th>
                <Th color="gray.700" fontSize={["xs", "sm"]}>
                  Name
                </Th>
                <Th color="gray.700" fontSize={["xs", "sm"]}>
                  ID
                </Th>
                <Th color="gray.700" fontSize={["xs", "sm"]}>
                  Amount (₦)
                </Th>
                <Th color="gray.700" fontSize={["xs", "sm"]}>
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody fontSize={["xs", "sm"]}>
              {subscribers.length > 0 ? (
                subscribers.map((subscriber, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{subscriber.dateTime}</Td>
                    <Td>{subscriber.name}</Td>
                    <Td>{subscriber.id}</Td>
                    <Td>{subscriber.amount}</Td>
                    <Td>
                      {isMobile ? (
                        <VStack align="flex-start" spacing={1}>
                          <Link
                            color="yellow.500"
                            fontSize="xs"
                            onClick={() => handleViewReceipt(subscriber.id)}
                            cursor="pointer"
                          >
                            View Receipt
                          </Link>
                          <Link
                            color="teal.500"
                            fontSize="xs"
                            onClick={() => handleConfirmPayment(subscriber.id)}
                            cursor="pointer"
                          >
                            Confirm Payment
                          </Link>
                        </VStack>
                      ) : (
                        <HStack spacing={4}>
                          <Link
                            color="yellow.500"
                            fontSize="sm"
                            onClick={() => handleViewReceipt(subscriber.id)}
                            cursor="pointer"
                          >
                            View Receipt
                          </Link>
                          <Link
                            color="teal.500"
                            fontSize="sm"
                            onClick={() => handleConfirmPayment(subscriber.id)}
                            cursor="pointer"
                          >
                            Confirm Payment
                          </Link>
                        </HStack>
                      )}
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={6} textAlign="center" py={4}>
                    No subscribers found
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      {/* Pagination */}
      {subscribers.length > 0 && (
        <Flex
          justify={{ base: "center", sm: "space-between" }}
          align="center"
          mt={4}
          p={2}
          flexDirection={{ base: "column", sm: "row" }}
          gap={{ base: 3, sm: 0 }}
        >
          <Flex align="center">
            <Text fontSize="sm" color="gray.700" mr={2}>
              Rows per page: 10
            </Text>
          </Flex>

          <HStack spacing={1}>
            <Button variant="ghost" size="sm" isDisabled={currentPage === 1}>
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
  );
};

export default SubscriptionDetails;
