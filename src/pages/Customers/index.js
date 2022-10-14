import Title from '../../Components/Title'
import Header from '../../Components/Header'
import { FiUser } from 'react-icons/fi'

import { useState } from 'react';

export default function Customers(){

    const [nomefantasia, setNomefantasia] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')

    function handleAdd(e){
        e.preventDefault();
        alert("Rolona")
    }

    return(
        <div>
            <Header />
            <div className='content'>
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>

                <div className='container' onSubmit={handleAdd}>
                    <form className='form-profile customers'>
                        <label> Nome fantasia:</label>
                        <input type="text" placeholder='Digite seu nome' value={nomefantasia} onChange={(e) => setNomefantasia(e.target.value)}/>

                        <label> CNPJ:</label>
                        <input type="text" placeholder='Digite seu CNPJ' value={cnpj} onChange={(e) => setCnpj(e.target.value)}/>

                        <label> Endereço:</label>
                        <input type="text" placeholder='Digite seu endereço' value={endereco} onChange={(e) => setEndereco(e.target.value)}/>

                        <button type='submit'>
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}