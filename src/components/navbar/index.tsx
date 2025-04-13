import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Stack,
  useColorMode,
  VStack,
} from "@chakra-ui/react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import ListItems from "@components/ListItems";
import { sideMenuItems } from "@components/sideBar";
import { useAuthService } from "@helpers/index";
import { pageLinks } from "@services/pageLinks";
import { Approle } from "src/types/roleType";

const notifications = ["a", "b"];
interface props {
  type?: Approle;
}
const NavBar = ({ type }: props) => {
  const { colorMode } = useColorMode();

  const location = useLocation();
  const isDarkMode = colorMode !== "light";
  const { handleLogout } = useAuthService();
  const Checkcurrent = (links: string[]): string | undefined => {
    function checkLink(link: string): boolean {
      const locationArr = location?.pathname?.split("/") || [];
      if (link) {
        if (link === "/" && location?.pathname === "/") {
          return true;
        }
        const currentRoute = link.split("/")?.[1];
        if (currentRoute && locationArr.includes(currentRoute)) return true;
      }
      return false;
    }

    return (
      links.find((item) => checkLink(item))?.split("/")?.[1] || "Dashboard"
    ); // Return the first matching link or an empty string if none match
  };

  return (
    <HStack
      position={["fixed", "static"]}
      zIndex={3}
      bg={isDarkMode ? "navy.1000" : "brandScheme.1000"}
      justifyContent="flex-start"
      pr={["10px", "20px"]}
      pl={["1px", "30px"]}
      py={["5px", "5px"]}
      h={["50px", "80px"]}
      w={["100%", "100%"]}
    >
      <Heading
        alignItems={"center"}
        display={"flex"}
        color="gray.700"
        flexDirection={"row"}
        fontSize={"lg"}
        whiteSpace={"nowrap"}
      >
        {type == "admin"
          ? "Admin Portal"
          : Checkcurrent(sideMenuItems.map((item) => item.link))}
      </Heading>
      <Stack
        alignItems={"center"}
        w="100%"
        justifyContent={"flex-end"}
        direction="row"
      >
        <Box cursor={"pointer"} position={"relative"} mr={["3%"]}>
          <Box
            right={-1}
            top={-1}
            position={"absolute"}
            width="10px"
            height="10px"
            bg="red.500"
            borderRadius="full"
            display="inline-block"
          />
          <Menu>
            <MenuButton>
              <FiBell />
            </MenuButton>
            <MenuList border={"none"} bg="gray.100">
              <Card
                width={["100%", "440px"]}
                maxW={"440px"}
                minH="214px"
                maxH={"400px"}
                overflowY={"auto"}
                borderRadius="8px"
                display="flex"
                bg="gray.100"
                boxShadow="md"
              >
                <CardBody
                  overflow={"hidden"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <HStack justifyContent={"space-between"}>
                    <Heading
                      fontWeight="900"
                      lineHeight="28px"
                      as="p"
                      fontSize={["14px", "18px"]}
                    >
                      Notifications
                    </Heading>
                    <Button
                      fontWeight="400"
                      lineHeight="19.6px"
                      letterSpacing="0.05em"
                      as="p"
                      fontSize={["13px", "14px"]}
                      variant="ghost"
                    >
                      Mark all as read{" "}
                    </Button>
                  </HStack>
                  <VStack mt={["10px", "14px"]}>
                    {notifications.map((item, index) => (
                      <>
                        <ListItems />
                        {index !== notifications.length - 1 && (
                          <Flex
                            mt={["9px", "8px"]}
                            w="100%"
                            align="center"
                            mb="9px"
                          >
                            <Flex
                              h="1px"
                              w="100%"
                              bg="rgba(135, 140, 189, 0.3)"
                            />
                          </Flex>
                        )}
                      </>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            </MenuList>
          </Menu>
        </Box>

        <Menu isLazy>
          <MenuButton>
            <HStack alignItems={"center"}>
              <Avatar
                size="sm"
                bg="orange"
                color="secondaryGray.1000"
                name={`ma`}
                src="https://bit.ly/broken-link"
              />
              <FaChevronDown />
            </HStack>
          </MenuButton>
          <MenuList
            bg={isDarkMode ? "navy.1000" : "brandScheme.1000"}
            border="none"
            width="100px"
            minWidth="100px"
          >
            {/* Set a specific width */}
            <MenuItem
              bg={isDarkMode ? "navy.1000" : "brandScheme.1000"}
              p={2}
              pl={4}
            >
              <Link to={`${pageLinks.profile}`}>Profile</Link>
            </MenuItem>
            <MenuItem
              bg={isDarkMode ? "navy.1000" : "brandScheme.1000"}
              p={2}
              pl={4}
              onClick={handleLogout}
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </HStack>
  );
};

export default NavBar;
