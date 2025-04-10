export const TIPO_PESSOA = {
    FISICA: {
        nome: 'Pessoa Física',
        id: 'PF',
    },
    JURIDICA: {
        nome: 'Pessoa Jurídica',
        id: 'PJ',
    },
};

export const TIPO_PESSOA_OPTIONS = Object.values(TIPO_PESSOA).map(({ nome, id }) => ({ nome, id }));