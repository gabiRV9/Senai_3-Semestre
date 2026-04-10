import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Criando o endpoint para listar todos os usuarios
router.get('/transacoes', async(req, res) =>{
    try{
        //cria uma variavel para enviar o comando sql
        const comando = `
                    SELECT
                        t.id_transacao,
                        t.valor,
                        t.descricao,
                        TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                        t.tipo,
                        c.nome AS nome_categoria, 
                        s.nome AS nome_subcategoria
                    FROM transacoes t
                    LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                    LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                        `

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(comando);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
       return res.status(200).json(transacoes.rows);//200 ok
    }catch(error){
        console.error('Erro ao listar transacoes', error.message);
        return res.status(500).json({error: 'Erro ao listar transacoes'})
    }
})

//Endpoint seguro contra sql Injection
router.post('/transacoes', async(req, res) => {
    const {valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria} = req.body;
    try{

        const comando = `INSERT INTO transacoes(valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`
        const valores = [valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria];

        await BD.query(comando, valores)
        console.log(comando,valores);

    return res.status(201).json("transação cadastrada.");
    }catch(error){
        console.error('Erro ao cadastrar transações', error.message);
        return  res.status(500).json({error: 'Erro ao cadastrar transações'})
    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o usuario
router.put('/transacoes/:id_transacao', async(req, res) =>{
    // Id recebido via parametro
    const {id_transacao} = req.params;

    // Dados do usuario recebido via Corpo da página
    const {valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria} = req.body;
    try{
        //Verificar se o usuario existe
        const verificarTransacao = await BD.query(`SELECT * FROM TRANSACOES
            WHERE id_transacao = $1`, [id_transacao])

        if(verificarTransacao.rows.length === 0){
            return res.status(404).json({message: 'Transação não encontrada'})
        }

        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE TRANSACOES SET valor = $1, descricao = $2, data_registro = $3, data_vencimento = $4, data_pagamento = $5, tipo = $6, id_categoria = $7, id_subcategoria = $8 WHERE
        id_transacao = $9`;
        const valores = [valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria, id_transacao];
        await BD.query(comando, valores);

        return res.status(200).json('Transação foi atualizada!');
    }catch(error){
        console.error('Erro ao atualizar transações', error.message);
        return  res.status(500).json({error: 'Erro ao atualizar transações'})
    }
})

router.delete('/transacoes/:id_transacao', async(req, res) =>{
    const {id_transacao} = req.params;
    try{
        //Executa o comando de UPDATE
        const comando = `DELETE TRANSACOES WHERE id_transacao = $1`
        await BD.query(comando, [id_transacao])
        return res.status(200).json({message: "Transação atualizada com sucesso"})
    }catch(error){
        console.error('Erro ao atualizar transação', error.message)
        return res.status(500).json({message: "Erro interno so servidor" + error.message})
    }
})






//tipo de transacao
router.get('/transacoes/tipo/:tipo', async(req, res) =>{
    const {tipo} = req.params
    try{
        //cria uma variavel para enviar o comando sql
        const comando = `
                      SELECT
                        t.id_transacao,
                        t.valor,
                        t.descricao,
                        TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                        t.tipo,
                        c.nome AS nome_categoria, 
                        s.nome AS nome_subcategoria
                    FROM transacoes t
                    LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                    LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                    WHERE t.tipo = $1
                    ORDER BY t.data_registro
                        `

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(comando, [tipo]);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
       return res.status(200++).json(transacoes.rows);//200 ok
    }catch(error){
        console.error('Erro ao listar transacoes', error.message);
        return res.status(500).json({error: 'Erro ao listar transacoes'})
    }
})



router.get('/transacoes/:id_categoria', async(req, res) =>{
    const {id_categoria} = req.params
    try{
        //cria uma variavel para enviar o comando sql
        const comando = `
                      SELECT
                        t.id_transacao,
                        t.valor,
                        t.descricao,
                        TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                        t.tipo,
                        c.nome AS nome_categoria, 
                        s.nome AS nome_subcategoria
                    FROM transacoes t
                    LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                    LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                    WHERE t.id_categoria= $1
                    ORDER BY t.data_registro
                        `

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(comando, [id_categoria]);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
       return res.status(200).json(transacoes.rows);//200 ok
    }catch(error){
        console.error('Erro ao listar transacoes', error.message);
        return res.status(500).json({error: 'Erro ao listar transacoes'})
    }
})


router.get('/transacoes/:id_subcategoria', async(req, res) =>{
    const {id_subcategoria} = req.params
    try{
        //cria uma variavel para enviar o comando sql
        const comando = `
                      SELECT
                        t.id_transacao,
                        t.valor,
                        t.descricao,
                        TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                        t.tipo,
                        c.nome AS nome_categoria, 
                        s.nome AS nome_subcategoria
                    FROM transacoes t
                    LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                    LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                    WHERE t.id_subcategoria= $1
                    ORDER BY t.data_registro
                        `

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(comando, [id_subcategoria]);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
       return res.status(200).json(transacoes.rows);//200 ok
    }catch(error){
        console.error('Erro ao listar transacoes', error.message);
        return res.status(500).json({error: 'Erro ao listar transacoes'})
    }
})






//listar transações por período
router.get('/transacoes/periodo', async(req, res) =>{
    //requisição a partir de uma query
    const {inicio, fim} = req.query;
    try{
        if (!inicio || !fim){
            return res.status(400).json({message: 'Informe as datas de inicio e fim'})
        }

        //cria uma variavel para enviar o comando sql
        const comando = `
                    SELECT
                        t.id_transacao,
                        t.valor,
                        t.descricao,
                        TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                        t.tipo,
                        c.nome AS nome_categoria, 
                        s.nome AS nome_subcategoria
                    FROM transacoes t
                    LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                    LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                    WHERE t.data_registro BETWEEN TO_DATE($1, 'DD/MM/YYYY) AND TO_DATE($2, 'DD/MM/YYYY')
                    ORDER BY t.data_registro DESC`

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(comando);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
       return res.status(200).json(transacoes.rows);//200 ok
    }catch(error){
        console.error('Erro ao listar transacoes', error.message);
        return res.status(500).json({error: 'Erro ao listar transacoes'})
    }
})


export default router