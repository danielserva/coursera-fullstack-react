import './App.css';
import Main from './components/MainComponent';
import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'; 

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
