import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});


function AuthProvider({ children }) {

    const [user, setUser] = useState();
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        function loadStorage() {

            const storageUser = localStorage.getItem('SistemaUser')

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false)
            }
            setLoading(false)

        }
        loadStorage();

    }, [])

    async function signIn(email, senha){
        setLoadingAuth(false);

        await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then( async(value)=>{
            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                avatarUrl: userProfile.data().avatarUrl,
                email: value.user.email
            }
            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success("Bem vindo de volta!")

        })
        .catch((error)=>{
            console.log(error)
            setLoadingAuth(false)
            toast.error("Ops... Algo deu errado!")
        })
    }


    async function signUp(email, senha, nome) {
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, senha, nome)
        .then( async(value) => {
            let uid = value.user.uid;

            await firebase.firestore().collection('users')
            .doc(uid).set({
                nome: nome,
                avatarUrl: null
            })
            .then(()=>{
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null

                };
                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success("Bem vindo a plataforma!")
            })


        })
        .catch((error)=>{
            console.log(error)
            setLoadingAuth(false)
            toast.error("Ops... Algo deu errado!")
        })
    }

    function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data))
    }

    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser')
        setUser(null)
    }


    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signUp, signOut, signIn, loadingAuth }}>
            {children}
        </AuthContext.Provider>

    );
}

export default AuthProvider;