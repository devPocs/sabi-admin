import {
  Box,
  HStack,
  useBreakpointValue,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../navbar";
import Sidebars from "../sideBar";

const AuthLayout = () => {
  const { colorMode } = useColorMode();
  const isDrawerOpenOnDesktop = useBreakpointValue({ base: false, md: true });

  const isDarkMode = colorMode !== "light";

  return (
    <Box
      minH="100vh"
      overflow="auto"
      w={["100vw"]}
      bg={isDarkMode ? "navy.900" : "secondaryGray.200"}
    >
      <Sidebars />
      <VStack
        minH={["831px"]}
        w="100%"
        mb="30px"
        alignItems={["center"]}
        justifyContent={"flex-start !important"}
        px={["10px"]}
        pt={["10px"]}
        pl={isDrawerOpenOnDesktop ? "300px" : ""}
      >
        <HStack
          px={{ base: "1%", md: "1%" }}
          w={"100%"}
          justifyContent={"flex-end"}
        >
          <NavBar />
        </HStack>
        <HStack
          px={{ base: "1%", md: "1%" }}
          w={"100%"}
          justifyContent={"flex-end"}
          maxW={"2800px"}
          // px="auto"
          pt={["60px", "0px"]}
          mt={["10px", "10px"]}
        >
          <Outlet />
        </HStack>
      </VStack>
    </Box>
  );
};

export default AuthLayout;
