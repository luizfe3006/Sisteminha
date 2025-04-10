export const useMercadopagoRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();

    const create = async (params: any) => {
        try {
            const response = await $fetch('mercadopago/preapproval', {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
                method: 'POST',
                body: JSON.stringify(params),
            });
            return response;
        } catch (e) {
            request.errorRequest(e);
            return;
        }
    };

    const get = async (id: number) => {
        try {
            const response = await $fetch(`/mercadopago/preapproval/${id}`, {
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
        create,
        get,
    };
};

