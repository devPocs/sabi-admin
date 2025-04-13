import { Box, Heading, Text, VStack } from "@chakra-ui/react";

interface ViewTeamMateDetailsProps {
  teamMateData: {
    id: string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    createdAt?: string; // ISO date string
  };
}

const ViewTeamMateDetails = ({ teamMateData }: ViewTeamMateDetailsProps) => {
  // Format the date if it exists
  const formattedDate = teamMateData?.createdAt
    ? new Date(teamMateData.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : "N/A";

  return (
    <Box width="100%">
      <Heading
        fontWeight="600"
        fontSize="24px"
        color="gray.700"
        mb="24px"
        textAlign="center"
      >
        Member Details
      </Heading>

      <VStack spacing="20px" align="stretch">
        <Box>
          <Text fontSize="14px" fontWeight="500" color="gray.600" mb="4px">
            Full Name
          </Text>
          <Text fontSize="14px" color="gray.800">
            {teamMateData?.fullName || "N/A"}
          </Text>
        </Box>

        <Box>
          <Text fontSize="14px" fontWeight="500" color="gray.600" mb="4px">
            Phone Number
          </Text>
          <Text fontSize="14px" color="gray.800">
            {teamMateData?.phoneNumber || "N/A"}
          </Text>
        </Box>

        <Box>
          <Text fontSize="14px" fontWeight="500" color="gray.600" mb="4px">
            Email Address
          </Text>
          <Text fontSize="14px" color="gray.800">
            {teamMateData?.emailAddress || "N/A"}
          </Text>
        </Box>

        <Box>
          <Text fontSize="14px" fontWeight="500" color="gray.600" mb="4px">
            Date Added
          </Text>
          <Text fontSize="14px" color="gray.800">
            {formattedDate}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default ViewTeamMateDetails;
