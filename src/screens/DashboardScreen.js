import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../contexts/AppContext";
import UserCard from "../components/UserCard";

const DashboardScreen = () => {
  const { users, favorites, toggleFavorite } = useContext(AppContext);

  const renderItem = ({ item }) => (
    <UserCard
      user={item}
      isFavorite={favorites.includes(item.id)}
      onToggleFavorite={toggleFavorite}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default DashboardScreen;
