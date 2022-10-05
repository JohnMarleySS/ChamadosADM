import { useState, useContext } from 'react'
import Header from '../../Components/Header';
import Title from '../../Components/Title';
import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from '../../assets/avatar.png'
import firebase from '../../services/firebaseConnection';

import { AuthContext } from '../../contexts/auth';
import styled from 'styled-components';

export default function Profile() {

    const { signOut, user, setUser, storageUser } = useContext(AuthContext);
    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)

    function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            }else{
                alert('Envie uma imagem tipo PNG ou JPEG');
                setImageAvatar(null);
                return null;
            }

        }

        ///console.log(e.target.files[0])
    }

    async function handleUpload(){
        const currentUid = user.uid;
        const uploadTask = await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then( async ()=>{
            console.log('Foto enviada com sucesso')
        })

        await firebase.storage().ref(`images/${currentUid}`)
        .child(imageAvatar.name).getDownloadURL()
        .then( async(url)=> {
            let urlFoto = url;
            console.log(url);
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                avatarUrl: urlFoto,
                nome: nome
            })
            .then(() => {
                let data = {
                    ...user,
                    avatarUrl, urlFoto,
                    nome: nome
                }
                setUser(data)
                storageUser(data)
            })
        })
        uploadTask()

    }

    async function handleSave(e) {
        e.preventDefault()

        if (imageAvatar == null & nome !== '') {
            await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    nome: nome,
                }).then(() => {
                    let data = {
                        ...user,
                        nome: nome
                    };
                    setUser(data);
                    storageUser(data)
                })

                .catch((error) => {
                    console.log(error);
                })
        }
        else if(nome !== '' && imageAvatar !== null){
            handleUpload();
        }

    }
    

    return (
        <div>
            <Header />

            <div className='content'>
                <Title nome="Meu perfil">
                    <FiSettings color='#000' size={25} />
                </Title>

                <Container>
                    <FormProfile onSubmit={handleSave} >
                        <LabelAvatar>
                            <span>
                                <FiUpload color='#fff' size={25} />
                            </span>
                            <input type="file" accept="image/*" onChange={handleFile} /><br />

                            {avatarUrl === null ?
                                <img src={avatar} width="150" height="150" alt="Foto de perfil do usuario" />
                                :
                                <img src={avatarUrl} width="150" height="150" alt="Foto de perfil do usuario" />
                            }
                        </LabelAvatar>
                        <ButtonsProfile>
                            <label>Nome:</label>
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                            <label>Email:</label>
                            <input type="text" value={email} disabled={true} onChange={(e) => setEmail(e.target.value)} />
                            <ButtonsArea>
                                <button className='login-btn' type='submit'>Salvar</button>
                                <button className='logout-btn' onClick={() => signOut()} >Sair</button>
                            </ButtonsArea>
                        </ButtonsProfile>
                    </FormProfile>
                </Container>
            </div>
        </div>
    );
}

const Container = styled.div`
    display: flex;
    background-color: #fff;
    border-radius: 5px;
    padding: 0 1.8em;

`;

const FormProfile = styled.form`
 width: 339px;
 @media (max-width: 339px){
        width: 339px;
 }
    img {
    margin-bottom: 1em;
    border-radius: 50%;
    object-fit: cover;
    }

    label {
    margin-bottom: .5em;
    font-size: 1.1em;
    font-weight: 600;
    font-family: 'Poppins';
}
input{
    margin-bottom: 1em;
    padding: .8em;
    border: 0;
    border-radius: 5px;
    background-color: #EFEFEF;
    max-width: 339px;
    color: #323232;
    font-family: 'Poppins';
}
input:disabled {
    cursor: not-allowed;
}
`;

const LabelAvatar = styled.label`
    margin-top: 30px;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;

    input {
    display: none;
    }
    span {
    z-index: 99;
    position: absolute;
    opacity: 0.7;
    transition: all 0.5s;
    }
    span:hover {
    opacity: 1;
    transform: scale(1.4);
    }
`;

const ButtonsProfile = styled.label`
    display: flex;
    flex-direction: column;
    margin-top: 40px;

    div {
        display: flex;
        justify-content: space-between;
    }

`;

const ButtonsArea = styled.div`

    margin-top: 20px;
    margin-bottom: 30px;

    .login-btn {
        width: 130px;
        height: 35px;
        font-size: 15px;
        border-radius: 8px;
        background-color: #181C2E;
        color: #fff;
        border: 0;

    }
    .logout-btn {
        width: 130px;
        height: 35px;
        font-size: 15px;
        border-radius: 8px;
        background-color: #fff;
        color: #181C2E;
        border: 2px solid #181C2E;

    }
`;