import React, { useContext, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../contexts/AppContext";
import UserCard from "../components/UserCard";

const FavoriteScreen = () => {
  const { users, favorites, toggleFavorite } = useContext(AppContext);

  const favoriteUsers = useMemo(
    () => users.filter((user) => favorites.includes(user.id)),
    [users, favorites]
  );

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
        data={favoriteUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <UserCard
            user={{
              first_name: "No",
              last_name: "Favorites",
              email: "",
              avatar: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
            }}
            isFavorite={false}
            onToggleFavorite={() => {}}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default FavoriteScreen;
