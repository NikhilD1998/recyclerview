import React, { useContext, useRef, useState, useEffect } from "react";
import { View, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../contexts/AppContext";
import UserCard from "../components/UserCard";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";

const { width } = Dimensions.get("window");

const DashboardScreen = () => {
  const { users, favorites, toggleFavorite, fetchUsers } =
    useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const dataProvider = useRef(
    new DataProvider((r1, r2) => r1.id !== r2.id)
  ).current;

  const layoutProvider = useRef(
    new LayoutProvider(
      () => "USER_ROW",
      (type, dim) => {
        switch (type) {
          case "USER_ROW":
          default:
            dim.width = width - 32; // Padding
            dim.height = 80 + 16; // Row height + marginBottom
            break;
        }
      }
    )
  ).current;

  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers();
      setLoading(false);
    };
    loadUsers();
  }, []);

  const rowRenderer = (type, item) => (
    <View style={{ marginBottom: 16 }}>
      <UserCard
        user={item}
        isFavorite={favorites.includes(item.id)}
        onToggleFavorite={toggleFavorite}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        ) : (
          <RecyclerListView
            style={{ flex: 1 }}
            layoutProvider={layoutProvider}
            dataProvider={dataProvider.cloneWithRows(users)}
            rowRenderer={rowRenderer}
            key={favorites.join(",")}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DashboardScreen;
