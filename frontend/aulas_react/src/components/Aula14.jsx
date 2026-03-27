import { estilos } from "../style/Estilos"
import { Link, useNavigate } from 'react-router-dom'

const Aula14 = () => {
    const navigate = useNavigate();
    return (
        <div style={estilos.cardAula}>
            <h2>Aula 14 - React Router - Navegação em React</h2>
            <h3>Biblioteca que permite criar e gerenciar rotas em React</h3>
            <hr />
            <h3>Navegação com Links do React Router</h3>
            <Link to='/'> Página Principal </Link>
            <br />
            <Link to='/sobre'> Sobre Gabriella </Link>
            <br />
            <Link to='/sesisenai'> Página Inexistente </Link>
            <br />
            <Link to='/inicio'> Inicio </Link>
            <br />
            <Link to='/detalhes'> Detalhes </Link>
            <br />
            <Link to='/contato'> Contato </Link>
            <br />
            <Link to='/filme/homem-aranha'> Filmes </Link>
            <br />
            <h3>Navegação com progamação utilizando o useNavigate</h3>
            <button onClick={() => navigate('/sobre') } >Sobre</button>

            <hr />
            <h3>Rota dinâmica com useParams</h3>
            <button onClick={() => navigate('/perfil/Gabriella') } >Perfil da Gabriella</button>
            <button onClick={() => navigate('/perfil/Clara') } >Perfil da Clara</button>
            <hr />
            <button onClick={() => navigate('/filme/enrolados') } >Filme enrolados</button>
        </div>
    )
}

export default Aula14