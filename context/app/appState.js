import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import {
  CREAR_ENLACE_ERROR,
  CREAR_ENLACE_EXITO,
  LIMPIAR_ALERTA,
  MOSTRAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
} from '../../types';
import appContext from './appContext';
import AppReducer from './appReducer';

const AppState = ({ children }) => {
  const initialState = {
    mensaje_archivo: null,
    nombre: '',
    nombre_original: '',
    cargando: null,
    descargas: 1,
    password: '',
    autor: null,
    url: '',
  };

  // Crear dispatch y state
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Muestra un Alerta
  const mostrarAlerta = (msg) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg,
    });
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  // Sube los archivos al servidor
  const subirArchivos = async (formData, nombreArchivo) => {
    dispatch({
      type: SUBIR_ARCHIVO,
    });
    try {
      const resultado = await clienteAxios.post('/api/archivos', formData);
      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombre_original: nombreArchivo,
        },
      });
    } catch (error) {
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Crea un enlace una vez que se subió el archivo
  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    };
    try {
      const resultado = await clienteAxios.post('/api/enlaces', data);
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: resultado.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <appContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        subirArchivos,
        mostrarAlerta,
        crearEnlace,
      }}>
      {children}
    </appContext.Provider>
  );
};

export default AppState;
