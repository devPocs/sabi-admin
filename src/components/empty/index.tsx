import { Box, Image, Text } from "@chakra-ui/react";
import empty from "@assets/not.png"

const Empty = () => {
  return (
    <Box
      px={["9%"]}
      width="100%"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      padding="10"
    >
      <Image src={empty}  alt="" width={"35%"}/>
      
    </Box>
  );
};

export default Empty;
