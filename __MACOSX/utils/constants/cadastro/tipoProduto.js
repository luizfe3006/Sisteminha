export const TIPO_PRODUTO = {
    PRODUTO: {
        nome: 'Produto',
        id: 'PRODUTO',
    },
    SERVICO: {
        nome: 'Serviço',
        id: 'SERVICO',
    },
};

export const TIPO_PRODUTO_OPTIONS = Object.values(TIPO_PRODUTO).map(({ nome, id }) => ({ nome, id }));

export const getTipoProduto = (id) => {
    for (const key in TIPO_PRODUTO) {
        if (TIPO_PRODUTO[key].id === id) {
            return TIPO_PRODUTO[key];
        }
    }
    return null;  // Retorna null se não encontrar nenhum status com o código correspondente
};