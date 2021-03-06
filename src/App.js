import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;


function App() {

  const [moneda, guardarMoneda] = useState('');
  const [cryptomoneda, guardarCryptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect( ()=> {
    
    const cotizarCryptomoneda = async () => {
      //evitamos la ejecucion la primera vez
      if(moneda === '') return;
      
      //consultar la API
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;
      
      const resultado = await axios.get(url);

      //mostrar el spinner
      guardarCargando(true);

      //ocultar el spinner
      setTimeout(() => {
        guardarCargando(false);
        
        guardarResultado(resultado.data.DISPLAY[cryptomoneda][moneda]);
      }, 3000);

    }
    cotizarCryptomoneda();

  }, [moneda, cryptomoneda])

  //mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="imagen crypto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCryptomoneda={guardarCryptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
