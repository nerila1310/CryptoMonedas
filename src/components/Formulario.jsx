import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';


import useMoneda from '../hooks/useMoneda';
import useCryptomoneda from '../hooks/useCryptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;

    }
`;

const Formulario = () => {

    //state de criptomonedas
    const [listaCrypto, guardarCryptos] = useState([]);

    const MONEDAS = [
        {codigo:'USD', nombre:'Dolar de Estados Unidos'},
        {codigo:'MXN', nombre:'Peso Mexicano'},
        {codigo:'EUR', nombre:'Euro'},
        {codigo:'GBP', nombre:'Libra Esterlina'}
    ]

    //utilizando useMoneda
    const [moneda, SelectMoneda] = useMoneda("Elige tu moneda",'', MONEDAS);

    //utilizar useCryptoMoneda
    const [cryptomoneda, SelectCrypto] = useCryptomoneda('Elige tu Cryptomoneda', '', listaCrypto)

    // ejecutar llamado a la API
    useEffect( () => {
        const consultarAPI = async () => {
            const API = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(API);

            guardarCryptos(resultado.data.Data);
        }
        consultarAPI();
    })

    return (  
        <form>
            <SelectMoneda />
            <SelectCrypto />
            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
    );
}
 
export default Formulario;