export const CICLOS = {
    MENSAL: {
      nome: 'Mensal',
      id: 'MENSAL',
    },
    TRIMESTRAL: {
      nome: 'Trimestral',
      id: 'TRIMESTRAL',
    },
    SEMESTRAL: {
      nome: 'Semestral',
      id: 'SEMESTRAL',
    },
    ANUAL: {
      nome: 'Anual',
      id: 'ANUAL',
    },
  };
  
  export const CICLOS_OPTIONS = Object.values(CICLOS).map(({ nome, id }) => ({
    nome,
    id,
  }));
  
  export const getCiclo = (id) => {
    return Object.values(CICLOS).find((ciclo) => ciclo.id === id) || null;
  };
  