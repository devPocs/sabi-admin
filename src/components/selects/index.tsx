import React from "react";
import { Box, Select, FormHelperText, Text } from "@chakra-ui/react";

interface Option {
  value: string | number;
  name?: string;
  disabled?: boolean;
}

interface SelectsProps {
  title?: string;
  textColor?: string;
  icon?: React.ReactNode;
  boxStyles?: React.CSSProperties;
  fontSize?: string | string[];
  textStyles?: React.CSSProperties;
  options?: Option[];
  height?: string;
  fontFamily?: string;
  border?: string;
  fontWeight?: string | number;
  errorMsg?: string;
  error?: boolean;
  [key: string]: any; // Allows additional props
}

const Selects: React.FC<SelectsProps> = ({
  title = "title",
  textColor = "",
  icon,
  boxStyles = {},
  fontSize,
  textStyles = {},
  options = [],
  fontFamily,
  border,
  fontWeight,
  errorMsg,
  height,
  error,
  ...rest
}) => {
  const isDarkMode = false; // Set based on your actual dark mode logic

  return (
    <>
      <Text
        mb={["8px"]}
        lineHeight={["16px", "17px"]}
        fontSize={fontSize || ["12px", "14px"]}
        fontWeight={fontWeight || "500"}
        color={textColor || "neutral.1"}
        {...textStyles}
      >
        {title}
      </Text>
      <Box
        display="flex"
        flexDirection={["row"]}
        alignItems={["center"]}
        {...boxStyles}
      >
        {icon && (
          <Box transform={["translateY(-1px)"]} ml={["5px", "7px"]}>
            {icon}
          </Box>
        )}
        <Select

          className="selectInput"
          style={{
            height: height || "56px",
            width: "100%",
            borderRadius: "5px",
            ...boxStyles,
            background: "#f5f5f5",
            fontSize: "13px",
            border: error ? "1px solid #F10000 " : "1.5px solid #dfdfdf",
            backgroundColor: isDarkMode ? "black" : "#f5f5f5",
            color: isDarkMode ? "white" : "black",
          }}
          color={textColor || "neutral.1"}
          {...rest}
        >
          <option value="">--</option>
          {options.map((item) => (
            <option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {item.name || "options"}
            </option>
          ))}
        </Select>
      </Box>
      {error && (
        <FormHelperText fontSize="x-small" color="error.20">
          {errorMsg}
        </FormHelperText>
      )}
    </>
  );
};

export default Selects;
