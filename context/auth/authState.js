import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import {
  CERRAR_SESION,
  LIMPIAR_ALERTA,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  REGISTRO_ERROR,
  REGISTRO_EXITOSO,
  USUARIO_AUTENTICADO,
} from '../../types';
import authContext from './authContext';
import AuthReducer from './authReducer';

const AuthState = ({ children }) => {
  // Definir un state inicial
  const initialState = {
    token:
      typeof window !== 'undefined' ? localStorage.getItem('rsn-token') : '',
    autenticado: null,
    usuario: null,
    mensaje: null,
  };
  // Definir el reducer
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Registrar nuevos usuarios
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/api/usuarios', datos);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    }
    // Limpiar la alerta despues de 3 segundos
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  // Autenticar usuarios
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/api/auth', datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
    // Limpiar la alerta despues de 3 segundos
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  // Retornar el usuario autenticado en base a JWT
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('rsn-token');
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get('/api/auth');
      dispatch({
        type: USUARIO_AUTENTICADO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Cerrar la sesión
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        iniciarSesion,
        registrarUsuario,
        usuarioAutenticado,
        cerrarSesion,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
