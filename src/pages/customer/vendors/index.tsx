import { Box, HStack, Image, Stack } from "@chakra-ui/react";
import { Grid, GridItem, Card, CardBody, Text } from "@chakra-ui/react";


import ActionsKeys from "@components/editDelete";
import SearchInput from "@components/SearchInput";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Item from "./items";


const Vendors = () => {
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
      // renderCell: () => {
      //   return <ActionsKeys editModal={<EditProduct />} />;
      // },
    },
  ];
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

  };
  return (
    <>

      <Box w={["100%", "100%"]}>

        <Stack
          direction={["row"]}
          justifyContent="space-between"
          mt="20"
          spacing={["20px", "0px"]}
        >
          <Box w="100%" h="40px" maxW={["40%", "411px"]}>
            <SearchInput placeHolder="Search for a market" showSelect={true} selectMenu={[{ name: "All Products", value: "all products" }]} />
          </Box>

        </Stack>
        <Box mt={["10px", "24px"]}>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={6}
          >
           <Item />
           <Item />
           <Item />
           <Item />
           <Item />
           <Item />

          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Vendors;
