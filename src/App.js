import { Routes, Route } from 'react-router-dom'
import { JuanGame, JuriGame, MariaGame, SimeonGame,Home } from './Pages';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/> }/>
        <Route path='/juan' element={<JuanGame/> }/>
        <Route path='/juri' element={<JuriGame/> }/>
        <Route path='/maria' element={<MariaGame/> }/>
        <Route path='/simeon' element={<SimeonGame/> }/>
      </Routes>
    </div>
  );
}

export default App;
