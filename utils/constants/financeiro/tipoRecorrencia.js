export const TIPO_RECORRENCIA = {
    SEMANA: {
        nome: 'Semanal',
        id: 'SEMANA',
    },
    MES: {
        nome: 'Mensal',
        id: 'MES',
    },
    ANO: {
        nome: 'Anual',
        id: 'ANO',
    },
};

export const TIPO_RECORRENCIA_OPTIONS = Object.values(TIPO_RECORRENCIA).map(({ nome, id }) => ({ nome, id }));

export const getTipoRecorrencia = (id) => {
    for (const key in TIPO_RECORRENCIA) {
        if (TIPO_RECORRENCIA[key].id === id) {
            return TIPO_RECORRENCIA[key];
        }
    }
    return null;  // Retorna null se não encontrar nenhum status com o código correspondente
};