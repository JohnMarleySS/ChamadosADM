import Header from "../../Components/Header";
import { useContext } from "react";
import { AuthContext } from '../../contexts/auth';


export default function Dashboard(){

    const {signOut} = useContext(AuthContext);

    return(
        <div>
            <Header />
            <h1>Sexo</h1>
            <button onClick={() => signOut()}>Deslogar</button>
        </div>
    );
}