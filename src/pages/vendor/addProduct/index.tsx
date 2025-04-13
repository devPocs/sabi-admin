import Buttons from "@components/button";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import prod1 from "@assets/add.png";
import { Formik, Form } from "formik";
import Inputs from "@components/inputs";
import Selects from "@components/selects";
import { globalStyles } from "../../../theme/styles";
import { useMutation } from "@tanstack/react-query";
import { vendorApi } from "@services/api";
import * as Yup from "yup";
import { useEffect, useState } from "react";

// Validation schema
const ProductSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  categoryId: Yup.string().required("Category is required"),
});

const productImages = {
  "1": "https://media.istockphoto.com/id/451100663/photo/old-and-used-electric-home-waste.jpg?s=612x612&w=0&k=20&c=-DUWWFyrziKj5wN-VvEpwjzF0IjMnYV8Z5z1ZlGzH6I=", // Electronics
  "2": "https://thumbs.dreamstime.com/b/vintage-second-hand-clothes-hanging-shop-rack-flea-market-weekly-hipster-wardrobe-sale-concept-alternative-retro-moda-61605398.jpg", // Clothing
  "3": "https://media.istockphoto.com/id/508909395/photo/wooden-basket-full-of-fresh-organic-vegetables.jpg?s=612x612&w=0&k=20&c=ntU19O1tm8_FRHNYvXH3-3-3HxTwGBH5RcoMHJDGN_4=", // Food
  "4": "https://media.istockphoto.com/id/913533942/photo/tropical-fruits-basket.jpg?s=612x612&w=0&k=20&c=eiHHFdSSQV5NnW2M5uKRjVfi5tJx8zp4KmaxCHQ5HHE=", // Other
};

const AddProduct = () => {
  const toast = useToast();
  const [currentImage, setCurrentImage] = useState<string>(prod1);

  // Using useMutation for product creation
  const createProductMutation = useMutation({
    mutationFn: (productData: any) =>
      vendorApi.createWaivedProduct(productData),
    onSuccess: (data) => {
      toast({
        title: "Product added",
        description: "Your product has been added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset image to default after successful submission
      setCurrentImage(prod1);
      // You could reset the form or redirect here
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to add product",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return (
    <Box width="100%" borderRadius="8px" bg="brand.1000">
      <Heading
        fontWeight={"700"}
        lineHeight={"30px"}
        fontSize={{ base: "30px", md: "32px" }}
        mt="20"
      >
        Add Product
      </Heading>
      <Box mt="7">
        <Image
          src={currentImage}
          alt="Product category"
          width="105px"
          height="105px"
          objectFit="cover"
          borderRadius="md"
        />
      </Box>
      <Formik
        initialValues={{
          productName: "",
          price: "",
          categoryId: "",
          isAvailableForUrgentPurchase: false,
        }}
        validationSchema={ProductSchema}
        onSubmit={(values, { resetForm }) => {
          // Get the imageUrl based on the selected category
          const imageUrl = productImages[values.categoryId] || "";

          // Convert price to number and include the image URL
          const payload = {
            ...values,
            price: Number(values.price),
            imageUrl: imageUrl,
          };

          createProductMutation.mutate(payload);
          resetForm();
        }}
      >
        {({ errors, touched, values, handleChange, setFieldValue }) => {
          // Update image when category changes
          useEffect(() => {
            if (values.categoryId && productImages[values.categoryId]) {
              setCurrentImage(productImages[values.categoryId]);
            } else {
              setCurrentImage(prod1);
            }
          }, [values.categoryId]);

          return (
            <Form style={{ width: "100%", marginTop: "24px" }}>
              <FormControl>
                <Box mb="20px">
                  <Inputs
                    showPrefix={false}
                    onChange={handleChange}
                    name="productName"
                    value={values.productName}
                    placeholder={"Product Name"}
                    title="Product Name"
                    errorMsg={errors.productName}
                    error={
                      errors.productName != null && touched.productName != null
                    }
                  />
                </Box>
                <Box mb="20px">
                  <Inputs
                    showPrefix={false}
                    onChange={handleChange}
                    name="price"
                    value={values.price}
                    placeholder={"Price"}
                    title="Price"
                    errorMsg={errors.price}
                    error={errors.price != null && touched.price != null}
                  />
                </Box>
                <Box mb="20px">
                  <Selects
                    showPrefix={false}
                    onChange={handleChange}
                    name="categoryId"
                    value={values.categoryId}
                    placeholder={"Category"}
                    title="Category"
                    errorMsg={errors.categoryId}
                    error={
                      errors.categoryId != null && touched.categoryId != null
                    }
                    options={[
                      { value: "1", name: "Electronics" },
                      { value: "2", name: "Clothing" },
                      { value: "3", name: "Food" },
                      { value: "4", name: "Other" },
                    ]}
                  />
                </Box>
                <Box my="15px">
                  <Checkbox
                    name="isAvailableForUrgentPurchase"
                    isChecked={values.isAvailableForUrgentPurchase}
                    onChange={(e) =>
                      setFieldValue(
                        "isAvailableForUrgentPurchase",
                        e.target.checked
                      )
                    }
                  >
                    <Text color="black">
                      Product is available for urgent purchase
                    </Text>
                  </Checkbox>
                </Box>
                <Box mt={["36px"]}>
                  <Buttons
                    variant={"brand"}
                    isDisabled={createProductMutation.isPending}
                    label={
                      createProductMutation.isPending
                        ? "Adding..."
                        : "Add Product"
                    }
                    type="submit"
                  />
                </Box>
              </FormControl>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
export default AddProduct;
