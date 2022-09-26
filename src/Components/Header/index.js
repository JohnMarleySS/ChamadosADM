import './header.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth'
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom';

import { FiHome, FiSettings } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

export default function Header(){

    const { user } = useContext(AuthContext)

    return(
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="avatar" />
            </div>

            <Link to="/dashboard">
                <FiHome color="#fff" size={24}/> Chamados
            </Link>
            <Link to="/customers">
                <AiOutlineUser color="#fff" size={24}/> Clientes
            </Link>
            <Link to="/profile">
                <FiSettings color="#fff" size={24}/> Configurações
            </Link>
        </div>
    )
}