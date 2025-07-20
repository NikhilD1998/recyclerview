import { AppContext, AppProvider } from "./src/contexts/AppContext";
import RootNavigation from "./src/navigations/RootNavigation";

export default function App() {
  return (
    <>
      <AppProvider>
        <RootNavigation />
      </AppProvider>
    </>
  );
}
