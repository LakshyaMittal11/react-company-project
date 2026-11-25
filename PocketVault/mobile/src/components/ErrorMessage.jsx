import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { CircleAlert } from "lucide-react-native";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <CircleAlert color="#ef4444" size={35} />

      <Text style={styles.message}>
        {message}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onRetry}
      >
        <Text style={styles.buttonText}>
          Try Again
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },

  message: {
    color: "#ef4444",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});