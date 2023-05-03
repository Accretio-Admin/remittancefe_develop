import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../provider/Store";
import { Provider } from "react-redux";
import { RouteGuard } from "../components/route_guard/RouteGuard";
import { ThemeProvider } from "@mui/material/styles";
import SnackBarMessageComponent from "../components/snack_bar_message/SnackBarMessage";
import LoadingFullPageBackDrop from "../components/others/LoadingFullPageBackDrop";
import { MuiTheme } from "../components/mui/MuiTheme";
import { Poppins } from "@next/font/google";
import { LocalizationProvider, AdapterDayjs } from "../components/mui";
const poppinsClass = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={poppinsClass.className}>
        <ThemeProvider theme={MuiTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SnackBarMessageComponent />
            <RouteGuard>
              <>
                <LoadingFullPageBackDrop />
                <Component {...pageProps} />
              </>
            </RouteGuard>
          </LocalizationProvider>
        </ThemeProvider>
      </div>
    </Provider>
  );
}
