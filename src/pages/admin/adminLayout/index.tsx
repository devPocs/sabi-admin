import {
  Box,
  HStack,
  Text,
  Card,
  Flex,
  Avatar,
  IconButton,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiChevronDown, FiLogOut, FiSettings } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiMessageSquare,
  FiUserCheck,
  FiDollarSign,
  FiAlertTriangle,
  FiFileText,
} from "react-icons/fi";
import { Link, Outlet, useLocation } from "react-router-dom";

import { pageLinks } from "@services/pageLinks";

const AdminLayout = () => {
  const location = useLocation();
  return (
    <>
      <Box bg={"gray.600"} minH={"100vh"}>
        <Card height={"100px"} width={"100vw"} borderRadius={0}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            height={"100%"}
            px={6}
          >
            <Text fontSize="xl" fontWeight="medium">
              Admin Portal
            </Text>
            <HStack spacing={4}>
              <IconButton
                icon={<IoNotificationsOutline />}
                variant="ghost"
                aria-label="Notification"
                size="sm"
              />
              <Menu placement="bottom-end">
                <MenuButton>
                  <HStack spacing={1} cursor="pointer">
                    <Avatar bg="green.500" size="sm" name="Admin User" />
                    <Icon as={FiChevronDown} />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem fontSize="sm" icon={<FiSettings />}>
                    Settings
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem fontSize="sm" icon={<FiLogOut />}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Card>

        <Box py={2} width="100vw">
          <Flex
            width="90%"
            margin="auto"
            overflowX="auto"
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <HStack
              width={"100%"}
              spacing={6}
              bg={"white"}
              padding={"10px"}
              boxShadow={"3px"}
              borderRadius={"2px"}
            >
              <NavItem
                icon={FiGrid}
                label="Dashboard"
                to="/"
                isActive={location.pathname === "/"}
              />
              <NavItem
                icon={FiShoppingBag}
                label="Vendors"
                to={pageLinks.vendors}
                isActive={location.pathname.includes(pageLinks.vendors)}
              />
              <NavItem
                icon={FiUsers}
                label="Customers"
                to={pageLinks.customers}
                isActive={location.pathname.includes(pageLinks.customers)}
              />
              <NavItem
                icon={FiMessageSquare}
                label="Complaints"
                to={pageLinks.complaints}
                isActive={location.pathname.includes(pageLinks.complaints)}
              />
              <NavItem
                icon={FiUserCheck}
                label="Team Members"
                to={pageLinks.teamMembers}
                isActive={location.pathname.includes(pageLinks.teamMembers)}
              />
              <NavItem
                icon={FiDollarSign}
                label="Subscription"
                to={pageLinks.subscription || "/subscription"}
                isActive={location.pathname.includes(
                  pageLinks.subscription || "/subscription"
                )}
              />
              <NavItem
                icon={FiAlertTriangle}
                label="Urgent Purchase Requests"
                to={pageLinks.urgentPurchaseRequests}
                isActive={location.pathname.includes(
                  pageLinks.urgentPurchaseRequests || "/urgentPurchaseRequests"
                )}
              />
              <NavItem
                icon={FiFileText}
                label="Audit Log"
                to={pageLinks.auditLog || "/auditLog"}
                isActive={location.pathname.includes(
                  pageLinks.auditLog || "/auditLog"
                )}
              />
            </HStack>
          </Flex>
        </Box>
        <Box width="90%" margin="auto" mt={4}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

// Navigation Item Component
const NavItem = ({ icon, label, isActive, to }) => {
  return (
    <Flex
      as={Link}
      to={to}
      py={3}
      alignItems="center"
      color={isActive ? "teal.500" : "gray.800"}
      borderBottom={isActive ? "2px solid" : "none"}
      borderColor="teal.500"
      _hover={{ color: "teal.500" }}
      whiteSpace="nowrap"
    >
      <Icon as={icon} mr={2} />
      <Text fontSize="sm">{label}</Text>
    </Flex>
  );
};

export default AdminLayout;
