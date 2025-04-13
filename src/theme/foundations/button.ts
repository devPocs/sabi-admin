import { mode } from "@chakra-ui/theme-tools";
import { SystemStyleObject } from "@chakra-ui/react";

export const buttonStyles = {
  components: {
    Button: {
      baseStyle: {
        borderRadius: "16px",
        boxShadow: "45px 76px 113px 7px rgba(112, 144, 176, 0.08)",
        transition: ".25s all ease",
        boxSizing: "border-box",
        _focus: {
          boxShadow: "none",
        },
        _active: {
          boxShadow: "none",
        },
      },

      variants: {
        outline: () => ({
          borderRadius: "16px",
        }),
        ghost: (props: SystemStyleObject) => ({
          borderRadius: "16px",
          color: "brand.500",
          bg: mode("inherit", "brand.400")(props),
          _active: {
            bg: mode("brand.1000", "brand.400")(props),
          },
        }),
        brand: (props: SystemStyleObject) => ({
          bg: mode("brand.500", "brand.400")(props),
          color: "white",
          _focus: {
            bg: mode("brand.500", "brand.400")(props),
          },
          _active: {
            bg: mode("brand.500", "brand.400")(props),
          },
          _hover: {
            bg: mode("brand.600", "brand.400")(props),
          },
          _disabled: {
            bg: "gray.300",
            color: "gray.500",
            cursor: "not-allowed",
          },
        }),
        danger: (props: SystemStyleObject) => ({
          bg: mode("red.700", "red.700")(props),
          color: "red.800",
          _focus: {
            bg: mode("red.700", "red.700")(props),
          },
          _active: {
            bg: mode("red.700", "red.700")(props),
          },
          _hover: {
            bg: mode("red.700", "red.700")(props),
          },
          // _disabled: {
          //   bg: "gray.300",
          //   color: "gray.500",
          //   cursor: "not-allowed",
          // },
        }),
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            bg: "#00B69B",
            borderColor: "#00B69B",
          },
        },
      },
    },
  },
};
