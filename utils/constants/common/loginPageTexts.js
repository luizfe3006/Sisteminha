export const LoginTypes = {
    DEFAULT: 'default',
    PLANO: 'plano',
    ASSINATURA: 'assinatura',
    PRODUTO: 'produto',
  };
  
  export const LoginTexts = {
    [LoginTypes.DEFAULT]: {
      title: 'Bem vindo!',
      subtitle: 'Informe seu nome para continuar',
    },
    [LoginTypes.PLANO]: {
      title: 'Sua jornada começa aqui!',
      subtitle: 'Faça o login ou crie uma nova conta para prosseguir com a Assinatura do seu plano.',
    },
    [LoginTypes.ASSINATURA]: {
      title: 'Bem vindo ao nosso sistema de Assinaturas!',
      subtitle: 'Faça login para prosseguir com o pagamento da sua assinatura.',
    },
    [LoginTypes.PRODUTO]: {
      title: 'Bem vindo ao nosso sistema!',
      subtitle: 'Faça login para prosseguir com a compra do seu produto.',
    },
  };
  
  /**
   * Retorna os textos da página de login com base no tipo.
   * @param {string} tipo - Tipo da página (LoginTypes.DEFAULT, LoginTypes.PLANO, LoginTypes.ASSINATURA).
   * @returns {Object} - Objeto contendo `title` e `subtitle`.
   */
  export function getLoginTexts(tipo = LoginTypes.DEFAULT) {
    return LoginTexts[tipo] || LoginTexts[LoginTypes.DEFAULT];
  }
  