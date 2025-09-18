import ShapesDrawer from "@/components/Shapes/ShapesDrawer/ShapesDrawer";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen min-w-screen">
        <div className="fixed top-2 right-2 z-50">
          <ModeToggle />
        </div>
        <ShapesDrawer />
      </div>
    </ThemeProvider>
  );
}

export default App;
