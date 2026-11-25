import React, { useState, useCallback } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Archive } from "lucide-react-native";

import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import {
  getItems,
  updateItem,
  deleteItem,
} from "../services/api";

export default function Archived({ navigation }) {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);


  // GET - Fetch Archived Items
  useFocusEffect(
    useCallback(() => {
      let active = true;

      async function fetchArchived() {
        try {
          setLoading(true);
          setError("");

          const data = await getItems();

          if (active) {
            setItems(
              data.filter((item) => item.isArchived)
            );
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

      fetchArchived();

      return () => {
        active = false;
      };

    }, [retry])
  );


  // PATCH - Toggle Favorite
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


  // PATCH - Restore Item
  async function handleRestore(id) {
    try {
      await updateItem(id, {
        isArchived: false,
      });

      setItems((prev) =>
        prev.filter((item) => item.id !== id)
      );

    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }


  // DELETE - Permanently Delete Item
  function handleDelete(id) {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to permanently delete this item?",
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


  return (
    <SafeAreaView style={styles.container}>

      <Navbar navigation={navigation} />

      <View style={styles.heading}>
        <Archive color="#818cf8" size={25} />

        <Text style={styles.title}>
          Archived Items
        </Text>
      </View>

      <Text style={styles.description}>
        View and restore your archived items.
      </Text>


      {loading ? (
        <Loader />

      ) : error ? (
        <ErrorMessage
          message={error}
          onRetry={() => setRetry((prev) => prev + 1)}
        />

      ) : (
        <FlatList
          data={items}

          keyExtractor={(item) => String(item.id)}

          showsVerticalScrollIndicator={false}

          contentContainerStyle={{
            paddingBottom: 20,
          }}

          ListEmptyComponent={
            <View style={styles.emptyContainer}>

              <Archive color="#555" size={50} />

              <Text style={styles.emptyTitle}>
                No archived items
              </Text>

              <Text style={styles.emptyText}>
                Archived items will appear here.
              </Text>

            </View>
          }

          renderItem={({ item }) => (
            <ItemCard
              item={item}
              onFavorite={handleFavorite}
              onArchive={handleRestore}
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

  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  description: {
    color: "#999",
    marginTop: 8,
    marginBottom: 20,
    fontSize: 14,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
    gap: 15,
  },

  emptyTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  emptyText: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
  },

});