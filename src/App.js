import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Places from './components/screens/Places';
import Place from './components/screens/Place';
import NotFound from './components/screens/NotFound';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import React, { useState, useEffect } from "react";
import PrivateRoute from './components/PrivateRoute';

export const UserContext = React.createContext()

function App(props) {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const updateUserData = (action) => {
    switch (action.type) {
      case "LOGOUT":
        setUserData(null);
        localStorage.clear()
        break;
      case "LOGIN":
        setUserData(action.payload);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user_data")));
    setLoading(false);
  }, []);
  
  return loading ? (
    <h1>Loading.....</h1>
  ) : (
    <div>
      <UserContext.Provider value={{userData, updateUserData}}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Places />} />
            <Route path="/auth/login/" exact element={<Login />} />
            <Route path="/auth/create/" exact element={<Signup />} />
            <Route path="/place/:id" exact element={<Place />} />
            <Route element={<NotFound />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
