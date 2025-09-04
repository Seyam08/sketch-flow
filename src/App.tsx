import ShapesDrawer from "./components/Shapes/ShapesDrawer/ShapesDrawer";
import ToggleTheme from "./components/ToggleTheme/ToggleTheme";
import useColorMode from "./hooks/useTheme";

function App() {
  useColorMode();

  return (
    <div className="min-h-screen min-w-screen bg-primary ">
      <div className="fixed bottom-2 right-2 z-50">
        <ToggleTheme />
      </div>
      <ShapesDrawer />
    </div>
  );
}

export default App;
