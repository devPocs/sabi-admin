import { useState, useRef } from "react";
import {
  Box,
  Text,
  Flex,
  HStack,
  Button,
  useDisclosure,
  useToast,
  IconButton,
  Center,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import AddSubscriptionPlan from "./AddSubscriptionPlan";
import EditSubscriptionPlan from "./EditSubscriptionPlan";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { waivedAdminApi } from "@services/api";
import Spinner from "@components/spinner";

const Subscription = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const cancelRef = useRef();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Delete dialog state
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  // Modal states
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

  // Selected plan for editing
  const [selectedPlan, setSelectedPlan] = useState(null);

  const {
    data: subscriptionData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: waivedAdminApi.getAllSubscriptionPlans,
    onError: (err) => {
      toast({
        title: "Error",
        description: err?.data?.message || "Failed to fetch subscription plans",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Delete subscription plan mutation
  const deleteSubscriptionMutation = useMutation({
    mutationFn: (id) => {
      return waivedAdminApi.deleteSubscriptionPlan(id);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Subscription plan deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Refresh the subscription plans data
      queryClient.invalidateQueries(["subscriptions"]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error?.data?.message || "Failed to delete subscription plan",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    onSettled: () => {
      setIsDeleteAlertOpen(false);
      setPlanToDelete(null);
    },
  });

  // Transform API data for the table
  const subscriptionRows =
    subscriptionData?.data?.pageItems?.map((item, index) => ({
      "S/N": index + 1,
      Amount:
        typeof item.amount === "number"
          ? item.amount.toLocaleString()
          : item.amount,
      Frequency: item.frequency || "N/A",
      id: item.id || index,
      // Preserve original item for editing
      originalData: item,
    })) || [];

  // Function to filter subscription plans based on search query
  const getFilteredPlans = () => {
    if (!isSearchActive || !searchQuery.trim() || !subscriptionRows.length) {
      return subscriptionRows;
    }

    const lowercasedSearch = searchQuery.toLowerCase();
    return subscriptionRows.filter(
      (plan) =>
        (plan.Amount &&
          plan.Amount.toString().toLowerCase().includes(lowercasedSearch)) ||
        (plan.Frequency &&
          plan.Frequency.toLowerCase().includes(lowercasedSearch))
    );
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchQuery(value);
    setIsSearchActive(true);
  };

  // Handle success after add/edit
  const handleSuccess = () => {
    refetch();
    toast({
      title: "Success",
      description: "Subscription plan updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle edit button click
  const handleEditClick = (row) => {
    setSelectedPlan(row.originalData || row);
    onEditModalOpen();
  };

  // Handle delete confirmation
  const handleDeleteClick = (row) => {
    setPlanToDelete(row);
    setIsDeleteAlertOpen(true);
  };

  // Function to confirm deletion
  const confirmDelete = () => {
    if (planToDelete && planToDelete.id) {
      deleteSubscriptionMutation.mutate(planToDelete.id);
    }
  };

  // Handle row click to view details
  const handleRowClick = (row) => {
    const subscriptionId = row.row.id;
    // Prefetch the subscription details to improve user experience
    waivedAdminApi
      .getSubscriptionPlanById(subscriptionId)
      .then(() => {
        // Navigate to subscription details page
        navigate(`/subscription/${subscriptionId}`);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description:
            err?.data?.message || "Failed to fetch subscription details",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  // Table columns
  const columns = [
    {
      field: "S/N",
      headerName: "S/N",
      width: 70,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "Amount",
      headerName: "Amount",
      width: 200,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "Frequency",
      headerName: "Frequency",
      width: 200,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      disableColumnMenu: true,
      flex: 0.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <HStack
          spacing={3}
          display="flex"
          height="100%"
          justifyContent="space-around"
        >
          <IconButton
            icon={<FaRegEdit />}
            color="green.500"
            variant="ghost"
            size="sm"
            aria-label="Edit"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(params.row);
            }}
          />
          <IconButton
            icon={<FiTrash2 />}
            color="red.500"
            variant="ghost"
            size="sm"
            aria-label="Delete"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(params.row);
            }}
          />
        </HStack>
      ),
    },
  ];

  return (
    <Box w={["100%", "100%"]}>
      {/* Subscription Plan Header */}
      <Box display={"flex"} mt={5} mb={6} justifyContent="space-between">
        <Text fontWeight={"bold"} fontSize="lg" color={"black"}>
          Subscription Plans
        </Text>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="teal"
          onClick={onAddModalOpen}
        >
          Add New
        </Button>
      </Box>

      {/* Search Section */}
      <Flex mt="6" mb="6">
        <Box w="100%" h="40px" maxW="320px">
          <SearchInput
            placeHolder="Search for a plan"
            showSelect={false}
            onSearch={handleSearch}
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
              Error loading subscription plans. Please try again.
            </Text>
          </Center>
        ) : getFilteredPlans().length === 0 ? (
          <Center py={10}>
            <Text>
              {isSearchActive && searchQuery.trim() !== ""
                ? "No subscription plans match your search criteria."
                : "No subscription plans found."}
            </Text>
          </Center>
        ) : (
          <Tables
            onRowClick={handleRowClick}
            columns={columns}
            rows={getFilteredPlans()}
          />
        )}

        {/* Pagination */}
        {!isLoading && !isError && getFilteredPlans().length > 0 && (
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

      {/* Add Subscription Plan Modal */}
      <AddSubscriptionPlan
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        onSuccess={handleSuccess}
      />

      {/* Edit Subscription Plan Modal */}
      {selectedPlan && (
        <EditSubscriptionPlan
          isOpen={isEditModalOpen}
          onClose={onEditModalClose}
          onSuccess={handleSuccess}
          planData={selectedPlan}
        />
      )}

      {/* Alert Dialog for Delete Confirmation */}
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteAlertOpen(false)}
        isCentered
      >
        <AlertDialogOverlay bg="blackAlpha.300" backdropFilter="blur(5px)">
          <AlertDialogContent borderRadius="md" boxShadow="xl" mx={4}>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              color="red.500"
              borderBottom="1px solid"
              borderColor="gray.100"
              pb={3}
            >
              Delete Subscription Plan
            </AlertDialogHeader>

            <AlertDialogBody fontSize="sm" py={6}>
              Are you sure you want to delete this subscription plan? This
              action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter
              borderTop="1px solid"
              borderColor="gray.100"
              pt={3}
            >
              <Button
                ref={cancelRef}
                borderRadius="md"
                _hover={{ color: "white", bg: "gray.700" }}
                fontSize="sm"
                variant="outline"
                onClick={() => setIsDeleteAlertOpen(false)}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={confirmDelete}
                ml={3}
                fontSize="sm"
                isLoading={deleteSubscriptionMutation.isPending}
                borderRadius="md"
                loadingText="Deleting..."
                _hover={{ bg: "red.600" }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Subscription;
