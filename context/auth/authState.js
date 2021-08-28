import React, { useReducer } from 'react';
import authContext from './authContext';
import AuthReducer from './authReducer';

const AuthState = ({ children }) => {
  // Definir un state inicial
  const initialState = {
    token: '',
    autenticado: null,
    usuario: null,
    mensaje: null,
  };
  // Definir el reducer
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
