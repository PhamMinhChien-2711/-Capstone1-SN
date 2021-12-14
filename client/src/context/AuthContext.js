import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import userApi from "../api/user";
const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user")) || null
    if(user){
      userApi.getUser(user._id).then(res => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      })
    }
    

  },[])

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
