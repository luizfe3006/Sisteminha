export const FATURA_STATUS = {
    PAGO: {
        nome: 'Pago',
        id: 1,
        severity: 'success',
    },
    PENDENTE: {
        nome: 'Pendente',
        id: 2,
        severity: 'secondary',
    },
    CANCELADO: {
        nome: 'Cancelado',
        id: 3,
        severity: 'danger',
    },
    VENCIDO: {
        nome: 'Vencido',
        id: 4,
        severity: 'danger',
    },
};

export const FATURA_STATUS_OPTIONS = Object.values(FATURA_STATUS).map(({ nome, id }) => ({ nome, id }));

export const getFaturaStatus = (id) => {
    for (const key in FATURA_STATUS) {
        if (FATURA_STATUS[key].id === id) {
            return FATURA_STATUS[key];
        }
    }
    return null;  // Retorna null se não encontrar nenhum status com o código correspondente
};