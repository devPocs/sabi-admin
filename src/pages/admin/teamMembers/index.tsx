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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import { GridColDef } from "@mui/x-data-grid";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { useState, useRef } from "react";
import AddTeamMate from "@pages/admin/addTeamMember";
import EditTeamMate from "@pages/admin/editTeamMember";
import { waivedAdminApi } from "@services/api";
import Spinner from "@components/spinner";
import { toast } from "react-toastify";

// Define types upfront
interface Member {
  fullName: string;
  emailAddress: string;
  id: string;
  phoneNumber: string;
}

interface TeamMemberRow {
  "S/N": number;
  Name: string;
  Email: string;
  id: string | number;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
}

const TeamMembers = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);
  const [selectedTeamMate, setSelectedTeamMate] =
    useState<TeamMemberRow | null>(null);
  const [teamMateToDelete, setTeamMateToDelete] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const queryClient = useQueryClient();

  // Responsive values
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const isMobile = useBreakpointValue({ base: true, md: false });
  const searchBoxWidth = useBreakpointValue({
    base: "100%",
    sm: "100%",
    md: "320px",
  });

  // Fetch team members data using useQuery
  const {
    data: teamMembersData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: () => waivedAdminApi.getTeamMates(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const teamMembersRows: TeamMemberRow[] =
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
  const getFilteredMembers = (): TeamMemberRow[] => {
    if (!isSearchActive || !searchQuery.trim() || !teamMembersRows.length) {
      return teamMembersRows;
    }

    const lowercasedSearch = searchQuery.toLowerCase();
    return teamMembersRows.filter(
      (member) =>
        member.fullName.toLowerCase().includes(lowercasedSearch) ||
        member.emailAddress.toLowerCase().includes(lowercasedSearch)
    );
  };

  // Delete team member mutation
  const { mutate: deleteTeamMate, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => waivedAdminApi.deleteTeamMate(id),
    onSuccess: () => {
      toast.success("Team member deleted");
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      setIsDeleteAlertOpen(false);
      setTeamMateToDelete(null);
    },
    onError: (error) => {
      toast.error("Failed to delete team member");
      console.error("Error deleting team member:", error);
      setIsDeleteAlertOpen(false);
    },
  });

  // Function to handle successful team member addition
  const handleAddSuccess = (): void => {
    setIsAddModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
  };

  // Function to handle successful team member edit
  const handleEditSuccess = (): void => {
    setIsEditModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
  };

  // Function to handle edit button click
  const handleEditClick = (teamMate: TeamMemberRow): void => {
    setSelectedTeamMate(teamMate);
    setIsEditModalOpen(true);
  };

  // Function to handle delete button click
  const handleDeleteClick = (teamMate: TeamMemberRow): void => {
    setTeamMateToDelete(teamMate as unknown as Member);
    setIsDeleteAlertOpen(true);
  };

  // Function to confirm deletion
  const confirmDelete = (): void => {
    if (teamMateToDelete && teamMateToDelete.id) {
      deleteTeamMate(teamMateToDelete.id);
    }
  };

  // Handle search
  const handleSearch = (value: string): void => {
    setSearchQuery(value);
    setIsSearchActive(true);
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
      field: "Name",
      headerName: "Name",
      width: 200,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 1,
      minWidth: 120,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 250,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 1.5,
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      disableColumnMenu: true,
      align: "center",
      flex: isMobile ? 0 : 0.8,
      minWidth: 100,
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
            size={buttonSize}
            aria-label="Edit"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(params.row as TeamMemberRow);
            }}
          />
          <IconButton
            icon={<FiTrash2 />}
            color="red.500"
            variant="ghost"
            size={buttonSize}
            aria-label="Delete"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(params.row as TeamMemberRow);
            }}
          />
        </HStack>
      ),
    },
  ];

  return (
    <Box w="100%">
      {/* Team Members Header */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mt={[3, 4, 5]}
        mb={[4, 5, 6]}
        flexDirection={{ base: "column", sm: "row" }}
        gap={{ base: 3, sm: 0 }}
      >
        <Text fontWeight="bold" fontSize={["md", "lg"]} color="black">
          Team Members
        </Text>
        <Button
          leftIcon={<FiPlus />}
          borderRadius="5"
          colorScheme="teal"
          size={buttonSize}
          onClick={() => {
            setIsAddModalOpen(true);
          }}
        >
          Add New
        </Button>
      </Flex>

      {/* Search Section */}
      <Flex mt={[4, 5, 6]} mb={[4, 5, 6]}>
        <Box w="100%" h="40px" maxW={searchBoxWidth}>
          <SearchInput
            placeHolder="Search for a member"
            showSelect={false}
            onSearch={handleSearch}
          />
        </Box>
      </Flex>

      {/* Table */}
      <Box mt={["10px", "16px", "24px"]} overflowX="auto">
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

      {/* Modal for AddTeamMate */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent maxW={{ base: "90%", md: "400px" }}>
          <ModalCloseButton />
          <ModalBody padding={{ base: "24px", md: "32px" }}>
            <AddTeamMate onSuccess={handleAddSuccess} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal for EditTeamMate */}
      {selectedTeamMate && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          size={{ base: "sm", md: "md" }}
          isCentered
        >
          <ModalOverlay backdropFilter="blur(5px)" />
          <ModalContent maxW={{ base: "90%", md: "400px" }}>
            <ModalCloseButton />
            <ModalBody padding={{ base: "24px", md: "32px" }}>
              <EditTeamMate
                onSuccess={handleEditSuccess}
                teamMateData={{
                  ...selectedTeamMate,
                  id: String(selectedTeamMate.id),
                }}
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
        size={{ base: "sm", md: "md" }}
      >
        <AlertDialogOverlay bg="blackAlpha.300" backdropFilter="blur(5px)">
          <AlertDialogContent
            borderRadius="md"
            boxShadow="xl"
            mx={{ base: 4, md: "auto" }}
          >
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
                isLoading={isDeleting}
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
