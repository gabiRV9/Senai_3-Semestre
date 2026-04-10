const documentacao = {
    openapi: '3.0.3',
    info:{
        title: 'API de Produtos',
        description: 'Documentação da API de gerenciamento financeiro - FinanControl',
        version: '1.0.0'
    },
    servers: [
        {url: 'http://localhost:3000', description: 'localhost'}
    ],
    tags: [
        {name: 'Usuários', description: 'Operações relacionadas aos usuários'},
        {name: 'Categorias', description: 'Operações relacionadas as categorias'},
        {name: 'Subcategorias', description: 'Operações relacionadas as subcategorias'},
        {name: 'Transações', description: 'Operações relacionadas as transações'}
    ],
    paths: {
        "/usuarios": {
            get: {
                tags:["Usuários"],
                summary: "Listar todos os usuários",
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "apllication/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Usuarios'}
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags:['Usuários'],
                summary: 'Cadastrar novo usuário',
                description: "Recebe nome, email, senha, ativo e tipo_acesso para cadastrar novo usuário",
                requestBody: {
                    required: true,
                    content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário cadastrado com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/usuarios/{id_usuario}":{
            put: {
                tags: ['Usuários'],
                summary: 'Atualizar todos os dados do usuário',
                description: 'Atualiza todos os dados de um usuário existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser atualizado",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content:{
                        "application/json":{
                            schema: {$ref: "#/components/schemas/Atualizar_Usuario"},
                            example: {
                                nome: "Ricardo Santos",
                                email:"ricardo5@sesisp.com",
                                senha: "senhaAtualizada",
                                tipo_acesso: "administrador de usuário"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário atualizado com sucesso!"
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json":{
                                example: {message: "Usuário não encontrado"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }

            },
            delete: {
                tags: ['Usuários'],
                summary: 'Remover Usuário',
                description: 'Remove usuário existente pelo ID',
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Usuário removido com sucesso!"
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json":{
                                example: {message: "Usuário não encontrado"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }
            },
            
        },
        "/login": {
                post: {
                tags:['Autenticação'],
                summary: 'Realizar Login',
                description: "Autentica um usuario e retorna id e nome",
                requestBody: {
                    required: true,
                    content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/Login_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Login realizado com sucesso!",
                        content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/Resposta_Login"
                            }
                        }
                    }
                    },
                    400: {description: "Email e senha são obrigatorios"},
                    401: {description: "Credenciais inválidas"},
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/categorias":{
             get: {
                tags:["Categorias"],
                summary: "Listar todas as categorias",
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Categorias'}
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags:['Categorias'],
                summary: 'Cadastrar nova categoria',
                description: "Recebe nome, descricao, cor, icone e tipo para cadastrar nova categoria",
                requestBody: {
                    required: true,
                    content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Categoria"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Categoria cadastrada com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        }, 
        "/categorias/{id_categoria}":{
            put: {
                tags: ['Categorias'],
                summary: 'Atualizar todos os dados da categoria',
                description: 'Atualiza todos os dados de uma categoria existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        description: "ID da categoria a ser atualizada",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content:{
                        "application/json":{
                            schema: {$ref: "#/components/schemas/Atualizar_Categoria"},
                            example: {
                                nome: {type: "string", example: "Saúde"},
                                descricao: {type: "string", example: "produtos de saúde"},
                                cor: {type: "string", example: "#fff"},
                                icone: {type: "string", example: "nomedoIcone"},
                                tipo: {type: "string", example: "E"}
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Categoria atualizada com sucesso!"
                    },
                    404: {
                        description: "Categoria não encontrada",
                        content: {
                            "application/json":{
                                example: {message: "Categoria não encontrada"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }

            },
            delete: {
                tags: ['Categorias'],
                summary: 'Remover Categoria',
                description: 'Remove categoria existente pelo ID',
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        description: "ID da categoria a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Categoria removida com sucesso!"
                    },
                    404: {
                        description: "Categoria não encontrada",
                        content: {
                            "application/json":{
                                example: {message: "Categoria não encontrada"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }
            },
        },
        "/subcategorias":{
             get: {
                tags:["Subcategorias"],
                summary: "Listar todas as subcategorias",
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Subcategorias'}
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags:['Subcategorias'],
                summary: 'Cadastrar nova subcategoria',
                description: "Recebe nome e id_categoria para cadastrar nova subcategoria",
                requestBody: {
                    required: true,
                    content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Subcategoria"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Subcategoria cadastrada com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/subcategorias/{id_subcategoria}":{
            put: {
                tags: ['Subcategorias'],
                summary: 'Atualizar todos os dados da subcategoria',
                description: 'Atualiza todos os dados de uma subcategoria existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_subcategoria",
                        in: "path",
                        required: true,
                        description: "ID da subcategoria a ser atualizada",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content:{
                        "application/json":{
                            schema: {$ref: "#/components/schemas/Atualizar_Subcategoria"},
                            example: {
                                nome: {type: "string", example: "Saúde"},
                                id_categoria: {type: "integer", example: 2}
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Subcategoria atualizada com sucesso!"
                    },
                    404: {
                        description: "Subcategoria não encontrada",
                        content: {
                            "application/json":{
                                example: {message: "Subcategoria não encontrada"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }

            },
            delete: {
                tags: ['Subcategorias'],
                summary: 'Remover Subcategoria',
                description: 'Remove subcategoria existente pelo ID',
                parameters: [
                    {
                        name: "id_subcategoria",
                        in: "path",
                        required: true,
                        description: "ID da subcategoria a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Subcategoria removida com sucesso!"
                    },
                    404: {
                        description: "Subcategoria não encontrada",
                        content: {
                            "application/json":{
                                example: {message: "Subcategoria não encontrada"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }
            },
        },
        "/transacoes":{
             get: {
                tags:["Transações"],
                summary: "Listar todas as transações",
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Transacoes'}
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags:['Transações'],
                summary: 'Cadastrar nova transação',
                description: "Recebe valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, nome_categoria, nome_subcategoria para cadastrar nova transação",
                requestBody: {
                    required: true,
                    content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Transacao"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Transação cadastrada com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/transacoes/tipo/{tipo}":{
             get: {
                tags:["Transações"],
                summary: "Listar todas as transações",
                parameters:[
                    {
                        name: "tipo",
                        in: "path",
                        required: true,
                        description: "tipo transação(e = Entrada / s = Saída)",
                        schema: {type: "string", enum:["e", "s"], example: "s"}
                    }
                ],
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Transacoes'}
                                }
                            }
                        }
                    }
                }
            },
        },
        "/transacoes/{id_categoria}":{
             get: {
                tags:["Transações"],
                summary: "Listar todos os id_categoria",
                parameters:[
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        schema: {type: "string", example: "1"}
                    }
                ],
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Transacoes'}
                                }
                            }
                        }
                    }
                }
            },
        },
        "/transacoes/{id_subcategoria}":{
             get: {
                tags:["Transações"],
                summary: "Listar todos os id_subcategoria",
                parameters:[
                    {
                        name: "id_subcategoria",
                        in: "path",
                        required: true,
                        schema: {type: "string", example: "1"}
                    }
                ],
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Transacoes'}
                                }
                            }
                        }
                    }
                }
            },
        },
        "/transacoes/periodo":{
            get: {
                tags:["Transações"],
                summary: "Listar todas as transações por período",
                parameters:[
                    {
                        name: "inicio",
                        in: "query",
                        required: true,
                        description: "Data de início do período",
                        schema: {type: "string", example: "10/04/2026"}
                    },
                    {
                        name: "fim",
                        in: "query",
                        required: true,
                        description: "Data de fim do período",
                        schema: {type: "string", example: "13/04/2026"}
                    }
                ],
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Transacoes'}
                                }
                            }
                        }
                    }
                }
            },
        },
        "/transacoes/{id_transacao}":{
            put: {
                tags: ['Transações'],
                summary: 'Atualizar todos os dados da transação',
                description: 'Atualiza todos os dados de uma transação existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_transacao",
                        in: "path",
                        required: true,
                        description: "ID da transação a ser atualizado",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content:{
                        "application/json":{
                            schema: {$ref: "#/components/schemas/Atualizar_Transacao"},
                            example: {
                                id_transacao: {type: "integer", example: 1},
                                valor: {type: "number", example: 10},
                                descricao: {type: "string", example: "Consulta médica"},
                                data_registro: {type: "string", example: "09/04/2026"},
                                data_vencimento: {type: "string", example: "20/04/2026"},
                                data_pagamento: {type: "string", example: "12/04/2026"},
                                tipo: {type: "string", example: 'e'},
                                nome_categoria: {type: "string", example: "Saúde"},
                                nome_subcategoria: {type: "string", example: "Consulta médica"}
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Transação atualizada com sucesso!"
                    },
                    404: {
                        description: "Transação não encontrada",
                        content: {
                            "application/json":{
                                example: {message: "Transação não encontrada"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }

            },
            delete: {
                tags: ['Transações'],
                summary: 'Remover Transação',
                description: 'Remove transação existente pelo ID',
                parameters: [
                    {
                        name: "id_transacao",
                        in: "path",
                        required: true,
                        description: "ID da transação a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Transação removida com sucesso!"
                    },
                    404: {
                        description: "Transação não encontrada",
                        content: {
                            "application/json":{
                                example: {message: "Transação não encontrada"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }
            },
        },
    },
    components:{
        schemas:{
            Listar_Usuarios:{
                type: 'object',
                properties: {
                    id_usuario: {type: "integer", example: 1},
                    nome: {type: "string", example: "Ricardo"},
                    email: {type: "string", example: "ricardo@email.com"},
                    tipo_acesso: {type: "string", example: "administrador de usuário"}
                    
                }
            },
            Cadastrar_Usuario: {
                type: 'object',
                properties: {
                    nome: {type: "string", example: "Ricardo"},
                    email: {type: "string", example: "ricardo2@email.com"},
                    senha: {type: "string", example: "Senha123"},
                    tipo_acesso: {type: "string", example: "administrador de usuário"}
                    
                }
            },
            Atualizar_Usuario: {
                type: 'object',
                required: ["nome", "email", "senha"],
                properties: {
                    nome: {type: "string", example: "Nina"},
                    email: {type: "string", example: "nina@email.com"},
                    senha: {type: "string", example: "Senha123"},
                    tipo_acesso: {type: "string", example: "administrador de usuário"}
                    
                }
            },
            Login_Usuario : {
                type: 'object',
                required: true,
                properties: {
                    nome: {type: "string", example: "Ricardo"},
                    email: {type: "string", example: "ricardo2@email.com"},
                    senha: {type: "string", example: "Senha123"},
                    tipo_acesso: {type: "string", example: "administrador de usuário"}
                    
                }
            },
            Reposta_Login : {
                type: 'object',
                properties:{
                message: {type: 'string', example: 'Login realizado com sucesso'},
                usuario: {
                    type: 'object',
                    properties: {
                    id_usuario: {type: "string", example: 1},    
                    nome: {type: "string", example: "Ricardo"},
                    tipo_acesso: {type: "string", example: "administrador de usuário"}
                    
                }
                }    
                }
            },
            Listar_Categorias:{
                type: 'object',
                properties: {
                    id_categoria: {type: "integer", example: 1},
                    nome: {type: "string", example: "Saúde"},
                    descricao: {type: "string", example: "produtos de saúde"},
                    cor: {type: "string", example: "#fff"},
                    icone: {type: "string", example: "nomedoIcone"},
                    tipo: {type: "string", example: "E"}
                }
            },
            Cadastrar_Categoria: {
                type: 'object',
                properties: {
                    nome: {type: "string", example: "Saúde"},
                    descricao: {type: "string", example: "produtos de saúde"},
                    cor: {type: "string", example: "#fff"},
                    icone: {type: "string", example: "nomedoIcone"},
                    tipo: {type: "string", example: "E"}
                }
            },
            Atualizar_Categoria: {
                type: 'object',
                required: ["nome", "descricao", "cor", "icone", "tipo"],
                properties: {
                    nome: {type: "string", example: "Saúde"},
                    descricao: {type: "string", example: "produtos de saúde"},
                    cor: {type: "string", example: "#fff"},
                    icone: {type: "string", example: "nomedoIcone"},
                    tipo: {type: "string", example: "E"}
                    
                }
            },
            Listar_Subcategorias:{
                type: 'object',
                properties: {
                    id_subcategoria: {type: "integer", example: 1},
                    nome: {type: "string", example: "Saúde"},
                    id_categoria: {type: "integer", example: 2}
                }
            },
            Cadastrar_Subcategoria: {
                type: 'object',
                properties: {
                    nome: {type: "string", example: "Saúde"},
                    id_categoria: {type: "integer", example: 2}
                }
            },
            Atualizar_Subcategoria: {
                type: 'object',
                required: ["nome", "id_categoria"],
                properties: {
                    nome: {type: "string", example: "Saúde"},
                    id_categoria: {type: "integer", example: 2}
                }
            },
            Listar_Transacoes: {
                type: 'object',
                properties: {
                    id_transacao: {type: "integer", example: 1},
                    valor: {type: "number", example: 10},
                    descricao: {type: "string", example: "Consulta médica"},
                    data_registro: {type: "string", example: "09/04/2026"},
                    data_vencimento: {type: "string", example: "20/04/2026"},
                    data_pagamento: {type: "string", example: "12/04/2026"},
                    tipo: {type: "string",enum:["E", "S"], example: "E"},
                    nome_categoria: {type: "string", example: "Saúde"},
                    nome_subcategoria: {type: "string", example: "Consulta médica"},
                }
            },
            Cadastrar_Transacao: {
                type: 'object',
                properties: {
                    valor: {type: "number", example: 10},
                    descricao: {type: "string", example: "Consulta médica"},
                    data_registro: {type: "string", example: "09/04/2026"},
                    data_vencimento: {type: "string", example: "20/04/2026"},
                    data_pagamento: {type: "string", example: "12/04/2026"},
                    tipo: {type: "string", example: "e"},
                    id_categoria: {type: "integer", example: 1},
                    id_subcategoria: {type: "integer", example: 1}
                }
            },
            Atualizar_Transacao: {
                type: 'object',
                required: ["valor", "descricao", "data_registro", "data_vencimento", "data_pagamento", "tipo", "id_categoria", "id_subcategoria"],
                properties: {
                    id_transacao: {type: "integer", example: 1},
                    valor: {type: "number", example: 10},
                    descricao: {type: "string", example: "Consulta médica"},
                    data_registro: {type: "string", example: "09/04/2026"},
                    data_vencimento: {type: "string", example: "20/04/2026"},
                    data_pagamento: {type: "string", example: "12/04/2026"},
                    tipo: {type: "string", example: "e"},
                    id_categoria: {type: "integer", example: 2},
                    id_subcategoria: {type: "integer", example: 1},
                }
            }
        }
    }
}
export default documentacao