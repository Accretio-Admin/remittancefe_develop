import { FormControlLabel, styled } from "../mui";
import { fontSize } from "../../utils/font_size";

export const TableDataGridStyleFormControlLabelCheckboxFilter = styled(
  FormControlLabel
)(() => ({
  display: "flex",
  width: "100%",
  minWidth:"250px",
  justifyContent: "space-between",
  padding: 0,
  margin:"20px 0px",
  "& .MuiButtonBase-root": {
    padding: "0px",
  },
  "& .MuiTypography-root": {
    fontWeight: "500",
    fontSize: fontSize["base"],
  },
}));
