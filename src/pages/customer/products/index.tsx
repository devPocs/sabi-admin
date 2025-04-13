import { Box, Heading, HStack, Image, Stack } from "@chakra-ui/react";
import { Grid, GridItem, Card, CardBody, Text } from "@chakra-ui/react";
import iconlevies from "@assets/icons/Frame3.png";

import ActionsKeys from "@components/editDelete";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import useModals from "@hooks/useModal";
import { GridColDef } from "@mui/x-data-grid";
import { pageLinks } from "@services/pageLinks";
import { useNavigate } from "react-router-dom";
import Add from "@components/add";
import { globalStyles } from "../../../theme/styles";
import EditProduct from "../editProduct";
import Buttons from "@components/button";
import AddProduct from "../addProduct";


const Products = () => {
  const columns: GridColDef[] = [
    { field: "S/N", headerName: "S/N", width: 100, disableColumnMenu: true },
    {
      field: "Product Name",
      headerName: "Product Name",
      width: 500,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "Price",
      headerName: "Price",
      width: 500,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "-",
      headerName: "Actions",
      width: 80,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      renderCell: () => {
        return <ActionsKeys editModal={<EditProduct />} />;
      },
    },
  ];
  const { Modal, isModalOpen, handleOk, handleCancel, showModal } = useModals();
  const navigate = useNavigate();
  const rows = [
    {
      "S/N": 1,
      "Product Name": "50kg Royal Rice",
      "Price": "50,000.00",
    },
    {
      "S/N": 1,
      "Product Name": "50kg Royal Rice",
      "Price": "50,000.00",
    },
    {
      "S/N": 1,
      "Product Name": "50kg Royal Rice",
      "Price": "50,000.00",
    },
    {
      "S/N": 1,
      "Product Name": "50kg Royal Rice",
      "Price": "50,000.00",
    },
   
  ];
  const handleRowClick = (params: any) => {
    console.log(params);
    navigate(
      `${pageLinks.Markets + "/" + pageLinks.marketetails}?id=${params.row.id}`
    );
  };
  return (
    <>
      <Modal
        // title="Basic Modal"
        style={{ top: 20 }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <AddProduct />
      </Modal>



      <Box w={["100%", "100%"]}>
      
        <Stack
          direction={["row"]}
          justifyContent="space-between"
          mt="20"
          spacing={["20px", "0px"]}
        >
          <Box w="100%" h="40px" maxW={["40%", "411px"]}>
            <SearchInput placeHolder="Search for a market" showSelect={true} selectMenu={[{name:"All Products", value:"all products"}]} />
          </Box>
          <Box>
            <Buttons
              w={{ base: "25vw", md: "218px" }}
              variant="brand"
              isDisabled={status === "pending"}
              label="Add New"
              onClick={showModal}
              type="submit"
              h={["40px", "56px"]}
            />
          </Box>

          
        </Stack>
        <Box mt={["10px", "24px"]}>
          <Tables onRowClick={handleRowClick} columns={columns} rows={rows} />
        </Box>
      </Box>
    </>
  );
};

export default Products;
