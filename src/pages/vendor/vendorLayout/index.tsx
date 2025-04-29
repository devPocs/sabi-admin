import {
  Box,
  HStack,
  Text,
  Flex,
  Avatar,
  IconButton,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useBreakpointValue,
  VStack,
  Portal,
} from "@chakra-ui/react";
import { FiChevronDown, FiLogOut, FiSettings, FiMenu } from "react-icons/fi";
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
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { pageLinks } from "@services/pageLinks";
import { useAuthService } from "@helpers/index";

// Type definitions for the components
interface NavItemProps {
  icon: IconType;
  label: string;
  to: string;
  isActive: boolean;
  onClick?: () => void;
}

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuDisclosure = useDisclosure();
  const { handleLogout } = useAuthService(); // Use the auth service hook

  // Responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Navigation items data
  const navItems: NavItemProps[] = [
    {
      icon: FiGrid,
      label: "Dashboard",
      to: "/",
      isActive: location.pathname === "/",
    },
    {
      icon: FiShoppingBag,
      label: "Vendors",
      to: pageLinks.vendors,
      isActive: location.pathname.includes(pageLinks.vendors),
    },
    {
      icon: FiUsers,
      label: "Customers",
      to: pageLinks.customers,
      isActive: location.pathname.includes(pageLinks.customers),
    },
    {
      icon: FiMessageSquare,
      label: "Complaints",
      to: pageLinks.complaints,
      isActive: location.pathname.includes(pageLinks.complaints),
    },
    {
      icon: FiUserCheck,
      label: "Team Members",
      to: pageLinks.teamMembers,
      isActive: location.pathname.includes(pageLinks.teamMembers),
    },
    {
      icon: FiDollarSign,
      label: "Subscription",
      to: pageLinks.subscription || "/subscription",
      isActive: location.pathname.includes(
        pageLinks.subscription || "/subscription"
      ),
    },
    {
      icon: FiAlertTriangle,
      label: "Urgent Purchase Requests",
      to: pageLinks.urgentPurchaseRequests,
      isActive: location.pathname.includes(
        pageLinks.urgentPurchaseRequests || "/urgentPurchaseRequests"
      ),
    },
    {
      icon: FiFileText,
      label: "Audit Log",
      to: pageLinks.auditLog || "/auditLog",
      isActive: location.pathname.includes(pageLinks.auditLog || "/auditLog"),
    },
  ];

  // Handle menu item click
  const handleMenuItemClick = (action: string) => {
    menuDisclosure.onClose();

    // Handle different actions
    if (action === "logout") {
      handleLogout();
    } else if (action === "settings") {
      navigate("/settings");
    }
  };

  return (
    <Box bg="gray.100" minH="100vh">
      {/* Header */}
      <Flex
        height={{ base: "60px", md: "80px" }}
        width="100%"
        bg="white"
        boxShadow="sm"
        alignItems="center"
        px={{ base: 3, md: 6 }}
        position="sticky"
        top="0"
        zIndex="10"
      >
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Flex alignItems="center">
            {isMobile && (
              <IconButton
                icon={<FiMenu />}
                variant="ghost"
                aria-label="Menu"
                size="sm"
                mr={2}
                onClick={onOpen}
              />
            )}
            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="medium">
              Admin Portal
            </Text>
          </Flex>
          <HStack spacing={{ base: 2, md: 4 }}>
            <IconButton
              icon={<IoNotificationsOutline />}
              variant="ghost"
              aria-label="Notification"
              size="sm"
            />
            <Menu
              isOpen={menuDisclosure.isOpen}
              onClose={menuDisclosure.onClose}
              onOpen={menuDisclosure.onOpen}
              closeOnSelect={true}
              autoSelect={false}
              isLazy
            >
              <MenuButton>
                <HStack spacing={1} cursor="pointer">
                  <Avatar bg="green.500" size="sm" name="AU" />
                  {/* <Icon as={FiChevronDown} /> */}
                </HStack>
              </MenuButton>
              <Portal>
                <MenuList zIndex={9999}>
                  <MenuItem
                    fontSize="sm"
                    icon={<FiSettings />}
                    onClick={() => handleMenuItemClick("settings")}
                  >
                    Settings
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    fontSize="sm"
                    icon={<FiLogOut />}
                    onClick={() => handleMenuItemClick("logout")}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </HStack>
        </Flex>
      </Flex>

      {/* Horizontal navigation bar - visible on desktop */}
      {!isMobile && (
        <Box
          py={2}
          width="100%"
          bg="white"
          borderBottom="1px"
          borderColor="gray.100"
        >
          <Flex width="90%" margin="auto" position="relative">
            <Flex
              width="100%"
              overflowX="auto"
              sx={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <HStack width="100%" spacing={6} padding="10px">
                {navItems.map((item, index) => (
                  <NavItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                    isActive={item.isActive}
                  />
                ))}
              </HStack>
            </Flex>
          </Flex>
        </Box>
      )}

      {/* Content area */}
      <Box width={{ base: "95%", md: "90%" }} margin="auto" mt={4} pb={8}>
        <Outlet />
      </Box>

      {/* Mobile drawer navigation */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="xs"
        blockScrollOnMount={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody p={0}>
            <VStack align="stretch" spacing={0}>
              {navItems.map((item, index) => (
                <Box
                  key={index}
                  w="100%"
                  borderBottomWidth="1px"
                  borderColor="gray.200"
                  onClick={() => {
                    onClose();
                    setTimeout(() => navigate(item.to), 100);
                  }}
                  cursor="pointer"
                >
                  <Flex
                    py={3}
                    px={3}
                    alignItems="center"
                    color={item.isActive ? "teal.500" : "gray.800"}
                    _hover={{ color: "teal.500", bg: "gray.50" }}
                    whiteSpace="nowrap"
                    width="100%"
                  >
                    <Icon as={item.icon} mr={2} />
                    <Text fontSize="sm">{item.label}</Text>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const NavItem = ({ icon, label, to, isActive }: NavItemProps) => {
  return (
    <Flex
      as={Link}
      to={to}
      py={3}
      px={3}
      alignItems="center"
      color={isActive ? "teal.500" : "gray.800"}
      borderBottom={isActive ? "2px solid" : "none"}
      borderColor="gray.100"
      _hover={{ color: "teal.500" }}
      whiteSpace="nowrap"
    >
      <Icon as={icon} mr={2} />
      <Text fontSize="sm">{label}</Text>
    </Flex>
  );
};

export default AdminLayout;
