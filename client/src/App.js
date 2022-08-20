import './App.css';

import Main from './routes';
import Scrollable from './components/scrollable';

function App() {
  return (
    <div className="App">
      <Scrollable>
        <Main />
      </Scrollable>
    </div>
  );
}

export default App;
