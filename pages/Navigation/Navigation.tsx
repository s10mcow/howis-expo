/* eslint-disable jsx-a11y/accessible-emoji */
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useAuth0 } from "react-native-auth0";
import Camera from "../AddPost/Camera";
import Edit from "../AddPost/Edit";
import Select from "../AddPost/Select";
import MakePost from "../AddPost/MakePost";
import Feed from "../Feed/Feed";
import Home from "../Home/Home";
import Landing from "../Landing/Landing";
import Profile from "../Profile/Profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PostStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Select">
      <Stack.Screen
        options={{
          headerTitle: () => (
            <MaterialIcons name="photo" size={24} color="white" />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
              <MaterialIcons name="arrow-forward" size={24} color="#2979FF" />
            </TouchableOpacity>
          ),
        }}
        name="Select"
        component={Select}
      />
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Select")}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <MaterialIcons name="edit" size={24} color="white" />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("MakePost")}>
              <MaterialIcons name="arrow-forward" size={24} color="#2979FF" />
            </TouchableOpacity>
          ),
        }}
        name="Edit"
        component={Edit}
      />
      <Stack.Screen
        options={{
          headerTitle: "New Post",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Select")}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
        name="MakePost"
        component={MakePost}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
        name="Camera"
        component={Camera}
      />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  const { user } = useAuth0();

  return user ? (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarLabel: () => null,
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Feed") {
            iconName = focused ? "image" : "image-outline";
          } else if (route.name === "New Post") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={30} color="white" />;
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="New Post"
        options={{ headerShown: false }}
        component={PostStack}
      />

      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  ) : (
    <Landing />
  );
};

export default Navigation;
