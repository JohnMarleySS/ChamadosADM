import {useState} from 'react'
import { Link } from 'react-router-dom'
import './signin.css'

function SingIn() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handSubmit(e){
    e.preventDefault();
    alert('clicou')
  }

  return (
    <div className='container-center'>
      <div className='login'>
      <div className='login-area'>

      </div>
      <form onSubmit={handSubmit}>
        <input type="text" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button type="submit">Acessar</button>
      </form>

        <Link to="/register">Criar uma conta</Link>
      </div>

    </div>
  );
}

export default SingIn;
