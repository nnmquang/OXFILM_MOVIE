import './App.css';
import {createBrowserHistory} from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import { CheckoutTemplate } from './templates/CheckoutTemplate/CheckoutTemplate';
import Checkout from './pages/Checkout/Checkout';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from './components/Loading/Loading';

export const history = createBrowserHistory();

function App() {



  return (
    <Router history={history}>
      <Loading/>
      <Switch>
      <HomeTemplate path="/home" exact Component={Home} />
      <HomeTemplate path="/contact" exact Component={Contact} />
      <HomeTemplate path="/news" exact Component={News} />
      <HomeTemplate path="/detail/:id" exact Component={Detail} />
      <Route path="/register" exact Component={Register} />
      <HomeTemplate path="/" exact Component={Home} />
      <CheckoutTemplate path="/checkout/:id" exact Component={Checkout}/>

      <UserTemplate path="/login" exact Component={Login}/>
      </Switch>

    </Router>
  );
}

export default App;

