import { useEffect, useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import AppRoutes from "./routes";
import initialTheme from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { vendorApi } from "@services/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  const [currentTheme] = useState(initialTheme);

  useEffect(() => {
    // Function to refresh token
    const refreshToken = async () => {
      try {
        console.log("refreshing token");
        await vendorApi.refreshToken();
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    };

    refreshToken();
    const refreshInterval = setInterval(refreshToken, 4 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={currentTheme}>
              <AppRoutes />
              <ToastContainer />
            </ChakraProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
