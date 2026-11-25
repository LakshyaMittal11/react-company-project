import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Save } from "lucide-react-native";
import { createItem } from "../services/api";

const categories = [
  "Read Later",
  "Work",
  "Personal",
  "Idea",
];

export default function AddItem({ navigation }) {

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Read Later");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);


  // POST - Create Item
  async function handleSubmit() {

    if (!title.trim()) {
      Alert.alert("Validation Error", "Title is required");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      await createItem({
        title: title.trim(),
        url: url.trim(),
        category,
        notes: notes.trim(),
      });

      navigation.goBack();

    } catch (err) {
      Alert.alert("Error", err.message);

    } finally {
      setLoading(false);
    }
  }


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >

      <Text style={styles.heading}>Add New Item</Text>

      <Text style={styles.description}>
        Save your links, notes and ideas.
      </Text>


      {/* Title */}
      <Text style={styles.label}>Title *</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter item title"
        placeholderTextColor="#777"
        value={title}
        onChangeText={setTitle}
        maxLength={255}
      />


      {/* URL */}
      <Text style={styles.label}>URL (Optional)</Text>

      <TextInput
        style={styles.input}
        placeholder="https://example.com"
        placeholderTextColor="#777"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        keyboardType="url"
      />


      {/* Category */}
      <Text style={styles.label}>Category *</Text>

      <View style={styles.categories}>

        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryButton,
              category === item && styles.activeCategory,
            ]}
            onPress={() => setCategory(item)}
          >
            <Text style={styles.categoryText}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}

      </View>


      {/* Notes */}
      <Text style={styles.label}>Notes (Optional)</Text>

      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Write your notes..."
        placeholderTextColor="#777"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
      />


      {/* Buttons */}
      <View style={styles.actions}>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            Cancel
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.saveButton,
            loading && { opacity: 0.6 },
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >

          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Save color="#fff" size={20} />

              <Text style={styles.buttonText}>
                Save Item
              </Text>
            </>
          )}

        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#101010",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  heading: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

  description: {
    color: "#999",
    fontSize: 14,
    marginBottom: 25,
  },

  label: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#161616",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    padding: 14,
    color: "#fff",
    fontSize: 15,
    marginBottom: 22,
  },

  textarea: {
    minHeight: 130,
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 22,
  },

  categoryButton: {
    borderWidth: 1,
    borderColor: "#333",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },

  activeCategory: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },

  categoryText: {
    color: "#fff",
    fontSize: 14,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 5,
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },

  saveButton: {
    backgroundColor: "#4f46e5",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flex: 2,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

});