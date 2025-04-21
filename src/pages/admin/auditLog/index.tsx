import { useState } from "react";
import {
  Box,
  Text,
  Flex,
  HStack,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import { GridColDef } from "@mui/x-data-grid";
import { waivedAdminApi } from "@services/api";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@hooks/useCurrentUser";

const AuditLog = () => {
  // Not using these in pagination functionality yet, but keeping them for future implementation
  const [currentPage] = useState(1);

  const { data } = useCurrentUser();
  const adminId = data?.userInfo.userId;

  // Responsive column widths
  const activityWidth = useBreakpointValue({
    base: 200,
    sm: 250,
    md: 350,
    lg: 400,
  });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { data: auditLog } = useQuery({
    queryKey: ["audit log", adminId],
    queryFn: () => waivedAdminApi.getAuditLog(adminId),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log("error getting the audit log", error);
    },
  });
  const auditLogData = auditLog?.data?.pageItems;

  // Use auditLog data if available
  const auditLogRows = auditLogData
    ? auditLogData.map((log, index) => ({
        "S/N": index + 1,
        Date: log.formattedDate,
        Time: log.formattedTime,
        User: log.userFullName,
        Role: log.userRole,
        Activity: log.activity,
        id: log.id,
      }))
    : [
        {
          "S/N": 1,
          Date: "31/11/2024",
          Time: "9:00 AM",
          User: "Idowu Jide",
          Role: "ADMIN",
          Activity: "Paid Vendor A #2,000 for 5 bags of sachet water",
          id: 1,
        },
        {
          "S/N": 2,
          Date: "31/11/2024",
          Time: "9:00 AM",
          User: "Idowu Jide",
          Role: "ADMIN",
          Activity: "Paid Vendor A #2,000 for 5 bags of sachet water",
          id: 2,
        },
        {
          "S/N": 3,
          Date: "31/11/2024",
          Time: "9:00 AM",
          User: "Idowu Jide",
          Role: "ADMIN",
          Activity: "Paid Vendor A #2,000 for 5 bags of sachet water",
          id: 3,
        },
        {
          "S/N": 4,
          Date: "31/11/2024",
          Time: "9:00 AM",
          User: "Idowu Jide",
          Role: "ADMIN",
          Activity: "Paid Vendor A #2,000 for 5 bags of sachet water",
          id: 4,
        },
        {
          "S/N": 5,
          Date: "31/11/2024",
          Time: "9:00 AM",
          User: "Idowu Jide",
          Role: "ADMIN",
          Activity: "Paid Vendor A #2,000 for 5 bags of sachet water",
          id: 5,
        },
        {
          "S/N": 6,
          Date: "31/11/2024",
          Time: "9:00 AM",
          User: "Idowu Jide",
          Role: "ADMIN",
          Activity: "Paid Vendor A #2,000 for 5 bags of sachet water",
          id: 6,
        },
      ];

  // Table columns with responsive configuration
  const columns: GridColDef[] = [
    {
      field: "S/N",
      headerName: "S/N",
      width: 70,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 1,
      minWidth: 50,
    },
    {
      field: "Date",
      headerName: "Date",
      width: 120,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 1,
      minWidth: 90,
    },
    {
      field: "Time",
      headerName: "Time",
      width: 100,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 1,
      minWidth: 70,
    },
    {
      field: "User",
      headerName: "User",
      width: 150,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 1,
      minWidth: 100,
    },
    {
      field: "Role",
      headerName: "Role",
      width: 100,
      disableColumnMenu: true,
      flex: isMobile ? 0 : 1,
      minWidth: 80,
    },
    {
      field: "Activity",
      headerName: "Activity",
      width: activityWidth,
      disableColumnMenu: true,
      flex: 1.5,
      minWidth: 150,
    },
  ];

  // Define the handleRowClick with proper type
  const handleRowClick = (params: any) => {
    console.log(params);
  };

  return (
    <Box w="100%">
      {/* Audit Log Header */}
      <Box
        display="flex"
        mt={[3, 4, 5]}
        mb={[4, 5, 6]}
        justifyContent="space-between"
        flexDirection={["column", "row"]}
        gap={[2, 0]}
      >
        <Text fontWeight="bold" fontSize={["md", "lg"]} color="black">
          Audit Log
        </Text>
      </Box>

      {/* Search Section */}
      <Flex mt={[4, 5, 6]} mb={[4, 5, 6]}>
        <Box w="100%" h="40px" maxW={["100%", "100%", "320px"]}>
          <SearchInput
            placeHolder="Search logs"
            showSelect={true}
            selectMenu={[{ name: "All Activities", value: "all" }]}
          />
        </Box>
      </Flex>

      {/* Table */}
      <Box mt={["10px", "16px", "24px"]} overflowX="auto">
        <Tables
          onRowClick={handleRowClick}
          columns={columns}
          rows={auditLogRows}
        />

        {/* Pagination */}
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
      </Box>
    </Box>
  );
};

export default AuditLog;
