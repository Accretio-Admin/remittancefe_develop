import { createTheme } from "@mui/material/styles";
import { Colors } from "../../utils/colors";
const typography = {
  fontFamily: "__Poppins_bc4659",
  fontWeightBold: 700,
  fontWeightMedium: 500,
  fontWeightRegular: 400,
  fontWeightLight: 300,
};
const MuiTheme = createTheme({
  typography,
});
const MuiThemeInput = createTheme({
  palette: {
    error: {
      main: Colors.nsRed1,
    },
    primary: {
      main: Colors.nsGallery1,
    },
  },
  typography,
});
export { MuiTheme, MuiThemeInput };
