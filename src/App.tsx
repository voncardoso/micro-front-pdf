import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InvestmentsPerYear } from './modules/InvestimentPerYear';
import { Block } from './modules/Block';
import { TotalInvestiment } from './modules/totalInvestiment';
import { CapexObjectiveToWork } from './modules/CapexObjectiveToWork';
import { GeneralInestimentRealized } from './modules/GeneralInvestmentRealized';
import { InvestmentsPerObjectiveToWork } from './modules/InvestimentPerObjectiveToWork';
import { InvestmentsPerMunicipality } from './modules/InvestimentPerMunicipality';
import { InvestmentsWaterVsSewage } from './modules/InvestimentWaterVsSewage';
import { TopicObjectiveToWork } from './modules/TopicObjectiveToWork';
import { CapexMunicipality } from './modules/CapexMunicipality';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/app-vite/investimentPerYear"
          element={<InvestmentsPerYear />}
        />
        <Route path="/app-vite/block" element={<Block />} />
        <Route
          path="/app-vite/totalInvestiment"
          element={<TotalInvestiment />}
        />
        <Route
          path="/app-vite/objectiveToWork/capex"
          element={<CapexObjectiveToWork />}
        />
        <Route
          path="/app-vite/general/investimentRealized"
          element={<GeneralInestimentRealized />}
        />
        <Route
          path="/app-vite/objectiveToWork/investiment"
          element={<InvestmentsPerObjectiveToWork />}
        />
        <Route
          path="/app-vite/municipality/investiment"
          element={<InvestmentsPerMunicipality />}
        />
        <Route
          path="/app-vite/investiment/waterVsSewage"
          element={<InvestmentsWaterVsSewage />}
        />

        <Route
          path="/app-vite/objectiveToWork/topic"
          element={<TopicObjectiveToWork />}
        />

        <Route
          path="/app-vite/investiment/municipality/detail"
          element={<CapexMunicipality />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
