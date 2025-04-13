export const STATUS_PEDIDO = {
    PAGO: {
        nome: 'Pago',
        id: 1,
        severity: 'success',
    },
    PENDENTE: {
        nome: 'Pendente',
        id: 2,
        severity: 'warning',
    },
    CANCELADO: {
        nome: 'Cancelado',
        id: 3,
        severity: 'danger',
    },
};

export const STATUS_PEDIDO_OPTIONS = Object.values(STATUS_PEDIDO).map(({ nome, id }) => ({ nome, id }));

export const getStatusPedido = (id) => {
    for (const key in STATUS_PEDIDO) {
        if (STATUS_PEDIDO[key].id === id) {
            return STATUS_PEDIDO[key];
        }
    }
    return null;  // Retorna null se não encontrar nenhum status com o código correspondente
};