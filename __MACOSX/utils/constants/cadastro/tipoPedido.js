export const TIPO_PEDIDO = {
    COMPRA: {
        nome: 'Compra',
        id: 'COMPRA',
    },
    VENDA: {
        nome: 'Venda',
        id: 'VENDA',
    },
};

export const TIPO_PEDIDO_OPTIONS = Object.values(TIPO_PEDIDO).map(({ nome, id }) => ({ nome, id }));

export const getTipoPedido = (id) => {
    for (const key in TIPO_PEDIDO) {
        if (TIPO_PEDIDO[key].id === id) {
            return TIPO_PEDIDO[key];
        }
    }
    return null;  // Retorna null se não encontrar nenhum status com o código correspondente
};