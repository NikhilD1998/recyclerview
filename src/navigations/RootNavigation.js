import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteScreen from "../screens/FavoriteScreen";
import DashboardScreen from "../screens/DashboardScreen";

const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DashboardScreen" component={DashboardScreen} />
      <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />
    </Tab.Navigator>
  );
};

export default RootNavigation;
