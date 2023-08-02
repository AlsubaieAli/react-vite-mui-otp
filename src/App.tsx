import { HomePage } from 'pages';
import { MUIProvider } from 'providers';

function App() {
  return (
    <MUIProvider>
      <HomePage />
    </MUIProvider>
  );
}

export default App;
