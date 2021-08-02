import React from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCryptomoneda from '../hooks/useCryptomoneda';

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

    const MONEDAS = [
        {codigo:'USD', nombre:'Dolar de Estados Unidos'},
        {codigo:'MXN', nombre:'Peso Mexicano'},
        {codigo:'EUR', nombre:'Euro'},
        {codigo:'GBP', nombre:'Libra Esterlina'}
    ]

    //utilizando useMoneda
    const [moneda, SelectMoneda] = useMoneda("Elige tu moneda",'', MONEDAS);

    //utilizar useCryptoMoneda
    const [cryptomoneda, SelectCrypto] = useCryptomoneda('Elige tu Cryptomoneda', '')

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