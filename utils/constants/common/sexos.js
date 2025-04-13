//@todo Agora é definido por meio de const, mas deve ser feito uma request para o backend e mapeado aqui
export const SEXOS = {
    MASCULINO: {
        nome: 'Masculino',
        id: 'MASCULINO',
    },
    FEMININO: {
        nome: 'Feminino',
        id: 'FEMININO',
    },
};

export const SEXOS_OPTIONS = Object.values(SEXOS).map(({ nome, id }) => ({ nome, id }));

export const getSexo = (id) => {
    return Object.values(SEXOS).find(origem => origem.id === id) || null;
};
