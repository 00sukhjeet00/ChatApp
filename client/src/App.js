import { BrowserRouter, Route } from 'react-router-dom'
import Form from './Form';
import Chat from './Chat';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Route component={Form} exact path="/" />
        <Route component={Chat} path="/chat"/>
      </div>
      </BrowserRouter>
  );
}

export default App;
