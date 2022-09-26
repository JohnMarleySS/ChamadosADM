import './title.css'

export default function Title({children, nome}){
    return(
        <div className='title'>
            <span>
                {children}
                <span>{nome}</span>
            </span>
        </div>
    );
}