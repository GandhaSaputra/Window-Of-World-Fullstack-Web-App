// import { Routes } from "../config/config";
import {useContext, useEffect} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';
import { UserContext } from './config/UserContext/UserContext';

import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Profile from './pages/Profile/Profile';
import Subscribe from './pages/Subscribe/Subscribe';
import NotFound from './pages/NotFound/NotFound';
import DetailBook from './pages/DetailBook/DetailBook';
import ReadBook from './pages/ReadBook/ReadBook';
import AddBook from './pages/AddBook/AddBook';
import CustomerChat from './pages/CustomerChat/CustomerChat';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


import {API, setAuthToken}  from './config/api/api';
import AdminChat from './pages/AdminChat/AdminChat';
import ListBookAdmin from './pages/ListBookAdmin/ListBookAdmin';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  console.log(state)

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      history.push("/");
    } else {
      if (state.user.role === "Admin") {
        history.push("/admin");
      } else if (state.user.role === "Customer") {
        history.push("/home");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [])
  

  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/subscribe" component={Subscribe}/>
      <Route exact path="/detail-book/:id" component={DetailBook}/>
      <Route exact path="/read-book/:id" component={ReadBook}/>
      <Route exact path="/admin" component={Admin}/>
      <Route exact path="/add-book" component={AddBook}/>
      <Route exact path="/admin-chat" component={AdminChat}/>
      <Route exact path="/chat" component={CustomerChat}/>
      <Route exact path="/list-book-admin" component={ListBookAdmin}/>
      <Route exact path="*" component={NotFound}/>
    </Switch>
  );
}

export default App;
