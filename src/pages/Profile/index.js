
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
                        <label className='label-avatar'></label>
                        <span>
                            <FiUpload color='#fff' size={25} />
                        </span>
                        <input type="file" accept="image/*" /><br />

                        {avatarUrl === null ?
                            <img src={avatar} width="250" height="250" alt="Foto de perfil do usuario" />
                            :
                            <img src={avatarUrl} width="250" height="250" alt="Foto de perfil do usuario" />
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}