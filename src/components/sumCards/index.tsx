import {
  Card,
  CardBody,
  Text,
  Heading,
  Box,
  HStack,
  Image,
} from "@chakra-ui/react";
import iconTraders from "@assets/icons/Frame.png";
import iconCare from "@assets/icons/Frame2.png";
import iconlevies from "@assets/icons/Frame3.png";
import { Approle } from "src/types/roleType";

interface props {
  title?: string;
  type: "traders" | "caretakers" | "levies";
  moduleType?: Approle;
  value?: string;
}

const SumCarss = ({ type, title = "", moduleType, value = "1000" }: props) => {
  return (
    <Card
      width="100%"
      maxW={"500px"}
      height="146px"
      borderRadius="8px"
      padding="8px"
      display="flex"
      gap="32px"
      bg="gray.100"
      boxShadow="md"
    >
      <CardBody
        overflow={"hidden"}
        display={"flex"}
        flexDirection={"column"}
        py={"8px"}
      >
        <HStack alignItems={"flex-start"} justifyContent={"space-between"}>
          <Box>
            <Text color="gray.300">{title}</Text>
          </Box>
          <HStack>
            <Box>
              <Image
                src={
                  type == "caretakers"
                    ? iconCare
                    : type == "levies"
                    ? iconlevies
                    : type == "traders"
                    ? iconTraders
                    : ""
                }
                alt="man"
              />
            </Box>
          </HStack>
        </HStack>
        <HStack mt="calc(146px * 0.08)">
          <Heading
            fontWeight="700"
            fontSize="28px"
            lineHeight="38.19px"
            letterSpacing="1px"
            color={"secondaryGray.900"}
          >
            {value}
          </Heading>
        </HStack>
        <Box mt="auto">
          {moduleType != "admin" && (
            <span>
              <Text color="gray.300" fontSize={["13", "14px"]}>
                8.5% Up from yesterday
              </Text>
            </span>
          )}
        </Box>
      </CardBody>
    </Card>
  );
};

export default SumCarss;
