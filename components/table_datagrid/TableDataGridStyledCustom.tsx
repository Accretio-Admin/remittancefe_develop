import { DataGrid, styled } from "../mui";
import { Colors } from "../../utils/colors";
import { borderRadiusSize } from "../../utils/border_radius_size";
import { fontSize } from "../../utils/font_size";
import { BoxShadows } from "../../utils/shadowsanddropshadows";
import {
  EModeRowFirstTable,
  ITableDataGridStyledCustom,
} from "../../interfaces/table_datagrid/ITableDataGrid.interface";

const activateRowFirstUser = () => {
  return {
    backgroundColor: Colors.nsLightningYellowOpacity10,
    "&:hover": {
      backgroundColor: Colors.nsLightningYellowOpacity10,
    },
    "&.Mui-selected": {
      backgroundColor: Colors.nsLightningYellowOpacity10,
    },
    "& .MuiDataGrid-withBorder": {
      ":first-child": {
        borderLeft: `1px solid ${Colors.nsSunglow1}`,
        borderTop: `1px solid ${Colors.nsSunglow1}`,
        borderBottom: `1px solid ${Colors.nsSunglow1}`,
        borderRight: "none",

        borderRadius: `${borderRadiusSize.base} 0 0 ${borderRadiusSize.base}`,
      },
      ":last-child": {
        borderRight: `1px solid ${Colors.nsSunglow1}`,
        borderTop: `1px solid ${Colors.nsSunglow1}`,
        borderBottom: `1px solid ${Colors.nsSunglow1}`,
        borderLeft: "none",

        borderRadius: `0 ${borderRadiusSize.base} ${borderRadiusSize.base} 0`,
      },
      ":nth-child(n+2):nth-child(-n+4)": {
        borderTop: `1px solid ${Colors.nsSunglow1}`,
        borderBottom: `1px solid ${Colors.nsSunglow1}`,
        borderLeft: "none",
        borderRight: "none",
      },
      backgroundColor: Colors.nsLightningYellowOpacity10,
    },
  };
};

const activateRowFirst = (nameSection: keyof typeof EModeRowFirstTable) => {
  if (nameSection == EModeRowFirstTable.users) {
    return activateRowFirstUser();
  }
};
const useBackgroundColorTableMainDataGrid = (value: boolean) => {
  if (!value) {
    return {
      backgroundColor: Colors.nsVistaWhite1,
    };
  }
};
const useRemovePaddingTableDataGridMain = (value: boolean) => {
  if (!value) {
    return {
      padding: "1.25rem",
    };
  }
};
export const TableDataGridStyledCustom = styled(
  DataGrid
)<ITableDataGridStyledCustom>(({ ...props }) => ({
  border: "none",
  borderRadius: "unset",
  ...useRemovePaddingTableDataGridMain(
    props.removePaddingContainerTableDataGridParent
  ),
  height: "calc(100vh - 175px)",
  ...useBackgroundColorTableMainDataGrid(
    props.removeBackgroundMainTableDataGrid
  ),
  "& .MuiDataGrid-main": {
    transition: "margin-top 0.3s ease-in-out",
    "& .MuiDataGrid-columnHeaders": {
      borderBottom: "unset",
      borderTopLeftRadius: "unset",
      borderTopRightRadius: "unset",
      border: `1px solid ${Colors.nsGray2}`,
      borderRadius: borderRadiusSize.base,
      "& .MuiDataGrid-columnHeadersInner": {
        div: {
          "& .MuiDataGrid-columnHeader": {
            "&.MuiDataGrid-withBorder": {
              borderRight: "none",
            },
            ":focus": {
              outline: "none",
            },
            ":focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeaderDraggableContainer": {
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                "& .MuiDataGrid-columnHeaderTitleContainerContent": {
                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: Colors.nsBlack1,
                    fontWeight: "600",
                    fontSize: fontSize.base,
                  },
                },
                "& .MuiDataGrid-iconButtonContainer": {
                  visibility: "visible",
                  width: "inherit",
                },
              },
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },
          },
        },
      },
    },
    div: {
      "& .MuiDataGrid-virtualScroller": {
        "& .MuiDataGrid-virtualScrollerContent": {
          "& .MuiDataGrid-virtualScrollerRenderZone": {
            "& .MuiDataGrid-row": {
              ":first-child": {
                ...activateRowFirst(props.modeRowFirstTable),
              },
              "& .MuiDataGrid-withBorder": {
                ":first-child": {
                  borderLeft: `1px solid ${Colors.nsSilver1}`,
                  borderTop: `1px solid ${Colors.nsSilver1}`,
                  borderBottom: `1px solid ${Colors.nsSilver1}`,
                  borderRight: "none",

                  borderRadius: `${borderRadiusSize.base} 0 0 ${borderRadiusSize.base}`,
                },
                ":last-child": {
                  borderRight: `1px solid ${Colors.nsSilver1}`,
                  borderTop: `1px solid ${Colors.nsSilver1}`,
                  borderBottom: `1px solid ${Colors.nsSilver1}`,
                  borderLeft: "none",

                  borderRadius: `0 ${borderRadiusSize.base} ${borderRadiusSize.base} 0`,
                },
                ":nth-child(n+2):not(:last-child)": {
                  borderTop: `1px solid ${Colors.nsSilver1}`,
                  borderBottom: `1px solid ${Colors.nsSilver1}`,
                  borderLeft: "none",
                  borderRight: "none",
                },
                backgroundColor: Colors.nsWhite1,
              },
              margin: "8px 0px",
              "& .MuiDataGrid-cell": {
                ":focus": {
                  outline: "none",
                },
                ":focus-within": {
                  outline: "none",
                },
                justifyContent: "center",
                "& .MuiDataGrid-cellContent": {
                  color: Colors.nsBlack1,
                  fontWeight: "400",
                  fontSize: fontSize.base,
                },
              },
            },
          },
        },
      },
    },
  },
  div: {
    "& .MuiDataGrid-footerContainer": {
      border: "none",
      padding: "1.25rem 0",
    },
    "& .pagination-container": {
      "& .MuiToolbar-root": {
        padding: "0px 50px",
        "& .MuiTablePagination-displayedRows": {
          fontWeight: "600",
          fontSize: fontSize.base,
        },
        "& .MuiTablePagination-selectLabel": {
          fontWeight: "600",
          fontSize: fontSize.base,
        },
        "& .MuiInputBase-root": {
          zIndex: "1",
          margin: "0px",
          fontWeight: "600",
          fontSize: fontSize.base,
          "& .MuiSvgIcon-root": {
            fontWeight: "600",
            color: Colors.nsBlack1,
            fontSize: fontSize["2xl"],
          },
        },
        "& .MuiTablePagination-actions": {
          position: "absolute",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          left: 0,
          margin: "0px",
          button: {
            backgroundColor: Colors.nsWhite1,
            boxShadow: BoxShadows.nsTwo,
            border: `1px solid ${Colors.nsAlto1}`,
            borderRadius: borderRadiusSize.base,
            height: "30px",
            width: "30px",
            "& .MuiSvgIcon-root": {
              fontWeight: "600",
              fontSize: fontSize["2xl"],
            },
          },
        },
      },
    },
  },
}));
