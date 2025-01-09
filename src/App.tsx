import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { InvestimentosPerYear } from './modules/InvestimentPerYear';
import { BigPdf } from './modules/Big';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/app-vite/investimentPerYear"
          element={<InvestimentosPerYear />}
        /> */}
        <Route path="/app-vite/big" element={<BigPdf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
