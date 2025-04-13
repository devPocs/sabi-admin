import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import useModals from "@hooks/useModal";
import { ChakraProvider } from "@chakra-ui/react";
import initialTheme from "../../theme/theme";


interface props {
  editModal?: React.ReactNode;
}
const ActionsKeys = ({ editModal = null }: props) => {
  const {
    Modal: Modal1,
    isModalOpen: isModalOpen1,
    handleOk: handleOk1,
    handleCancel: handleCancel1,
    showModal: showModal1,
  } = useModals();
  const [currentTheme] = useState(initialTheme);
  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click
    showModal1(); // Open the edit modal
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click
    console.log("Delete action triggered");
    // Add delete logic here
  };

  return (
    <ChakraProvider theme={currentTheme}>
      <Modal1
        style={{ top: 20 }}
        open={isModalOpen1}
        onOk={handleOk1}
        onCancel={handleCancel1}
        footer={null}
      >
        {editModal}
      </Modal1>
      <HStack
        h="100%"
        alignItems="center"
        maxW="80px"
        justifyContent="space-between"
      >
        <FaRegEdit
          fontWeight="bold"
          onClick={handleEditClick}
          color="#00B69B"
          style={{ width: "20px", height: "20px", cursor: "pointer" }}
        />
        <AiOutlineDelete
          onClick={handleDeleteClick}
          style={{ width: "20px", height: "20px", cursor: "pointer" }}
          color="#ef3826"
        />
      </HStack>
    </ChakraProvider>
  );
};

export default ActionsKeys;
