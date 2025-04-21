import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  Center,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import { GridColDef } from "@mui/x-data-grid";
import { globalStyles } from "../../../theme/styles";
import { useQuery } from "@tanstack/react-query";
import { waivedAdminApi } from "@services/api";
import Spinner from "@components/spinner";
import ViewComplaint from "./viewComplaints";

interface ComplaintType {
  id: number | string;
  complaintId: string;
  sender: string;
  description: string;
  vendorId: string;
  dateSent: string;
  status: string;
}

const Complaints = () => {
  // Not using these in pagination functionality yet, but keeping them for future implementation
  const [currentPage] = useState(1);
  const toast = useToast();

  // Responsive layout settings
  const isMobile = useBreakpointValue({ base: true, md: false });
  const descriptionWidth = useBreakpointValue({ base: 200, sm: 250, md: 300 });

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedComplaint, setSelectedComplaint] =
    useState<ComplaintType | null>(null);

  // Fetch complaints data using useQuery
  const {
    data: complaintsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customerComplaints"],
    queryFn: waivedAdminApi.getCustomerComplaints,
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to fetch complaints",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Transform API data for the table
  const complaintRows = complaintsData?.data?.pageItems?.map(
    (complaint: any, index: number) => ({
      "S/N": index + 1,
      "Complaint ID": complaint.id || `#${Math.floor(Math.random() * 10000)}`,
      Sender: complaint.sender || complaint.customerName || "N/A",
      "Complaint Description": complaint.description || "N/A",
      id: complaint.id || index,
      vendorId:
        complaint.vendorId || "VEND" + Math.floor(Math.random() * 10000),
      dateSent: complaint.dateSent || new Date().toISOString(),
      status: complaint.status || "Pending",
      // Include any additional fields needed
    })
  ) || [
    {
      "S/N": 1,
      "Complaint ID": "#1234",
      Sender: "Idowu Jide",
      "Complaint Description": "Vendor 123 didn't include nylon to what...",
      id: 1,
      vendorId: "VEND1234",
      dateSent: "2024-10-29T10:00:00",
      status: "Pending",
    },
    {
      "S/N": 2,
      "Complaint ID": "#1235",
      Sender: "Idowu Jide",
      "Complaint Description": "Vendor 123 didn't include nylon to what...",
      id: 2,
      vendorId: "VEND1235",
      dateSent: "2024-10-28T11:30:00",
      status: "Pending",
    },
    {
      "S/N": 3,
      "Complaint ID": "#1236",
      Sender: "Idowu Jide",
      "Complaint Description": "Vendor 123 didn't include nylon to what...",
      id: 3,
      vendorId: "VEND1236",
      dateSent: "2024-10-27T09:15:00",
      status: "Pending",
    },
    {
      "S/N": 4,
      "Complaint ID": "#1237",
      Sender: "Idowu Jide",
      "Complaint Description": "Vendor 123 didn't include nylon to what...",
      id: 4,
      vendorId: "VEND1237",
      dateSent: "2024-10-26T14:20:00",
      status: "Pending",
    },
    {
      "S/N": 5,
      "Complaint ID": "#1238",
      Sender: "Idowu Jide",
      "Complaint Description": "Vendor 123 didn't include nylon to what...",
      id: 5,
      vendorId: "VEND1238",
      dateSent: "2024-10-25T16:45:00",
      status: "Pending",
    },
  ];

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
      field: "Complaint ID",
      headerName: "Complaint ID",
      width: 150,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 1,
      minWidth: 100,
    },
    {
      field: "Sender",
      headerName: "Sender",
      width: 200,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 1,
      minWidth: 120,
    },
    {
      field: "Complaint Description",
      headerName: "Complaint Description",
      width: descriptionWidth,
      disableColumnMenu: true,
      flex: 1.5,
      minWidth: 150,
    },
  ];

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

  const handleRowClick = (params: any) => {
    console.log(params);
    // Format the complaint data for the modal
    const complaint = {
      id: params.row.id,
      complaintId: params.row["Complaint ID"],
      sender: params.row.Sender,
      description: params.row["Complaint Description"],
      vendorId: params.row.vendorId,
      dateSent: formatDate(params.row.dateSent),
      status: params.row.status,
    };

    setSelectedComplaint(complaint);
    onOpen();
  };

  return (
    <Box w="100%">
      {/* Complaints List Header */}
      <Box
        display="flex"
        mt={[2, 3, 4]}
        mb={[3, 4, 5]}
        justifyContent="space-between"
        flexDirection={["column", "row"]}
        gap={[2, 0]}
      >
        <Text fontWeight="bold" fontSize={["md", "lg"]} color="black">
          Complaints List
        </Text>
        <Link to="/all-complaints">
          <Text fontWeight="bold" pe="2" color={globalStyles.colors.green[500]}>
            View All
          </Text>
        </Link>
      </Box>

      {/* Search Section */}
      <Flex mt={[4, 5, 6]} mb={[4, 5, 6]}>
        <Box w="100%" h="40px" maxW={["100%", "100%", "320px"]}>
          <SearchInput
            placeHolder="Search for a complaint"
            showSelect={true}
            selectMenu={[{ name: "Recent", value: "recent" }]}
            defaultOption="Recent"
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
              Error loading complaints. Please try again.
            </Text>
          </Center>
        ) : (
          <Tables
            onRowClick={handleRowClick}
            columns={columns}
            rows={complaintRows}
          />
        )}

        {/* Pagination */}
        {!isLoading && !isError && complaintRows.length > 0 && (
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

      {/* Complaint Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent borderRadius="12px" maxW={["90%", "450px"]}>
          <ModalBody p={0}>
            <ViewComplaint complaint={selectedComplaint} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Complaints;
