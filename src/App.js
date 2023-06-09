
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { WinghavenProvider } from './context/WinghavenContext';
import { WinghavenApp } from './routes/WinghavenApp';

function App() {
  return (
    <div className="App">
      <WinghavenProvider>
        <WinghavenApp />
      </WinghavenProvider>
     
    </div>
  );
}

export default App;
