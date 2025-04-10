export const useIntegracaoRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();

    const getEnderecoByCep = async (cep: String) => {
        try {
            const response = await $fetch(`integracoes/buscaCep/${cep}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e);
            return;
        }
    };

    const getDadosByCNPJ = async (cnpj: String) => {
        try {
            const response = await $fetch(`integracoes/buscaCnpj/${cnpj}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e);
            return;
        }
    };

    return {
        getEnderecoByCep,
        getDadosByCNPJ,
    };
};