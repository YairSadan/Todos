import './App.css';
import { ModeToggle } from './components/mode-toggle';
import { ThemeProvider } from './components/theme-provider';
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <div>hello</div>
    </ThemeProvider>
  );
}

export default App;
