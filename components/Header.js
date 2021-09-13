import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';

const Header = () => {
  // Extraer el usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      {/* eslint-disable-next-line @next/next/link-passhref */}
      <Link href='/'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src='logo.svg' alt='Logo' className='w-64 mb-8 md:mb-0' />
      </Link>
      <div>
        {usuario ? (
          <div className='flex items-center'>
            <p className='mr-2'>Hola {usuario.nombre}</p>
            <button
              type='button'
              className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'
              onClick={() => cerrarSesion()}>
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <Link href='/login'>
              <a className='bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2'>
                Iniciar Sesión
              </a>
            </Link>
            <Link href='/crearcuenta'>
              <a className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'>
                Crear Cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
