import { createContext, useContext, useEffect, useState } from "react";

// This is the context
const createCont = createContext();

// This is the provider
const UseAuth = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState('');
  const [isLoading, setLoading] = useState(true);

  const authorizedToken = `Bearer ${token}`;

  const storeToken = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Update `isLoggedin` directly from token presence
  const isLoggedin = !!token;

  const LogoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5008/user`, {
        method: 'GET',
        headers: {
          Authorization: authorizedToken,
        },
      });
     
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } 
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <createCont.Provider value={{ isLoggedin, storeToken, LogoutUser, user, authorizedToken, isLoading }}>
      {children}
    </createCont.Provider>
  );
};

// Consumer
const Consumer = () => {
  const context = useContext(createCont);
  if (!context) {
    throw new Error("Its been used outside the provider");
  }
  return context;
};

export { UseAuth, Consumer };
