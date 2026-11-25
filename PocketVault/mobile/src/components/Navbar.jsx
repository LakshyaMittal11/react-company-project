import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Wallet, Plus } from "lucide-react-native";

export default function Navbar({ navigation }) {
  return (
    <View style={styles.header}>
      <View style={styles.top}>
        <View style={styles.logo}>
          <Wallet color="#818cf8" size={28} />
          <Text style={styles.title}>PocketVault</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddItem")}
        >
          <Plus color="#fff" size={18} />
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.tagline}>
        Save your links, notes and ideas.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  addButton: {
    backgroundColor: "#4f46e5",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  tagline: {
    color: "#999",
    marginTop: 12,
    fontSize: 14,
  },
});