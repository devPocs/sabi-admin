import React, { useState, useEffect } from "react";
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
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { pageLinks } from "@services/pageLinks";
import { waivedAdminApi } from "@services/api";
import { useQuery } from "@tanstack/react-query";

const SubscriptionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  // State for active tab
  const [activeTab, setActiveTab] = useState("pending");


  const [currentPage, setCurrentPage] = useState(1);
  
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch subscription data using React Query
  const {
    data: subscriptionData,
    isLoading: isLoadingSubscription,
    isError: isErrorSubscription,
    error: subscriptionError,
  } = useQuery({
    queryKey: ["subscription", id],
    queryFn: () => waivedAdminApi.getSubscriptionPlanById(id),
    onError: (err) => {
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
  console.log("Sub data", subscriptionData);
  // Format subscription data
  const subscription = {
    id: id,
    amount: subscriptionData?.data?.amount?.toLocaleString() || "0",
    frequency: subscriptionData?.data?.frequency || "N/A",
    subscribers: subscriptionData?.data?.subscribersCount || 0,
  };

  // Mock subscriber data for now - replace with API call later
  const subscribers = [
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
  const handleTabChange = (tab:any) => {
    setActiveTab(tab);
  };

  // Navigate back to subscription plans
  const goBackToPlans = () => {
    navigate(pageLinks.subscription);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handle confirm payment
  const handleConfirmPayment = (subscriberId) => {
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
  const handleViewReceipt = (subscriberId) => {
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
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  // If error
  if (isErrorSubscription) {
    return (
      <Box w="100%">
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Box display="flex" alignItems="center">
            <Button
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              onClick={goBackToPlans}
              color="black"
              size="md"
            ></Button>
            <Text fontWeight="bold" fontSize="md" color="black">
              Back to Subscription Plans
            </Text>
          </Box>
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
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box display="flex" alignItems="center">
          <Button
            leftIcon={<FiArrowLeft />}
            variant="ghost"
            onClick={goBackToPlans}
            color="black"
            size="md"
          ></Button>
          <Text fontWeight="bold" fontSize="md" color="black">
            Subscription Plan / Subscribers
          </Text>
        </Box>
        <Box width="100px"></Box> {/* Empty box for even spacing */}
      </Flex>

      {/* Subscription summary card */}
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={4}
        bg="white"
        p={6}
        borderRadius="md"
        mb={6}
        boxShadow="sm"
      >
        <GridItem>
          <Text fontSize="sm" color="gray.700" mb={1}>
            Amount
          </Text>
          <Text fontSize="md" fontWeight="medium">
            ₦{subscription.amount}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" color="gray.700" mb={1}>
            Frequency
          </Text>
          <Text fontSize="md" fontWeight="medium">
            {subscription.frequency}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" color="gray.700" mb={1}>
            No of Subscribers
          </Text>
          <Text fontSize="md" fontWeight="medium">
            {subscription.subscribers}
          </Text>
        </GridItem>
      </Grid>

      {/* Tab section */}
      <Flex mb={6} justifyContent="space-between" alignItems="center">
        <HStack spacing={0}>
          <Box
            as="button"
            fontSize="sm"
            py={2}
            px={4}
            bg={activeTab === "pending" ? "teal.200" : "white"}
            color={activeTab === "pending" ? "teal.700" : "gray.700"}
            borderRadius="md 0 0 md"
            onClick={() => handleTabChange("pending")}
          >
            Pending (250)
          </Box>
          <Box
            as="button"
            fontSize="sm"
            py={2}
            px={4}
            bg={activeTab === "confirmed" ? "teal.200" : "white"}
            color={activeTab === "confirmed" ? "teal.700" : "gray.700"}
            borderRadius="0 md md 0"
            onClick={() => handleTabChange("confirmed")}
          >
            Confirmed (250)
          </Box>
        </HStack>

        {/* Search input */}
        <InputGroup maxW="320px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.400" />
          </InputLeftElement>
          <Input
            color="gray.700"
            placeholder="Search for a subscriber by name or ID"
            bg="white"
            borderRadius="md"
            size="md"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Flex>

      {/* Subscribers table */}
      <Box bg="white" borderRadius="md" boxShadow="sm" overflow="hidden" mb={4}>
        <Table variant="simple" size="md">
          <Thead bg="gray.50">
            <Tr>
              <Th color="gray.700">S/N</Th>
              <Th color="gray.700">Date & Time</Th>
              <Th color="gray.700">Name</Th>
              <Th color="gray.700">ID</Th>
              <Th color="gray.700">Amount (₦)</Th>
              <Th color="gray.700">Actions</Th>
            </Tr>
          </Thead>
          <Tbody fontSize="sm">
            {subscribers.length > 0 ? (
              subscribers.map((subscriber, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{subscriber.dateTime}</Td>
                  <Td>{subscriber.name}</Td>
                  <Td>{subscriber.id}</Td>
                  <Td>{subscriber.amount}</Td>
                  <Td>
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
      </Box>

      {/* Pagination */}
      {subscribers.length > 0 && (
        <Flex justify="space-between" align="center" mt={4} p={2}>
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
