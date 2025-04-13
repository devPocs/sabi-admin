import Buttons from "@components/button";
import { Box, FormControl, Heading, Image, Text, Flex } from "@chakra-ui/react";
import prod1 from "@assets/logo.png";
import { Formik, Form } from "formik";
import Inputs from "@components/inputs";
import Selects from "@components/selects";
import { globalStyles } from "../../../theme/styles";
import { useMutation } from "@tanstack/react-query";
import { vendorApi } from "@services/api";
import { toast } from "react-toastify";
import { useState } from "react";

const EditProduct = (props) => {
  const [currentImage, setCurrentImage] = useState(prod1);

  // Access product data - handle both possible structures
  const productData = props.product?.product || props.product;
  const productId = props.productId || productData?.id;
  const { onSuccess } = props;

  console.log("Edit Page:", productData);

  const updateProductMutation = useMutation({
    mutationFn: (data) => vendorApi.updateWaivedProduct(data),
    onSuccess: (data) => {
      toast({
        title: "Product updated",
        description: "Your product has been updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Reset image to default after successful submission
      setCurrentImage(prod1);
      // Call the onSuccess callback passed from parent
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to update product",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Handle form submission
  const handleSubmit = (values) => {
    updateProductMutation.mutate({
      ...values,
      productId: productId,
    });
  };

  return (
    <Box width="100%" borderRadius="8px" bg="white" p={6}>
      <Heading
        fontWeight="700"
        lineHeight="38px"
        fontSize="24px"
        color="#333"
        mb={4}
      >
        Edit Product
      </Heading>

      <Flex direction="column" alignItems="center" mb={6}>
        <Image
          src={currentImage}
          alt="product"
          width="100px"
          height="100px"
          objectFit="cover"
          mb={2}
        />
        <Text
          color={globalStyles.colors.green[500]}
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
          display="flex"
          alignItems="center"
        >
          Replace Photo
        </Text>
      </Flex>

      <Formik
        initialValues={{
          productId: productId || "",
          productName: productData?.productName || "",
          isAvailbleForUrgentPurchase:
            productData?.isAvailbleForUrgentPurchase || false,
          categoryId: productData?.categoryId || "2",
          imageUrl: productData?.imageUrl || "",
          currencyType: productData?.currencyType || 1,
          price: productData?.price || 0,
        }}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form style={{ width: "100%" }}>
            <FormControl>
              <Box mb="24px">
                <Text fontWeight="500" mb={2} color="#333">
                  Product Name
                </Text>
                <Inputs
                  showPrefix={false}
                  onChange={handleChange}
                  name="productName"
                  value={values.productName}
                  placeholder="Product Name"
                  // Remove the title prop that's causing the issue
                />
              </Box>

              <Box mb="24px">
                <Text fontWeight="500" mb={2} color="#333">
                  Price
                </Text>
                <Inputs
                  showPrefix={false}
                  onChange={handleChange}
                  name="price"
                  value={values.price}
                  placeholder="Price"
                  // Remove the title prop that's causing the issue
                />
              </Box>

              <Box mb="24px">
                <Text fontWeight="500" mb={2} color="#333">
                  Category
                </Text>
                <Selects
                  showPrefix={false}
                  onChange={handleChange}
                  name="categoryId"
                  value={values.categoryId}
                  placeholder="Category"
                  // Remove the title prop that's causing the issue
                />
              </Box>

              <Box mb="24px">
                <Text fontWeight="500" color="#333">
                  Product is available for urgent purchase
                </Text>
                {/* Add toggle switch component here if needed */}
              </Box>

              <Box mt="24px" width="100%">
                <Buttons
                  variant="solid"
                  isDisabled={updateProductMutation.status === "pending"}
                  label="Update"
                  type="submit"
                  w="100%"
                  h="40px"
                  bg="#00BFA5"
                  color="white"
                  borderRadius="md"
                  _hover={{ bg: "#00A895" }}
                  fontSize="14px"
                  fontWeight="500"
                />
              </Box>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProduct;
