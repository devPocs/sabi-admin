import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import { Grid, GridItem, Card, CardBody, Text } from "@chakra-ui/react";
import SearchInput from "@components/SearchInput";
import Tables from "@components/table";
import useModals from "@hooks/useModal";
import { GridColDef } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import Add from "@components/add";
import { globalStyles } from "../../../theme/styles";
import SubscribAct from "./subscribAct";
import { useEffect, useState } from "react";
import Empty from "@components/empty";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { vendorApi } from "@services/api";
import { serviceLinks } from "@services/serviceLinks";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiData, ApiResponse } from "src/types";
import Loader from "@components/spinner";

const Markets = () => {
  const { data } = useCurrentUser();

  const f_name = data?.userInfo?.firstName;
  const l_name = data?.userInfo?.lastName;
  const userId = data?.userInfo?.userId;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [waivedProducts, setWaivedProducts] = useState<apiData | null>(null);
  const [subscribe, setSubscribe] = useState(false);

  const checkSubscription = useMutation({
    mutationFn: async () => {
      // Only call if userId is available
      if (!userId) return null;
      return vendorApi.vendorCheckActiveSubscription(userId);
    },
    onSuccess: (response) => {
      if (!response) return;

      console.log("Subscription status:", response.data);

      if (response.data?.isSuccessful) {
        setSubscribe(true);
        console.log("subscribed");
      } else {
        setSubscribe(false);
      }
    },
    onError: (res: ApiResponse) => {
      console.error("Subscription check error:", res);
      setSubscribe(false);
      toast(res?.data?.message || "Error checking subscription");
    },
  });

  const { mutate, status } = useMutation({
    mutationFn: async () => {
      return vendorApi.getWaivedProducts(); // Fetch waived products
    },
    mutationKey: [serviceLinks.getWaivedProducts],
    onSuccess: (response: apiData) => {
      setIsLoading(false);
      setWaivedProducts(response.data); // Store data for later use
      console.log("Waived Products:", response.data);
    },
    onError: (res: ApiResponse) => {
      setIsLoading(false);
      console.error("API Error:", res);
      toast(res?.data?.message || "Error fetching waived products");
    },
  });

  // Function to trigger data fetching
  const fetchWaivedProducts = () => {
    setIsLoading(true);
    mutate();
  };

  // Use the waivedProducts data anywhere in your component
  useEffect(() => {
    fetchWaivedProducts();

    // Only check subscription if we have a userId
    if (userId) {
      checkSubscription.mutate();
    }
  }, [userId]);

  // Format products data for the table
  const formattedProductRows = waivedProducts?.pageItems
    ? waivedProducts.pageItems.map((product, index) => ({
        "S/N": index + 1,
        "Product Name": product.productName,
        Price: new Intl.NumberFormat("en-NG", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(product.price),
        "Vendor Name": product.vendorName || "Sabi Vendor",
        id: product.id,
      }))
    : [];

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
      width: 200,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "Vendor Name",
      headerName: "Vendor Name",
      width: 200,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
  ];
  const { Modal, isModalOpen, handleOk, handleCancel, showModal } = useModals();
  const navigate = useNavigate();

  // Fallback dummy data if needed
  const dummyRows = [
    {
      "S/N": 1,
      "Product Name": "50kg Royal Rice",
      Price: "50,000.00",
      "Vendor Name": "Ufuoma Pocs",
    },
    {
      "S/N": 2,
      "Product Name": "50kg Royal Rice",
      Price: "50,000.00",
      "Vendor Name": "Ufuoma Pocs",
    },
    {
      "S/N": 3,
      "Product Name": "50kg Royal Rice",
      Price: "50,000.00",
      "Vendor Name": "Ufuoma Pocs",
    },
    {
      "S/N": 4,
      "Product Name": "50kg Royal Rice",
      Price: "50,000.00",
      "Vendor Name": "Ufuoma Pocs",
    },
  ];

  const handleRowClick = (params: any) => {
    console.log(params);
  };

  // Count the number of products
  const productCount = waivedProducts?.pageItems?.length || 0;

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        style={{ top: 20 }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      />

      <Box w={["100%", "100%"]}>
        <Box>
          {subscribe ? <Add /> : <SubscribAct setSubscribe={setSubscribe} />}
        </Box>

        <Box display={"flex"} mt="7">
          <Text fontWeight={"bold"} pe="2" color={"black"}>
            Welcome Onboard,
          </Text>{" "}
          <Text>
            {f_name} {l_name}
          </Text>
        </Box>
        <Box mt={["25px", "20px"]}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <GridItem>
              <Card
                width="100%"
                maxW={"600px"}
                borderRadius="8px"
                px="2px"
                py="8px"
                display="flex"
                gap="32px"
                bg="gray.100"
                boxShadow="md"
              >
                <CardBody
                  overflow={"hidden"}
                  display={"flex"}
                  flexDirection={"column"}
                  py={"4px"}
                >
                  <HStack
                    alignItems={"flex-start"}
                    justifyContent={"space-between"}
                  >
                    <Box>
                      <Text fontSize="13px" color="gray.300">
                        Next Waived Market
                      </Text>
                      <Heading
                        fontWeight="600"
                        fontSize="24px"
                        lineHeight="38.19px"
                        letterSpacing="1px"
                        color={"secondaryGray.900"}
                      >
                        Nov 24, 2024
                      </Heading>
                    </Box>
                    <HStack>
                      <Box
                        display={"flex"}
                        width={50}
                        height={50}
                        bg={globalStyles.colors.blue[100]}
                        borderRadius={5}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <FaRegCalendarAlt fontSize={22} />
                      </Box>
                    </HStack>
                  </HStack>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem display="flex" justifyContent="flex-end">
              <Card
                width="100%"
                maxW={"600px"}
                borderRadius="8px"
                px="2px"
                py="8px"
                display="flex"
                gap="32px"
                bg="gray.100"
                boxShadow="md"
              >
                <CardBody
                  overflow={"hidden"}
                  display={"flex"}
                  flexDirection={"column"}
                  py={"4px"}
                >
                  <HStack
                    alignItems={"flex-start"}
                    justifyContent={"space-between"}
                  >
                    <Box>
                      <Text fontSize="13px" color="gray.300">
                        No. of Products
                      </Text>
                      <Heading
                        fontWeight="600"
                        fontSize="24px"
                        lineHeight="38.19px"
                        letterSpacing="1px"
                        color={"secondaryGray.900"}
                      >
                        {productCount}
                      </Heading>
                    </Box>
                    <HStack>
                      <Box
                        display={"flex"}
                        width={50}
                        height={50}
                        bg={globalStyles.colors.red[50]}
                        borderRadius={5}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <AiOutlineProduct
                          fontSize={22}
                          fontWeight={"bold"}
                          color={globalStyles.colors.red[80]}
                        />
                      </Box>
                    </HStack>
                  </HStack>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </Box>

        <Box display={"flex"} mt="10" justifyContent="space-between">
          <Text fontWeight={"bold"} pe="2" color={"black"}>
            Available Product
          </Text>
          <Link to="/products">
            <Text
              fontWeight={"bold"}
              pe="2"
              color={globalStyles.colors.green[500]}
            >
              View All
            </Text>
          </Link>
        </Box>

        <Stack
          direction={["row"]}
          justifyContent="space-between"
          mt="15"
          spacing={["20px", "0px"]}
        >
          <Box w="100%" h="40px" maxW={["40%", "411px"]}>
            <SearchInput
              placeHolder="Search for a market"
              showSelect={true}
              selectMenu={[{ name: "All Products", value: "all products" }]}
            />
          </Box>
        </Stack>
        <Box mt={["10px", "24px"]}>
          {subscribe ? (
            <Tables
              onRowClick={handleRowClick}
              columns={columns}
              rows={
                formattedProductRows.length > 0
                  ? formattedProductRows
                  : dummyRows
              }
            />
          ) : (
            <Empty />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Markets;
