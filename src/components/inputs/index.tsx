import React from "react";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
} from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import { MdOutlineVpnKey } from "react-icons/md";
import { FormHelperText, Text } from "@chakra-ui/react";

interface InputsProps {
  title?: string; // No default value here
  textColor?: string;
  fontFamily?: string;
  icon?: React.ReactNode;
  secured?: boolean;
  showPrefix?: boolean;
  boxStyles?: React.CSSProperties;
  height?: string;
  fontSize?: string | string[];
  fontWeight?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMsg?: string;
  error?: boolean;
  [key: string]: any; // To allow additional props for the Input component
}

const Inputs: React.FC<InputsProps> = ({
  title, // No default value, so it will be undefined if not provided
  textColor = "",
  fontFamily = "",
  icon,
  secured = false,
  showPrefix = true,
  boxStyles = {},
  height,
  fontSize,
  fontWeight,
  placeholder,
  disabled,
  errorMsg,
  error,
  ...rest
}) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const isDarkMode = false; // Set based on your actual dark mode logic

  return (
    <>
      {/* Only render the label if title is provided */}
      {title && (
        <Text
          mb={["8px"]}
          lineHeight={["16px", "17px"]}
          fontSize={fontSize || ["12px", "14px"]}
          color={textColor || "neutral.1"}
          fontWeight={fontWeight || "500"}
          float={"left"}
        >
          {title}
        </Text>
      )}

      <Input
        disabled={disabled}
        // onWheel={(e) => e.target.blur()}
        style={{
          height: height || "56px",
          width: "100%",
          borderRadius: "5px",
          background: "#f5f5f5",
          ...boxStyles,
          border: error ? "1px solid #F10000 " : "1.5px solid inherit",
          backgroundColor: isDarkMode ? "black" : "#f5f5f5",
          color: isDarkMode ? "white" : "black",
        }}
        placeholder={placeholder}
        prefix={
          showPrefix ? (
            icon ? (
              icon
            ) : (
              <MdOutlineVpnKey className="site-form-item-icon" />
            )
          ) : null
        }
        suffix={
          secured && (
            <Tooltip title="Extra information">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          )
        }
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        {...rest}
      />

      {error ? (
        <FormHelperText fontSize={"x-small"} color="error.20">
          {errorMsg}
        </FormHelperText>
      ) : null}
    </>
  );
};

export default Inputs;
