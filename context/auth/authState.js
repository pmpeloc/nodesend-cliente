import React, { useReducer } from 'react';
import authContext from './authContext';

const AuthState = ({ children }) => {
  const hola = () => {
    console.log('holas');
  };
  return (
    <authContext.Provider value={{ hola }}>{children}</authContext.Provider>
  );
};

export default AuthState;
