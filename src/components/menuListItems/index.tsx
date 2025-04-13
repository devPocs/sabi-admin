import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface IMenuListItemProps {
  icon?: () => JSX.Element;
  title?: string;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
  link?: string;
}

const MenuListItems = ({
  icon,
  title,
  isActive,
  link = "",
  onClick,
}: IMenuListItemProps) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode !== "light";
  return (
    <Link
      style={{ cursor: "pointer", width: "100%" }}
      onClick={onClick || undefined}
      to={link}
    >
      <Flex
        flexDirection={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        h={["30px", "50px"]}
        w={["100%"]}
        bg={isActive ? "white" : ""}
        overflowX={"auto"}
        pl={["13px", "17px"]}
      >
        <Box mr={["8%"]}>{icon?.()}</Box>
        <Text
          fontSize={["13px", "16px"]}
          whiteSpace={"nowrap"}
          color={!isActive ? "white" : isDarkMode ? "brand.1000" : "brand.600"}
        >
          {title}
        </Text>
      </Flex>
    </Link>
  );
};

export default MenuListItems;
