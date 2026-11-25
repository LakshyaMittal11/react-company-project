import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const categories = [
  "All",
  "Read Later",
  "Work",
  "Personal",
  "Idea",
];

export default function CategoryFilter({
  category,
  setCategory,
}) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setCategory(item)}
            style={[
              styles.button,
              category === item && styles.activeButton,
            ]}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },

  list: {
    gap: 8,
  },

  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 20,
  },

  activeButton: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },

  text: {
    color: "#fff",
    fontSize: 13,
  },
});