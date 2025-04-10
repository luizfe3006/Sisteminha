export const STATUS = {
    ATIVO: {
        nome: 'Ativo',
        id: 1,
        severity: 'success',
    },
    BLOQUEADO: {
        nome: 'Bloqueado',
        id: 2,
        severity: 'danger',
    },
};

export const STATUS_OPTIONS = Object.values(STATUS).map(({ nome, id }) => ({ nome, id }));

export const getStatus = (id) => {
    for (const key in STATUS) {
        if (STATUS[key].id === id) {
            return STATUS[key];
        }
    }
    return null;  // Retorna null se não encontrar nenhum status com o código correspondente
};