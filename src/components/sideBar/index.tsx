import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  useColorMode,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import logo from "@assets/logo.png";
import { IoSettingsOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlineAddBusiness } from "react-icons/md";
import {
  RiCustomerService2Line,
  RiMessengerFill,
  RiShoppingCart2Fill,
} from "react-icons/ri";
import { FaRegChartBar } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
// import { AuthContext } from "context/authContext";
import MenuListItems from "../menuListItems";
import { pageLinks } from "@services/pageLinks";
import { useAuthService } from "@helpers/index";
import { Approle } from "src/types/roleType";
import { useCurrentUser } from "@hooks/useCurrentUser";

export type SideMenuTitle =
  | "Dashboard"
  | "Markets"
  | "Caretakers"
  | "Traders"
  | "Levies"
  | "Assistant Officers"
  | "Report"
  | "Goodboys"
  | "Products"
  | "Vendors"
  | "Complaints"
  | "Settings";

export const sideMenuItems = [
  {
    title: "Dashboard",
    icon: (isActive: boolean | undefined) => (
      <MdDashboardCustomize color={isActive ? "#00B69B" : "white"} />
    ),
    link: pageLinks.Dashboard,
  },
  {
    title: "Goodboys",
    icon: (isActive: boolean | undefined) => (
      <IoSettingsOutline color={isActive ? "#00B69B" : "white"} />
    ),
    link: pageLinks.Goodboys,
  },
  {
    title: "Markets",
    icon: (isActive: boolean | undefined) => (
      <CiShop color={isActive ? "#00B69B" : "white"} />
    ),
    link: pageLinks.Markets,
  },
  {
    title: "Caretakers",
    icon: (isActive: boolean | undefined) => (
      <FaPeopleGroup color={isActive ? "#00B69B" : "white"} />
    ),
    link: pageLinks.Caretakers,
  },
  {
    title: "Traders",
    icon: (isActive: boolean | undefined) => (
      <MdOutlineAddBusiness color={isActive ? "#00B69B" : "white"} />
    ),
    link: pageLinks.Traders,
  },
  {
    title: "Levies",
    icon: (isActive: boolean | undefined) => (
      <FaRegMoneyBillAlt color={isActive ? "#00B69B" : "white"} />
    ),
    link: pageLinks.Levies,
  },
  {
    title: "Assistant Officers",
    icon: (isActive: boolean | undefined) => (
      <RiCustomerService2Line color={isActive ? "#00B69B" : "white"} />
    ),
    link: pageLinks.Assistant_Officerss,
  },
  {
    title: "Report",
    icon: (isActive: boolean | undefined) => (
      <FaRegChartBar color={isActive ? "#00B69B" : "white"} />
    ),
    link: pageLinks.Reports,
  },
  {
    title: "Products",
    icon: (isActive: boolean | undefined) => (
      <AiOutlineProduct color={isActive ? "#00B69B" : "white"} />
    ),
    link: pageLinks.products,
  },
  {
    title: "Vendors",
    icon: (isActive: boolean | undefined) => (
      <RiShoppingCart2Fill color={isActive ? "#00B69B" : "white"} />
    ),
    link: pageLinks.vendors,
  },
  {
    title: "Complaints",
    icon: (isActive: boolean | undefined) => (
      <RiMessengerFill color={isActive ? "#00B69B" : "white"} />
    ),
    link: pageLinks.complaints,
  },
  {
    title: "Settings",
    icon: (isActive: boolean | undefined) => (
      <IoSettingsOutline color={isActive ? "#00B69B" : "white"} />
    ),
    link: pageLinks.Settings,
  },
];

