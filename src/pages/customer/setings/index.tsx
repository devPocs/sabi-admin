import { Box } from "@chakra-ui/react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Password from "./password";

const Settings = () => {
  return (
    <Box width={"100%"}>
      <Tabs isFitted variant="enclosed">
        <TabList
          display="flex"
          gap={2}
          justifyContent="flex-start"
          background="#f5f5f5"
          borderRadius="md"
          p="2"
          pb="0px"
          border={"none"}
          width="fit-content"
        >
          <Tab
            _selected={{
              borderBottom: "3px solid #008698", // Highlight the selected tab
              background: "white", // Keep background white
              color: "black",
            }}
            _hover={{ background: "gray.100" }} // Light gray hover effect
            border="none"
            px="4"
            py="1"
            background={"brand.1000"}
            borderRadius="0"
          >
            Password Change
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Password />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <LevySetUp /> */}
    </Box>
  );
};

export default Settings;
