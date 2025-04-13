import { Box,  Stack } from "@chakra-ui/react";

import ActionsKeys from "@components/editDelete";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import useModals from "@hooks/useModal";
import { GridColDef } from "@mui/x-data-grid";
import { pageLinks } from "@services/pageLinks";
import { useNavigate } from "react-router-dom";
import Buttons from "@components/button";
import AddComplaint from "../addComplaint";
import EditComplaint from "../editComplaint";


const Complaints = () => {
  const columns: GridColDef[] = [
    { field: "S/N", headerName: "S/N", width: 100, disableColumnMenu: true },
    {
      field: "Complaint ID",
      headerName: "Complaint ID",
      width: 300,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "Vendor",
      headerName: "Vendor",
      width: 300,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "Date",
      headerName: "Date",
      width: 300,
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
        return <ActionsKeys editModal={<EditComplaint />} />;
      },
    },
  ];
  const { Modal, isModalOpen, handleOk, handleCancel, showModal } = useModals();
  const navigate = useNavigate();
  const rows = [
    {
      "S/N": 1,
      "Complaint ID": "123456",
      "Vendor": "Ufuoma P",
      "Date": "19/11/2027",
    },
    {
      "S/N": 1,
      "Complaint ID": "123456",
      "Vendor": "Ufuoma P",
      "Date": "19/11/2027",
    },
    
   
  ];
  const handleRowClick = (params: any) => {
    console.log(params);
   
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
        <AddComplaint />
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

export default Complaints;
