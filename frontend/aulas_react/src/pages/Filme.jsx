import { Link, useParams } from 'react-router-dom' 

function Filme() {
    const { id } = useParams();

    return(
        <div>
            <h1>Exebindo dados do filme: {id}</h1>
            
            <Link to='/'>Voltar para Principal</Link>
        </div>
    )
}

export default Filme