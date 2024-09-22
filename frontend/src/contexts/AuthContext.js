import { createContext, useContext, useState, useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux'


const AuthContext = createContext();


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [currentUser, setCurrentUser] = useState(userInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect( () => {
      setCurrentUser(userInfo);  
  }, []);

  const value = {
    currentUser,
    error,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
