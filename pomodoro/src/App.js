import Home from './Home'
import Pomo from './Pomo'
import Navbar from './Navbar'
import NotFound from './NotFound'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/session">
        <Pomo />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
    </div>
    </Router>
  );
}

export default App;
