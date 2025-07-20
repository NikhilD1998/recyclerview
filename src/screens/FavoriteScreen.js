import { useContext, useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../contexts/AppContext";
import UserCard from "../components/UserCard";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";

const { width } = Dimensions.get("window");

const FavoriteScreen = () => {
  const { users, favorites, toggleFavorite } = useContext(AppContext);

  const favoriteUsers = useMemo(() => {
    const filteredUsers = users.filter((user) => favorites.includes(user.id));
    return filteredUsers;
  }, [users, favorites]);

  const dataProvider = useMemo(
    () =>
      new DataProvider((r1, r2) => r1.id !== r2.id).cloneWithRows(
        favoriteUsers
      ),
    [favoriteUsers]
  );

  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        () => "USER_ROW",
        (type, dim) => {
          switch (type) {
            case "USER_ROW":
            default:
              dim.width = width - 32;
              dim.height = 96;
              break;
          }
        }
      ),
    []
  );

  const rowRenderer = (type, item) => (
    <View style={{ paddingBottom: 16 }}>
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
        {favoriteUsers.length === 0 ? (
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
        ) : (
          <RecyclerListView
            style={{ flex: 1 }}
            layoutProvider={layoutProvider}
            dataProvider={dataProvider}
            rowRenderer={rowRenderer}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default FavoriteScreen;
