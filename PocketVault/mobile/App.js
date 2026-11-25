import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { House, Star, Archive } from "lucide-react-native";

import Home from "./src/screens/Home";
import Favorites from "./src/screens/Favorites";
import Archived from "./src/screens/Archived";
import AddItem from "./src/screens/AddItem";
import EditItem from "./src/screens/EditItem";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#161616",
          borderTopColor: "#333",
        },
        tabBarActiveTintColor: "#818cf8",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tab.Screen
        name="All Items"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <House color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Star color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Archived"
        component={Archived}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Archive color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#101010",
          },
          headerTintColor: "#fff",
          contentStyle: {
            backgroundColor: "#101010",
          },
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddItem"
          component={AddItem}
          options={{ title: "Add Item" }}
        />

        <Stack.Screen
          name="EditItem"
          component={EditItem}
          options={{ title: "Edit Item" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}