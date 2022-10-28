import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux'
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Profile from './components/profile/Profile'
import Project from './components/project/Project'
import { Component } from 'react';
import Seeker from './components/profile/seeker/Seeker';


function App() {

  const userState = useSelector(state => state.user);

  // console.log(userState.session=='');

  const ensureAuth = (route,Component) => {
    return ( userState.session=='' ? (<Route component={props => <Redirect to='/' {...props}  />} exact path={route} />) 
    : (<Route component={props => (route==='*') ? (<Redirect to='/'/>) : (<Component {...props} />)} exact path={route} />))
  }

  // const route = (route,component) => {
  //   return (<Route exact path={route}>
  //     {component}
  //   </Route>)
  // }

  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Switch>
        {/* {route('/',Home)}
        {route('/login',Login)}
        {route('/register',Register)} */}
        <Route component={props => <Home {...props}/>} exact path='/'/>
        <Route component={props => <Login {...props}/>} exact path='/login'/>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/project/:id'>
          <Project />
        </Route>
        {ensureAuth('/profile',Profile)}
        {ensureAuth('*',Home)}
        
      </Switch>
    </div>
    </Router>
  );
}

export default App;
