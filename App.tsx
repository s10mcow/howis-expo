import React from "react";
import { Auth0Provider } from "react-native-auth0";
import Navigation from "./pages/Navigation/Navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./data";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(45, 118, 255)",
    background: "rgb(18,18,18)",
    card: "rgb(18,18,18)",
    text: "rgb(255,255,255)",
    border: "rgb(86, 86, 86)",
  },
};

export const App = () => {
  return (
    <Auth0Provider
      domain="dev-z23gbvtub72x2sj8.us.auth0.com"
      clientId="JyOLnYTPcyJfVzmNXVl8bRfq1TvBuv3s"
    >
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={myTheme}>
          <StatusBar style="light" />
          <Navigation />
        </NavigationContainer>
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default App;
