import React from "react";

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#818cf8"
      />

      <Text style={styles.text}>
        Loading items...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#999",
    marginTop: 12,
  },
});