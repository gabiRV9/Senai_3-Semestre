import { Link } from 'react-router-dom' 

function Inicio() {
    return(
        <div>
            <h1>Bem-vindo</h1>
            {/* <a href='/'> </a> */}
            <Link to='/detalhes'>Voltar para página Detalhes</Link>
        </div>
    )
}

export default Inicio