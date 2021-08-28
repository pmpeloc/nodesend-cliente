import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      {/* eslint-disable-next-line @next/next/link-passhref */}
      <Link href='/'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src='logo.svg' alt='Logo' className='w-64 mb-8 md:mb-0' />
      </Link>
      <div>
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
      </div>
    </header>
  );
};

export default Header;
