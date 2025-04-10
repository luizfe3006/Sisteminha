export const TIPO_TRANSACAO = {
    RECEITA: {
        nome: 'Receita',
        id: 'RECEITA',
    },
    DESPESA: {
        nome: 'Despesa',
        id: 'DESPESA',
    },
    TRANSFERENCIA: {
        nome: 'Transferência',
        id: 'TRANSFERENCIA',
    },
};

export const TIPO_TRANSACAO_OPTIONS = Object.values(TIPO_TRANSACAO).map(({ nome, id }) => ({ nome, id }));

export const getTipoTransacao = (id) => {
    for (const key in TIPO_TRANSACAO) {
        if (TIPO_TRANSACAO[key].id === id) {
            return TIPO_TRANSACAO[key];
        }
    }
    return null;  // Retorna null se não encontrar nenhum status com o código correspondente
};