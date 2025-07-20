import { NavigationContainer } from "@react-navigation/native";
import { AppContext, AppProvider } from "./src/contexts/AppContext";
import RootNavigation from "./src/navigations/RootNavigation";

export default function App() {
  return (
    <>
      <AppProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </AppProvider>
    </>
  );
}
