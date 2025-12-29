import React, { useEffect, useState } from "react";
import StoreContext from "./StoreContext";
import { toast } from "react-toastify";

const StoreState = ({ children }) => {

  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("Token");
  if (token) {
    setisAuthenticated(true);
    fetchUser();
  }
}, []);



  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) return;

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/getuser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: token,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        logout();
        return;
      }

      setUser(data);
      setisAuthenticated(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user");
    }
  };

 const login = async() => {
  setisAuthenticated(true);
  fetchUser(); 
};

  const logout = async() => {
    localStorage.removeItem("Token");
    setisAuthenticated(false);
  };

  const fetchProducts = async (endpoint, setState) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}${endpoint}`
        );
  
        const data = await response.json();
        if (!response.ok) {
          setErrors(data.message || "Failed to fetch promos");
          return;
        }
        setState(data.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Something Went Wrong");
      }
    };

  return (
    <StoreContext.Provider
      value={{
        errors,
        setErrors,
        success,
        setSuccess,
        login,
        logout,
        isAuthenticated,
        fetchProducts,
        user
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreState;
