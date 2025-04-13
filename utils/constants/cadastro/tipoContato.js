export const TIPO_CONTATO = {
    WHATSAPP: {
        nome: 'WhatsApp',
        id: 'WHATSAPP',
    },
    TELEFONE: {
        nome: 'Telefone',
        id: 'TELEFONE',
    },
    EMAIL: {
        nome: 'Email',
        id: 'EMAIL',
    },
    EMAIL_CFC: {
        nome: 'Email CFC',
        id: 'EMAIL_CFC',
    },
};

export const TIPO_CONTATO_OPTIONS = Object.values(TIPO_CONTATO).map(({ nome, id }) => ({ nome, id }));

export const getTipoContato = (id) => {
    for (const key in TIPO_CONTATO) {
        if (TIPO_CONTATO[key].id === id) {
            return TIPO_CONTATO[key];
        }
    }
    return null;  // Retorna null se não encontrar nenhum status com o código correspondente
};