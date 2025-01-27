import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InvestimentosPerYear } from './modules/InvestimentPerYear';
import { Block } from './modules/Block';
import { TotalInvestiment } from './modules/totalInvestiment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/app-vite/investimentPerYear"
          element={<InvestimentosPerYear />}
        />
        <Route path="/app-vite/block" element={<Block />} />
        <Route
          path="/app-vite/totalInvestiment"
          element={<TotalInvestiment />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
