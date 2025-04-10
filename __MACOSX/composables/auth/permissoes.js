export const usePermissoes = () => {
    const perfilUsuario = JSON.parse(window.localStorage.getItem('perfilUsuario'));

    const isPermitido = (permissao) => {
        try {
            const permissoes = perfilUsuario ? perfilUsuario.permissoes : [];
            return permissoes.includes(permissao); // Add null check
        } catch (e) {
            return false;
        }
    };

    const isPermitidoSalvar = (roles) => {
        try {
            return isPermitido(roles.editar) || isPermitido(roles.criar);
        } catch (e) {
            return false;
        }
    };

    const validarAcessoPagina = (permissoes) => {
        let hasPermissao = false;

        permissoes.forEach(permissao => {
            if (isPermitido(permissao)) {
                hasPermissao = true;
            }
        });

        if (!hasPermissao) {
            navigateTo('/acesso-negado');
        }
    };

    return {
        isPermitido,
        isPermitidoSalvar,
        validarAcessoPagina,
    };
};
