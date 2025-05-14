import React from 'react'
import BookCard from '../components/BookCard';
import { useEffect, useState } from 'react';

const Home = () => {

  useEffect( () => {
    const fetchData = async () => {
      try{
        const Data = fetch(`${import.meta.env.VITE_API_VITE}/bookhub/books`,
          {
            method: 'GET',
            headers: 'application/json'
          }
        )
      }catch(error){
        console.error('error obteniendo los libros: ' , error);
      }
    }
  }, [])

  return (
    <div>
      <div>Header</div>
      <div className='unlogged-content flex'>
        <div>
          <h1>BOOKHUB</h1>
          <p>Lee, descarga y disfruta.</p>
          <button>Regístrate</button>
        </div>
        <div className='book-image-container'>
          <img src="" alt="" />
        </div>
        <div className='catalog'>
          <h2>Catálogo</h2>
          <div className='filters flex'>
            <h2>*Filtros*</h2>
            {

            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home