import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";

import { Search } from "lucide-react-native";

export default function SearchBar({ search, setSearch }) {
  return (
    <View style={styles.container}>
      <Search color="#999" size={20} />

      <TextInput
        style={styles.input}
        placeholder="Search items..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161616",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 15,
    gap: 10,
  },

  input: {
    flex: 1,
    color: "#fff",
    paddingVertical: 12,
    fontSize: 15,
  },
});