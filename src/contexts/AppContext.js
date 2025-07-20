import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

const FAVORITES_KEY = "FAVORITE_USERS";

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://reqres.in/api/users?page=2");
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY)
      .then((fav) => {
        const parsedFavorites = fav ? JSON.parse(fav) : [];
        setFavorites(parsedFavorites);
        console.log("Favorites loaded from AsyncStorage:", parsedFavorites);
      })
      .catch((error) => console.error("Error loading favorites:", error));
    fetchUsers();
  }, []);

  const toggleFavorite = async (userId) => {
    let updatedFavorites;
    if (favorites.includes(userId)) {
      updatedFavorites = favorites.filter((id) => id !== userId);
    } else {
      updatedFavorites = [...favorites, userId];
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  };

  return (
    <AppContext.Provider
      value={{ users, favorites, toggleFavorite, fetchUsers }}
    >
      {children}
    </AppContext.Provider>
  );
};
