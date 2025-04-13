import { Box, HStack, Image } from "@chakra-ui/react";
import prod1 from "@assets/prod1.png";
import { GridItem, Card, CardBody, Text } from "@chakra-ui/react";

const Item = () => {
    return (
        <GridItem>
            <Card display={"flex"} >
                <Image
                    src={prod1}
                    alt="man"
                />
                <CardBody py={"4px"}>
                    <HStack alignItems={"flex-start"} justifyContent={"space-between"}>
                        <Box>
                            <Text fontSize="16px" color="gray.300">Next Waived Market</Text>
                            <Text
                                fontWeight="600"
                                fontSize="15px"
                                lineHeight="38.19px"
                                letterSpacing="1px"
                                color={"secondaryGray.900"}
                            >
                                10,000
                            </Text>
                        </Box>
                    </HStack>
                </CardBody>

            </Card>
        </GridItem>
    );
};

export default Item;
