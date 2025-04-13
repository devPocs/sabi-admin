import { Spin } from "antd";
import { Box } from "@chakra-ui/react";
const Spinner = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      zIndex: 1000,
    }}
  >
    <Spin />
  </Box>
);

export default Spinner;
