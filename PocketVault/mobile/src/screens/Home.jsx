import React, {
  useState,
  useCallback,
} from "react";

import {
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// Components
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

// API Functions
import {
  getItems,
  updateItem,
  deleteItem,
} from "../services/api";

export default function Home({ navigation }) {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);


  // GET - Fetch Items
  useFocusEffect(
    useCallback(() => {
      let active = true;

      async function fetchItems() {
        try {
          setLoading(true);
          setError("");

          const data = await getItems();

          if (active) {
            setItems(data);
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

      fetchItems();

      return () => {
        active = false;
      };

    }, [retry])
  );


  // PATCH - Favorite Item
  async function handleFavorite(id) {
    const item = items.find((item) => item.id === id);

    if (!item) return;

    try {
      const isFavorite = !item.isFavorite;

      await updateItem(id, { isFavorite });

      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, isFavorite }
            : item
        )
      );

    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }


  // PATCH - Archive Item
  async function handleArchive(id) {
    try {
      await updateItem(id, {
        isArchived: true,
      });

      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, isArchived: true }
            : item
        )
      );

    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }


  // DELETE - Delete Item
  function handleDelete(id) {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",

          onPress: async () => {
            try {
              await deleteItem(id);

              setItems((prev) =>
                prev.filter((item) => item.id !== id)
              );

            } catch (err) {
              Alert.alert("Error", err.message);
            }
          },
        },
      ]
    );
  }


  // Navigate to Edit Screen
  function handleEdit(item) {
    navigation.navigate("EditItem", {
      itemId: item.id,
    });
  }


  // Retry API
  function handleRetry() {
    setRetry((prev) => prev + 1);
  }


  // Search and Category Filter
  const filteredItems = items.filter((item) => {

    const query = search.trim().toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      (item.notes || "").toLowerCase().includes(query) ||
      (item.url || "").toLowerCase().includes(query);

    const matchesCategory =
      category === "All" ||
      item.category === category;

    return (
      matchesSearch &&
      matchesCategory &&
      !item.isArchived
    );
  });


  return (
    <SafeAreaView style={styles.container}>

      <Navbar navigation={navigation} />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <CategoryFilter
        category={category}
        setCategory={setCategory}
      />

      {loading ? (
        <Loader />

      ) : error ? (
        <ErrorMessage
          message={error}
          onRetry={handleRetry}
        />

      ) : (
        <FlatList
          data={filteredItems}

          keyExtractor={(item) =>
            String(item.id)
          }

          showsVerticalScrollIndicator={false}

          contentContainerStyle={{
            paddingBottom: 20,
          }}

          ListEmptyComponent={
            <Text style={styles.empty}>
              No items found
            </Text>
          }

          renderItem={({ item }) => (
            <ItemCard
              item={item}
              onFavorite={handleFavorite}
              onArchive={handleArchive}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        />
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    paddingHorizontal: 16,
  },

  empty: {
    color: "#999",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});