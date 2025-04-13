import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  gridClasses,
} from "@mui/x-data-grid";
import { Center, Heading, Image } from "@chakra-ui/react";
import img from "@assets/not.png";
import img2 from "@assets/not2.png";
import { Approle } from "src/types/roleType";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00BFA5",
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F9F9F9",
            borderBottom: "1px solid #E0E0E0",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "2px solid #E0E0E0",
            padding: "16px 8px",
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiTablePagination-root": {
            color: "#333",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 500,
            color: "#666",
          },
        },
      },
    },
  },
});

interface Props {
  columns: GridColDef[];
  onRowClick?: GridEventListener<"rowClick"> | undefined;
  rows: Array<{ [key: string]: any }>;
  moduleName?: Approle;
}

export default function DynamicDataGrid({
  rows = [],
  columns,
  onRowClick,
  moduleName,
}: Props) {
  // Process columns to ensure proper alignment support
  const processedColumns = columns.map((column) => ({
    ...column,
    // Ensure headerAlign matches align if not specified
    headerAlign: column.headerAlign || column.align,
  }));
  return rows.length > 0 ? (
    <ThemeProvider theme={theme}>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={processedColumns}
          onRowClick={onRowClick}
          getRowId={(row) => row["S/N"]}
          disableRowSelectionOnClick
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          sx={{
            "& .MuiDataGrid-row": {
              backgroundColor: "#FFFFFF",
              "&:nth-of-type(odd)": {
                backgroundColor: "#FFFFFF",
              },
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F0F0F0",
              cursor: "pointer",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "14px",
              color: "#333",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#00BFA5",
              color: "white",
            },
            "& .MuiDataGrid-columnHeader": {
              paddingLeft: 2,
              paddingRight: 2,
            },
            [`& .${gridClasses.cell}`]: {
              py: 1.5,
            },
            // Pagination controls styling
            "& .MuiTablePagination-root": {
              color: "#666",
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontSize: "14px",
              },
            "& .MuiTablePagination-select": {
              fontSize: "14px",
            },
            // Pagination navigation styling
            "& .MuiPagination-ul": {
              "& .MuiPaginationItem-root": {
                "&.Mui-selected": {
                  backgroundColor: "#00BFA5",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#00A895",
                  },
                },
              },
            },
            // Header styling
            "& .MuiDataGrid-columnHeaders": {
              minHeight: "48px !important",
              maxHeight: "48px !important",
              lineHeight: "48px",
            },
            // Make sure the footer is properly styled with thicker border
            "& .MuiDataGrid-footerContainer": {
              minHeight: "52px",
              borderTop: "2px solid #E0E0E0",
            },
            // Add thicker divider lines between rows
            "& .MuiDataGrid-row:not(:last-child)": {
              borderBottom: "2px solid #F0F0F0",
            },
            // Remove focus outline
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
              {
                outline: "none",
              },
          }}
        />
      </div>
    </ThemeProvider>
  ) : moduleName == "admin" ? (
    <Center flexDirection={"column"} minH={"700px"}>
      <Image src={img2} alt="No data available" />
      <Heading
        fontWeight="700"
        fontSize="28px"
        lineHeight="38.19px"
        letterSpacing="1px"
        color={"secondaryGray.900"}
      >
        No Data Yet
      </Heading>
    </Center>
  ) : (
    <Center minH={"700px"}>
      <Image src={img} alt="No data available" />
    </Center>
  );
}