interface props {
  role?: Approle;
}
type IRolesAccess = {
  [key in Approle]: SideMenuTitle[];
};
const rolesAccess: IRolesAccess = {
  customer: ["Dashboard", "Vendors", "Complaints", "Settings"],
  vendor: ["Dashboard", "Products", "Settings"],
  caretaker: ["Levies", "Settings", "Traders", "Levies", "Goodboys"],
  admin: [],
  goodBoys: [],
  chairman: [],
  "Assistant Officers": ["Settings", "Traders", "Levies"],
};

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const { role } = useCurrentUser();
  const isDrawerOpenOnDesktop = useBreakpointValue({ base: false, md: true });
  const location = useLocation();
  const { handleLogout } = useAuthService();
  const isDarkMode = colorMode !== "light";
  const toggleSidebar = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isOpen ? onClose() : onOpen();
  };
  const checkCurrent = (link: string) => {
    const locationArr = location?.pathname?.split("/") || [];

    if (link) {
      if (link === "/" && location?.pathname === "/") {
        return true;
      }
      const currentRoute = link?.split("/")?.[1];
      if (currentRoute && locationArr.includes(currentRoute)) return true;
    } else {
      return false;
    }
  };
  const handleLinkClick = () => {
    if (isOpen) {
      onClose(); // Close the sidebar on mobile when a link is clicked
    }
  };

  const handleLogouts = () => {
    handleLogout();
  };
  return (
    <Flex>
      <Box
        as="nav"
        position="fixed"
        left={0}
        top={0}
        h="100vh"
        w={{ base: isOpen ? "300px" : "0", md: "300px" }} // Responsive width
        bg={isDarkMode ? "navy.900" : "secondaryGray.1000"}
        color="white"
        transition="width 0.2s"
        overflow="hidden"
        zIndex="999"
      >
        <Flex mb="2px" justifyContent={"center"} alignItems={"cemter"}>
          <a href="/">
            <Image
              //   h={["30px", "40px", "40px", "40px"]}
              src={logo}
              alt="man"
            />
          </a>
        </Flex>

        <Flex mt={["9px", "8px"]} w="100%" align="center">
          <Flex h="1px" w="100%" bg="rgba(135, 140, 189, 0.3)" />
        </Flex>

        <Flex
          pt="5"
          pl={"17%"}
          pr={["24%"]}
          w="100%"
          direction="column"
          alignItems="start"
          h="full"
          bg={role == "vendor" || role == "customer" ? "#00B69B" : ""}
        >
          {sideMenuItems.map((item) => {
            //show only caretaker item if we pass caretaker as props
            // we can add others too
            if (role == "caretaker") {
              if (rolesAccess.caretaker.find((xx) => xx === item.title)) {
                return (
                  <MenuListItems
                    onClick={handleLinkClick}
                    link={item.link}
                    isActive={checkCurrent(item.link)}
                    icon={() => item.icon(checkCurrent(item.link))}
                    title={item.title}
                  />
                );
              }
              return;
            }
            if (role == "vendor") {
              if (rolesAccess.vendor.find((xx) => xx === item.title)) {
                return (
                  <MenuListItems
                    onClick={handleLinkClick}
                    link={item.link}
                    isActive={checkCurrent(item.link)}
                    icon={() => item.icon(checkCurrent(item.link))}
                    title={item.title}
                  />
                );
              }
              return;
            }
            if (role == "customer") {
              if (rolesAccess.customer.find((xx) => xx === item.title)) {
                return (
                  <MenuListItems
                    onClick={handleLinkClick}
                    link={item.link}
                    isActive={checkCurrent(item.link)}
                    icon={() => item.icon(checkCurrent(item.link))}
                    title={item.title}
                  />
                );
              }
              return;
            }
            if (role == "Assistant Officers") {
              if (
                rolesAccess["Assistant Officers"].find(
                  (xx) => xx === item.title
                )
              ) {
                return (
                  <MenuListItems
                    onClick={handleLinkClick}
                    link={item.link}
                    isActive={checkCurrent(item.link)}
                    icon={() => item.icon(checkCurrent(item.link))}
                    title={item.title}
                  />
                );
              }
              return;
            }
            return (
              <MenuListItems
                onClick={handleLinkClick}
                link={item.link}
                isActive={checkCurrent(item.link)}
                icon={() => item.icon(checkCurrent(item.link))}
                title={item.title}
              />
            );
          })}
          <MenuListItems
            link={""}
            isActive={false}
            onClick={handleLogouts}
            icon={() => <AiOutlineLogout color="white" />}
            title={"Log Out"}
          />
        </Flex>
      </Box>

      {/* Main Content */}

      {!isDrawerOpenOnDesktop && (
        <Box
          ml={{ base: isOpen ? "200px" : "0", md: "200px" }} // Adjust margin to avoid overlap
          w="full"
          p={4}
          transition="margin-left 0.2s"
        >
          {/* Mobile Menu Button */}
          <IconButton
            aria-label="Open Menu"
            icon={<FiMenu />}
            onClick={toggleSidebar} // Toggle sidebar on button click
            display={{
              base: isOpen ? "none" : "block",
              md: "none",
            }}
            position="fixed"
            top={4}
            left={4}
            zIndex="999"
          />
        </Box>
      )}
    </Flex>
  );
};

export default SideBar;
