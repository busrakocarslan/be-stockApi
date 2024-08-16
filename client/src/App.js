import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "./router/AppRouter";
import {
  
  amber,
  lightGreen,
  deepOrange,
  purple,
  blueGrey,
} from "@mui/material/colors";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react"

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: blueGrey["700"],
      },
      secondary: {
        main: amber["800"],
      },
      success: {
        main: lightGreen["800"],
      },
      error: {
        main: deepOrange["800"],
      },
      info: {
        main: purple["500"],
      },      
    },
   
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>{/*bilgi için syore bak */}
            <AppRouter />
          </PersistGate>
        </Provider>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;

  
  