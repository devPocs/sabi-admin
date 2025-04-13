import React from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Spinner,
} from "@chakra-ui/react";

interface ICustomButtonProps extends ChakraButtonProps {
  label: string;
  isLoading?: boolean;
}

const Buttons: React.FC<ICustomButtonProps> = ({
  label,
  isLoading = false,
  fontSize = "15",
  variant = "brand",
  fontWeight = "700",
  type = "submit",
  w = "100%",
  h = "40px",
  mb = "24px",
  ...rest
}) => {
  return (
    <ChakraButton
      fontSize={fontSize}
      variant={variant}
      fontWeight={fontWeight}
      type={type}
      w={w}
      h={h}
      borderRadius="8px"
      mb={mb}
      isLoading={isLoading}
      {...rest}
    >
      {isLoading ? <Spinner size="sm" /> : label}
    </ChakraButton>
  );
};

export default Buttons;
