import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

const FAVORITES_KEY = "FAVORITE_USERS";

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY)
      .then((fav) => {
        if (fav) setFavorites(JSON.parse(fav));
      })
      .catch(() => {});
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
    <AppContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
};
