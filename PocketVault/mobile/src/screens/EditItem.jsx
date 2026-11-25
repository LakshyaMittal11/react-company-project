import React, { useState, useEffect } from "react";

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

import {
  getItems,
  updateItem,
} from "../services/api";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const categories = [
  "Read Later",
  "Work",
  "Personal",
  "Idea",
];

export default function EditItem({ navigation, route }) {

  const { itemId } = route.params;

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Read Later");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);


  // GET - Fetch Existing Item
  useEffect(() => {

    let active = true;

    async function loadItem() {
      try {
        setLoading(true);
        setError("");

        const data = await getItems();

        const item = data.find(
          (item) => String(item.id) === String(itemId)
        );

        if (!item) {
          throw new Error("Item not found");
        }

        if (active) {
          setTitle(item.title);
          setUrl(item.url || "");
          setCategory(item.category);
          setNotes(item.notes || "");
        }

      } catch (err) {
        if (active) {
          setError(err.message);
        }

      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadItem();

    return () => {
      active = false;
    };

  }, [itemId, retry]);


  // PATCH - Update Item
  async function handleSubmit() {

    if (!title.trim()) {
      Alert.alert("Validation Error", "Title is required");
      return;
    }

    if (saving) return;

    try {
      setSaving(true);

      await updateItem(itemId, {
        title: title.trim(),
        url: url.trim(),
        category,
        notes: notes.trim(),
      });

      navigation.goBack();

    } catch (err) {
      Alert.alert("Error", err.message);

    } finally {
      setSaving(false);
    }
  }


  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => setRetry((prev) => prev + 1)}
      />
    );
  }


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >

      <Text style={styles.heading}>
        Edit Item
      </Text>

      <Text style={styles.description}>
        Update your saved item.
      </Text>


      {/* Title */}
      <Text style={styles.label}>Title *</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter item title"
        placeholderTextColor="#777"
        maxLength={255}
      />


      {/* URL */}
      <Text style={styles.label}>URL (Optional)</Text>

      <TextInput
        style={styles.input}
        value={url}
        onChangeText={setUrl}
        placeholder="https://example.com"
        placeholderTextColor="#777"
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
        value={notes}
        onChangeText={setNotes}
        placeholder="Write your notes..."
        placeholderTextColor="#777"
        multiline
        numberOfLines={5}
        textAlignVertical="top"
      />


      {/* Buttons */}
      <View style={styles.actions}>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={saving}
        >
          <Text style={styles.buttonText}>
            Cancel
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.saveButton,
            saving && { opacity: 0.6 },
          ]}
          onPress={handleSubmit}
          disabled={saving}
        >

          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Save color="#fff" size={20} />

              <Text style={styles.buttonText}>
                Update Item
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