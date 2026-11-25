import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";

import {
  Link as LinkIcon,
  FileText,
  Star,
  Archive,
  ArchiveRestore,
  Trash2,
  Pencil,
  ExternalLink,
} from "lucide-react-native";

export default function ItemCard({
  item,
  onFavorite,
  onArchive,
  onDelete,
  onEdit,
}) {
  const safeUrl = /^https?:\/\//i.test(item.url || "")
    ? item.url
    : null;

  async function openLink() {
    try {
      if (safeUrl) {
        await Linking.openURL(safeUrl);
      }
    } catch {
      Alert.alert("Error", "Unable to open link");
    }
  }

  return (
    <View style={styles.card}>

      {/* Card Header */}
      <View style={styles.cardTop}>
        <View style={styles.itemIcon}>
          {item.url ? (
            <LinkIcon color="#818cf8" size={24} />
          ) : (
            <FileText color="#818cf8" size={24} />
          )}
        </View>

        <TouchableOpacity
          onPress={() => onFavorite(item.id)}
        >
          <Star
            size={24}
            color={item.isFavorite ? "#facc15" : "#999"}
            fill={item.isFavorite ? "#facc15" : "none"}
          />
        </TouchableOpacity>
      </View>

      {/* Item Information */}
      <Text style={styles.title}>
        {item.title}
      </Text>

      <Text style={styles.category}>
        {item.category}
      </Text>

      {safeUrl && (
        <TouchableOpacity onPress={openLink}>
          <Text style={styles.url} numberOfLines={2}>
            {item.url}
          </Text>
        </TouchableOpacity>
      )}

      {!!item.notes && (
        <Text style={styles.notes}>
          {item.notes}
        </Text>
      )}

      {/* Action Buttons */}
      <View style={styles.actions}>

        {safeUrl && (
          <TouchableOpacity onPress={openLink}>
            <ExternalLink color="#999" size={21} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => onEdit(item)}
        >
          <Pencil color="#818cf8" size={21} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onArchive(item.id)}
        >
          {item.isArchived ? (
            <ArchiveRestore color="#999" size={21} />
          ) : (
            <Archive color="#999" size={21} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(item.id)}
        >
          <Trash2 color="#ef4444" size={21} />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#161616",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  itemIcon: {
    backgroundColor: "#25233f",
    padding: 12,
    borderRadius: 10,
  },

  title: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
  },

  category: {
    color: "#818cf8",
    fontSize: 13,
    marginBottom: 10,
  },

  url: {
    color: "#60a5fa",
    fontSize: 14,
    marginBottom: 10,
  },

  notes: {
    color: "#aaa",
    fontSize: 14,
    lineHeight: 21,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingTop: 15,
    marginTop: 18,
  },
});