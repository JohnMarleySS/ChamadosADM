import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import './signup.css'

function SignUp() {

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const { signUp } = useContext(AuthContext);

  function handSubmit(e){
    e.preventDefault();

    if(nome !== '' && email !== '' && senha !== ''){
      signUp(email, senha, nome)
    }

  }

  return (
    
    
    <div className='container-center'>
      <div className='register'>
        <div className='register-area'>
        </div>
        <form onSubmit={handSubmit}>
          <input type="text" placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="text" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button type="submit">Register</button>
        </form>

        <Link to="/">Já possuo uma conta</Link>
      </div>

    </div>
  );
}

export default SignUp;
