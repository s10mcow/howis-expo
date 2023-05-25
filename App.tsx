import "react-native-gesture-handler";
import React from "react";
import Navigation from "./pages/Navigation/Navigation";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Amplify } from "aws-amplify";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react-native";
import awsExports from "./src/aws-exports";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Auth } from "aws-amplify";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

const authLink = setContext(async (_, { headers }) => {
  const user = await Auth.currentAuthenticatedUser();
  const token =
    user.getSignInUserSession()?.getAccessToken().getJwtToken() ?? "";
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "https://6vx564r013.execute-api.us-east-2.amazonaws.com",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
  link: ApolloLink.from([authLink, httpLink]),
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Authenticator.Provider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer theme={myTheme}>
            <StatusBar style="light" />
            <Navigation />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Authenticator.Provider>
    </ApolloProvider>
  );
};

export default withAuthenticator(App);
