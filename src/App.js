import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import TermCondition from './pages/TermCondition';


function App() {
  return (
    <div className="App">
      <Routes>
<Route path='/' element={<Dashboard />} />
<Route path='/termAndCondition' element={<TermCondition />} />
       
      </Routes>
     
    </div>
  );
}

export default App;
