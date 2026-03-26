import { Link } from 'react-router-dom' 

function Detalhes() {
    const botao = <Link to='/contato'></Link>
    return(
        <div>
            <h1>Mais informações</h1>
            {/* <a href='/'> </a> */}
            <button onClick={botao}>contato</button>
        </div>
    )
}

export default Detalhes