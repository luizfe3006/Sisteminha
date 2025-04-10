const ULTIMO_ATENDIMENTO = {
    NUNCA: {
        nome: 'Nunca',
        id: 'NUNCA',
    },
    PERIODICAMENTE: {
        nome: 'Periodicamente',
        id: 'PERIODICAMENTE',
    },
    CINCO_ANOS: {
        nome: 'Nos últimos 5 anos',
        id: 'CINCO_ANOS',
    },
    RENOVACAO_CNH: {
        nome: 'Na última renovação de CNH',
        id: 'RENOVACAO_CNH',
    },
    NAO_LEMBRO: {
        nome: 'Não lembro',
        id: 'NAO_LEMBRO',
    },
};

const USO_DE_ALCOOL = {
    NUNCA: {
        nome: 'Nunca',
        id: 'NUNCA',
    },
    SOCIALMENTE: {
        nome: 'Socialmente',
        id: 'SOCIALMENTE',
    },
    DIARIAMENTE: {
        nome: 'Diariamente',
        id: 'DIARIAMENTE',
    },
};

const BASIC_SELECTS = {
    0:{
        nome: 'Não',
        id: 0,
    },
    1:{
        nome: 'Sim',
        id: 1,
    },
};

const COCHILAR_OPTIONS = {
    NENHUMA: {
        nome: 'Nenhuma chance de cochilar',
        id: 'NENHUMA',
    },
    PEQUENA:{
        nome: 'Pequena chance de cochilar',
        id: 'PEQUENA',
    },
    MODERADA:{
        nome: 'Moderada chance de cochilar',
        id: 'MODERADA',
    },
    ALTA:{
        nome: 'Alta chance de cochilar',
        id: 'ALTA',
    },
};

export  const SELECTS_OPTIONS = {
    ULTIMO_ATENDIMENTO,
    USO_DE_ALCOOL,
    COCHILAR_OPTIONS,
    BASIC_SELECTS,
};

export const getSelectsOptions = () => {
    return {
        ULTIMO_ATENDIMENTO_OPTIONS: Object.values(ULTIMO_ATENDIMENTO).map(({ nome, id }) => ({ nome, id })),
        USO_DE_ALCOOL_OPTIONS: Object.values(USO_DE_ALCOOL).map(({ nome, id }) => ({ nome, id })),
        COCHILAR_OPTIONS: Object.values(COCHILAR_OPTIONS).map(({ nome, id }) => ({ nome, id })),
        BASIC_SELECTS_OPTIONS: Object.values(BASIC_SELECTS).map(({ nome, id }) => ({ nome, id })),
    };
};

export const getOption = (group, id) => {
    return SELECTS_OPTIONS[group]?.find(option => option.id === id) || null;
};
