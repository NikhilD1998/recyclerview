import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const UserCard = ({ user, isFavorite, onToggleFavorite }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: user.avatar }} style={styles.avatar} />
    <View style={{ flex: 1 }}>
      <Text style={styles.name}>
        {user.first_name} {user.last_name}
      </Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
    <TouchableOpacity onPress={() => onToggleFavorite(user.id)}>
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={28}
        color={isFavorite ? "#e74c3c" : "#bbb"}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  email: {
    color: "#555",
    fontSize: 14,
  },
});

export default UserCard;
