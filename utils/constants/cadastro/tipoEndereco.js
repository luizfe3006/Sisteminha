export const TIPO_ENDERECO = {
    COMERCIAL: {
        nome: 'Comercial',
        id: 'COMERCIAL',
    },
    ENTREGA: {
        nome: 'Entrega',
        id: 'ENTREGA',
    },
    FATURAMENTO: {
        nome: 'Faturamento',
        id: 'FATURAMENTO',
    },
    FISCAL: {
        nome: 'Fiscal',
        id: 'FISCAL',
    },
};

export const TIPO_ENDERECO_OPTIONS = Object.values(TIPO_ENDERECO).map(({ nome, id }) => ({ nome, id }));

export const getTipoEndereco = (id) => {
    for (const key in TIPO_ENDERECO) {
        if (TIPO_ENDERECO[key].id === id) {
            return TIPO_ENDERECO[key];
        }
    }
    return null;  // Retorna null se não encontrar nenhum status com o código correspondente
};