import ToggleTheme from "./components/ToggleTheme/ToggleTheme";
import useColorMode from "./hooks/useTheme";

function App() {
  useColorMode();
  return (
    <div className="h-screen w-screen bg-primary">
      <div className="fixed bottom-2 right-2">
        <ToggleTheme />
      </div>

      <div className="text-2xl">Starting</div>
    </div>
  );
}

export default App;
