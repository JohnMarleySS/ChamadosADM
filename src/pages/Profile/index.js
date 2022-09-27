
import { useState, useContext } from 'react'
import Header from '../../Components/Header';
import Title from '../../Components/Title';
import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from '../../assets/avatar.png'
import './profile.css';

import { AuthContext } from '../../contexts/auth';

export default function Profile() {

    const { user } = useContext(AuthContext);
    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)

    return (
        <div>
            <Header />

            <div className='content'>
                <Title nome="Meu perfil">
                    <FiSettings color='#000' size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile'>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#fff' size={25} />
                            </span>
                            <input type="file" accept="image/*" /><br />

                            {avatarUrl === null ?
                                <img src={avatar} width="280px" height="280px" alt="Foto de perfil do usuario" />
                                :
                                <img src={avatarUrl} width="280px" height="280px" alt="Foto de perfil do usuario" />
                            }
                        </label>
                        
                        <label>Nome:</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>Email:</label>
                        <input type="text" value={email} disabled={true} onChange={(e) => setEmail(e.target.value)} />

                        <button type='submit'>Salvar</button>

                        <div className='container'>
                            <button className='logout-btn'>Sair</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}