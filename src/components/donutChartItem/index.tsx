import { Box, Heading, HStack } from "@chakra-ui/react";
import PieChart from "@components/Charts2";
import CustomDateRangePicker from "@components/CustomDateRangePicker";

interface props {
  title: string;
}

const DonutChartItem = ({ title = "" }: props) => {
  return (
    <Box p={3}  h="300px" bg="brand.1000">
    
      <HStack  justifyContent={"space-between"}>
        <Heading
          fontWeight="700"
          fontSize={["14px", "18px"]}
          lineHeight="25.2px"
          letterSpacing="0.5px"
          textTransform="capitalize"
          color="gray.700"
        >
          {title}
        </Heading>

        <CustomDateRangePicker />
      </HStack>
      <HStack h="100%" alignItems={"center"} justifyContent={"center"} >
        <PieChart />
      </HStack>
    </Box>
  );
};

export default DonutChartItem;
