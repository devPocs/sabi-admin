import {
  Box,
  Stack,
  Spinner,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import ActionsKeys from "@components/editDelete";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import useModals from "@hooks/useModal";
import { GridColDef } from "@mui/x-data-grid";
import EditProduct from "../editProduct";
import Buttons from "@components/button";
import AddProduct from "../addProduct";
import ViewProduct from "../viewProduct";
import { useQuery } from "@tanstack/react-query";
import { vendorApi } from "@services/api";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Products = () => {
  // State to track selected product for viewing
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Using Chakra UI's useDisclosure for view modal
  const {
    isOpen: isViewModalOpen,
    onOpen: openViewModal,
    onClose: closeViewModal,
  } = useDisclosure();

  // Fetch products data
  const { data, status, error, refetch } = useQuery({
    queryKey: ["waivedProducts"],
    queryFn: vendorApi.getWaivedProducts,
  });

  console.log("data", data);
  // Fetch selected product data when a product is selected
  const { data: selectedProductData, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["waivedProduct", selectedProductId],
    queryFn: () => vendorApi.getWaivedProductById(selectedProductId),
    enabled: !!selectedProductId && isViewModalOpen,
  });

  // Directly prepare the rows from the query data
  const productRows = data?.data?.pageItems
    ? data.data.pageItems.map((product, index) => ({
        "S/N": index + 1,
        "Product Name": product.productName,
        Price: new Intl.NumberFormat("en-NG", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(product.price),
        id: product.id,
      }))
    : [];

  const columns: GridColDef[] = [
    { field: "S/N", headerName: "S/N", width: 100, disableColumnMenu: true },
    {
      field: "Product Name",
      headerName: "Product Name",
      width: 500,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      field: "Price",
      headerName: "Price",
      width: 500,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      field: "-",
      headerName: "Actions",
      width: 120,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: (params) => {
        const fullProduct = data?.data?.pageItems?.find(
          (product) => product.id === params.row.id
        );

        return (
          <ActionsKeys
            editModal={
              <EditProduct
                productId={params.row.id}
                product={fullProduct}
                onSuccess={() => {
                  refetch();
                }}
              />
            }
            // onDelete={handleDeleteProduct} // get this from the useQuery yet to be defined.
            // itemId={params.row.id}
          />
        );
      },
    },
  ];

  // Modal for adding products
  const {
    Modal: AddModal,
    isModalOpen,
    handleOk,
    handleCancel,
    showModal,
  } = useModals();

  // Handle product row click to view details
  const handleRowClick = (params) => {
    setSelectedProductId(params.row.id);
    openViewModal();
  };

  // Handle closing the view modal
  const handleCloseViewModal = () => {
    closeViewModal();
    setSelectedProductId(null);
  };

  // Refresh products after adding a new one
  const handleAddSuccess = () => {
    refetch();
    handleCancel();
  };

  return (
    <>
      {/* Add Product Modal */}
      <AddModal
        style={{ top: 20 }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <AddProduct onSuccess={handleAddSuccess} />
      </AddModal>

      {/* View Product Modal */}
      <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal} isCentered>
        <ModalOverlay />
        <ModalContent maxW="370px" p={0}>
          <ModalBody p={0}>
            {isLoadingProduct ? (
              <Center p={4}>
                <Spinner size="xl" color="blue.500" />
              </Center>
            ) : selectedProductData?.data ? (
              <ViewProduct
                product={selectedProductData.data}
                onClose={handleCloseViewModal}
              />
            ) : (
              <Box textAlign="center" p={4}>
                Error loading product details. Please try again.
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box w={["100%", "100%"]}>
        <Stack
          direction={["row"]}
          justifyContent="space-between"
          mt="20"
          spacing={["20px", "0px"]}
        >
          <Box w="100%" h="40px" maxW={["40%", "411px"]}>
            <SearchInput
              placeHolder="Search for a market"
              showSelect={true}
              selectMenu={[{ name: "All Products", value: "all products" }]}
            />
          </Box>
          <Box>
            <Buttons
              w={{ base: "200px", md: "130px" }}
              variant="solid"
              isDisabled={status === "pending"}
              label={
                <Box display="flex" alignItems="center" justifyContent="center">
                  <FaPlus style={{ marginRight: "8px" }} />
                  Add New
                </Box>
              }
              onClick={showModal}
              type="submit"
              h="40px"
              bg="#00BFA5"
              color="white"
              borderRadius="md"
              _hover={{ bg: "#00A895" }}
              fontSize="14px"
              fontWeight="500"
            />
          </Box>
        </Stack>

        {status === "pending" ? (
          <Box textAlign="center" py={5}>
            Loading products...
          </Box>
        ) : status === "error" ? (
          <Box textAlign="center" color="red.500" py={5}>
            Error loading products. Please try again.
          </Box>
        ) : (
          <Box mt={["10px", "24px"]}>
            <Tables
              onRowClick={handleRowClick}
              columns={columns}
              rows={productRows.length > 0 ? productRows : []}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Products;
