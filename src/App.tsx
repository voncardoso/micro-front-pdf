import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InvestimentosPerYear } from './modules/InvestimentPerYear';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/app-vite/investimentPerYear"
          element={<InvestimentosPerYear />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
