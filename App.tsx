import React from "react";

import Navigation from "./pages/Navigation/Navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./data/oldQL";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Amplify } from "aws-amplify";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react-native";
import awsExports from "./src/aws-exports";

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

Amplify.configure(awsExports);

export const App = () => {
  return (
    <Authenticator.Provider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={myTheme}>
          <StatusBar style="light" />
          <Navigation />
        </NavigationContainer>
      </QueryClientProvider>
    </Authenticator.Provider>
  );
};

export default withAuthenticator(App);
