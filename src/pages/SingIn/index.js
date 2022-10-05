import styled from 'styled-components';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom';

function SingIn() {

  const { signIn, loadingAuth } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handSubmit(e) {
    e.preventDefault();

    if (email !== '' && senha !== '') {
      signIn(email, senha)
    }

  }

  return (
    <ContainerSignIn>
      <Login>
        <LoginArea>

        </LoginArea>
        <Form onSubmit={handSubmit}>
          <LoginInput1 type="text" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
          <LoginInput2 type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
          <FormButtom type="submit">{loadingAuth ? "Carregando..." : "Acessar"}</FormButtom>
        </Form>

        <Link to="/register">Criar uma conta</Link>
      </Login>

    </ContainerSignIn>
  );
}

export default SingIn;

const ContainerSignIn = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #121212;

`;

const Login = styled.div`
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

const LoginArea = styled.div`
    display: flex;
    justify-content: center;
    background-color: #181c2e;
    width: 100%;
    height: 130px;
`;

const Form = styled.form`
    margin-top: 4.5em;
    width: 90%;
    display: flex;
    flex-direction: column;
`;

const LoginInput1 = styled.input`
    height: 50px;
    border: 0;
    border-radius: 7px;
    padding: 10px;
    font-size: 16px;
    background-color: #fff;
    text-indent: 10px;
    margin-bottom: 15px;
`;
const LoginInput2 = styled.input`
    height: 50px;
    border: 0;
    border-radius: 7px;
    padding: 10px;
    font-size: 16px;
    background-color: #fff;
    text-indent: 10px;
`;

const FormButtom = styled.button`
    margin-top: 3.0em;
    height: 35px;
    border: 0;
    border-radius: 7px;

    height: 50px;
    font-size: 1.3em;
    color: #fff;
    background-color: #181c2e;
`;