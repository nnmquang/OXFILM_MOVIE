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
import Profile from './pages/Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Films from './pages/Admin/Films/Films';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Films/Edit/Edit';
import Showtime from './pages/Admin/Showtime/Showtime';
import { RegisterTemplate } from './templates/RegisterTemplate/RegisterTemplate';
import AccountTemplates from './templates/AccountTemplates/AccountTemplates';
import Accounts from './pages/Accounts/Accounts';
import AddNewAcc from './pages/Accounts/AddNewAcc/AddNewAcc';
import EditAcc from './pages/Accounts/EditAcc/EditAcc';
import { Buffer } from 'buffer';
global.Buffer = Buffer;
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
      <HomeTemplate path="/profile" exact Component={Profile} />
      <HomeTemplate path="/" exact Component={Home} />
      <CheckoutTemplate path="/checkout/:id" exact Component={Checkout}/>

      <RegisterTemplate path="/register" exact Component={Register} />
      <UserTemplate path="/login" exact Component={Login}/>

      <AdminTemplate path="/admin/films" exact Component={Films} />
      <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
      <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
      <AdminTemplate path="/admin/films/showtime/:id/:tenphim" exact Component={Showtime} />

      <AccountTemplates path="/account/acc" exact Component={Accounts} />
      <AccountTemplates path="/account/acc/addacc" exact Component={AddNewAcc} />
      <AccountTemplates path="/account/acc/editacc/:taiKhoan" exact Component={EditAcc} />

      </Switch>

    </Router>
  );
}

export default App;

