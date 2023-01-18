import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import DoggyLanding from "./components/DoggyLanding.jsx"
import DoggyHome from "./components/DoggyHome.jsx";
import DoggyDetail from "./components/DoggyDetail.jsx"
import DoggyCreation from './components/DoggyCreation.jsx';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component ={DoggyLanding}/>
        <Route exact path="/home" component ={DoggyHome}/>
        <Route exact path="/details/:id" component ={DoggyDetail}/>
        <Route exact path="/dog" component ={DoggyCreation}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
