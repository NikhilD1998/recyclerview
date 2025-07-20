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
      console.log("Fetched users:", data.data);
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY)
      .then((fav) => {
        if (fav) setFavorites(JSON.parse(fav));
      })
      .catch(() => {});
    fetchUsers();
  }, []);

  const toggleFavorite = async (userId) => {
    console.log("Toggling favorite for user:", userId);
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
