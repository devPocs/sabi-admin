import {
  Box,
  HStack,
  Text,
  Flex,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Center,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import { GridColDef } from "@mui/x-data-grid";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { useState, useRef, SetStateAction } from "react";
import AddTeamMate from "@pages/admin/addTeamMember";
import EditTeamMate from "@pages/admin/editTeamMember";
import { waivedAdminApi } from "@services/api";
import Spinner from "@components/spinner";

const TeamMembers = () => {
  interface Member {
    fullName: string;
    emailAddress: string;
    id: string;
    phoneNumber: string;
  }

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedTeamMate, setSelectedTeamMate] = useState(null);
  const [teamMateToDelete, setTeamMateToDelete] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const cancelRef = useRef();
  const toast = useToast();
  const queryClient = useQueryClient();

  // Fetch team members data using useQuery
  const {
    data: teamMembersData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: waivedAdminApi.getTeamMates,
  });

  interface Member {
    fullName: string;
    emailAddress: string;
    id: string;
    phoneNumber: string;
  }
  const teamMembersRows =
    teamMembersData?.data?.pageItems?.map((member: Member, index: number) => ({
      "S/N": index + 1,
      Name: member.fullName,
      Email: member.emailAddress,
      id: member.id || index,
      // Include these for editing
      fullName: member.fullName,
      emailAddress: member.emailAddress,
      phoneNumber: member.phoneNumber,
    })) || [];

  // Function to filter team members based on search query
  const getFilteredMembers = () => {
    if (!isSearchActive || !searchQuery.trim() || !teamMembersRows.length) {
      return teamMembersRows;
    }

    const lowercasedSearch = searchQuery.toLowerCase();
    return teamMembersRows.filter(
      (member: Member) =>
        member.fullName.toLowerCase().includes(lowercasedSearch) ||
        member.emailAddress.toLowerCase().includes(lowercasedSearch)
    );
  };

  // Delete team member mutation
  const deleteTeamMateMutation = useMutation({
    mutationFn: (id: string) => {
      return waivedAdminApi.deleteTeamMate(id);
    },
    onSuccess: () => {
      toast({
        title: "Team member deleted",
        description: "Team member has been deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Refresh the team members data
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete team member",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    onSettled: () => {
      setIsDeleteAlertOpen(false);
      setTeamMateToDelete(null);
    },
  });

  // Function to handle successful team member addition
  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    // Refresh the team members data
    queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
  };

  // Function to handle successful team member edit
  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    // Refresh the team members data
    queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
  };

  // Function to handle edit button click
  const handleEditClick = (teamMate: SetStateAction<null>) => {
    setSelectedTeamMate(teamMate);
    setIsEditModalOpen(true);
  };

  // Function to handle delete button click
  const handleDeleteClick = (teamMate: SetStateAction<null>) => {
    setTeamMateToDelete(teamMate);
    setIsDeleteAlertOpen(true);
  };

  // Function to confirm deletion
  const confirmDelete = () => {
    if (teamMateToDelete && teamMateToDelete.id) {
      deleteTeamMateMutation.mutate(teamMateToDelete.id);
    }
  };

  // Handle search
  const handleSearch = (value: SetStateAction<string>) => {
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
      flex: 0.5,
    },
    {
      field: "Name",
      headerName: "Name",
      width: 200,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 250,
      disableColumnMenu: true,
      flex: 1.5,
    },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      disableColumnMenu: true,
      align: "center",
      renderCell: (params) => (
        <HStack
          spacing={3}
          justifyContent="space-around"
          display="flex"
          height="100%"
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
      {/* Team Members Header */}
      <Box display={"flex"} justifyContent="space-between">
        <Text fontWeight={"bold"} pe="2" color={"black"}>
          Team Members
        </Text>
        <Button
          leftIcon={<FiPlus />}
          borderRadius="5"
          colorScheme="teal"
          onClick={() => {
            setIsAddModalOpen(true);
          }}
        >
          Add New
        </Button>
      </Box>

      {/* Search Section */}
      <Flex mt="6" mb="6">
        <Box w="100%" h="40px" maxW="320px">
          <SearchInput
            placeHolder="Search for a member"
            showSelect={false}
            onSearch={handleSearch}
          />
        </Box>
      </Flex>

      {/* Table */}
      <Box mt={["10px", "24px"]}>
        {isPending ? (
          <Center py={10}>
            <Spinner />
          </Center>
        ) : isError ? (
          <Center py={10}>
            <Text color="red.500">
              Error loading team members. Please try again.
            </Text>
          </Center>
        ) : getFilteredMembers().length === 0 ? (
          <Center py={10}>
            <Text>
              {isSearchActive && searchQuery.trim() !== ""
                ? "No team members match your search criteria."
                : "No team members found. Add new team members using the button above."}
            </Text>
          </Center>
        ) : (
          <Tables columns={columns} rows={getFilteredMembers()} />
        )}

        {/* Pagination */}
        {!isPending && !isError && getFilteredMembers().length > 0 && (
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

      {/* Modal for AddTeamMate */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalOverlay />
        <ModalContent maxW="400px">
          <ModalCloseButton />
          <ModalBody padding="32px">
            <AddTeamMate onSuccess={handleAddSuccess} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal for EditTeamMate */}
      {selectedTeamMate && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent maxW="400px">
            <ModalCloseButton />
            <ModalBody padding="32px">
              <EditTeamMate
                onSuccess={handleEditSuccess}
                teamMateData={selectedTeamMate}
                onClose={() => setIsEditModalOpen(false)}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
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
              Delete Team Member
            </AlertDialogHeader>

            <AlertDialogBody fontSize="sm">
              Are you sure you want to delete this team member? This action
              cannot be undone.
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
                isLoading={deleteTeamMateMutation.isPending}
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

export default TeamMembers;
