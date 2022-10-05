import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

function SignUp() {

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handSubmit(e) {
    e.preventDefault();

    if (nome !== '' && email !== '' && senha !== '') {
      signUp(email, senha, nome)
    }

  }

  return (


    <ContainerSignUp>
      <Register>
        <RegisterArea></RegisterArea>
        <Form onSubmit={handSubmit}>
          <InputText1 type="text" placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)} />
          <InputText2 type="text" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputText3 type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
          <ButtonRegister type="submit"> {loadingAuth ? 'Registrando...' : 'Registrar'} </ButtonRegister>
        </Form>

        <Link to="/">Já possuo uma conta</Link>
      </Register>

    </ContainerSignUp>
  );
}

export default SignUp;

const ContainerSignUp = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #121212;
`;

const Register = styled.div `
    background-color: #eaeaec;
    width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    a {
    margin-top: 0.5em;
    margin-bottom: 1.2em;
    font-size: 14px;
    color: #000;
    padding: 10px;
    cursor: pointer;
}
`;

const RegisterArea = styled.div `
    display: flex;
    justify-content: center;
    background-color: #181c2e;
    width: 100%;
    height: 130px;
`;

const Form = styled.form `
    margin-top: 4.5em;
    width: 90%;
    display: flex;
    flex-direction: column;
`;

const InputText1 = styled.input `
    height: 50px;
    border: 0;
    border-radius: 7px;
    padding: 10px;
    font-size: 16px;
    background-color: #fff;
    text-indent: 10px;
    margin-bottom: 15px;
`;
const InputText2 = styled.input `
    height: 50px;
    border: 0;
    border-radius: 7px;
    padding: 10px;
    font-size: 16px;
    background-color: #fff;
    text-indent: 10px;
    margin-bottom: 15px;
`;
const InputText3 = styled.input `
    height: 50px;
    border: 0;
    border-radius: 7px;
    padding: 10px;
    font-size: 16px;
    background-color: #fff;
    text-indent: 10px;
`;

const ButtonRegister = styled.button `
    margin-top: 3.0em;
    height: 35px;
    border: 0;
    border-radius: 7px;

    height: 50px;
    font-size: 1.3em;
    color: #fff;
    background-color: #181c2e;
`;
