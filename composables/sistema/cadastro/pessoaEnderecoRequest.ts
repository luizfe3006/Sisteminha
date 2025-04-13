import { PAGE_PESSOAS_ENDERECOS } from '~/utils/constants/pages.js';

export const usePessoaEnderecoRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();

    const getAll = async (id: number, params: any) => {
        try {
            const response = await $fetch(`cadastro/pessoas/${id}/enderecos/buscar`, {
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

    const get = async (idPessoa: number, id: number) => {
        try {
            const response = await $fetch(`cadastro/pessoas/${idPessoa}/enderecos/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PESSOAS_ENDERECOS.path + '/' + idPessoa);
            return;
        }
    };

    const post = async (idPessoa:number, data: any) => {
        try {
            const response = await $fetch(`cadastro/pessoas/${idPessoa}/enderecos`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
                method: 'POST',
                body: JSON.stringify(data),
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PESSOAS_ENDERECOS.path + '/' + idPessoa);
            return;
        }
    };
    
    const put = async (idPessoa: number, id: number, data: any) => {
        try {
            const response = await $fetch(`cadastro/pessoas/${idPessoa}/enderecos/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
                method: 'PUT',
                body: JSON.stringify(data),
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PESSOAS_ENDERECOS.path + '/' + id);
            return;
        }
    };

    const destroy = async (idPessoa: number, id: number) => {
        try {
            const response = await $fetch(`cadastro/pessoas/${idPessoa}/enderecos/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
                method: 'DELETE',
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PESSOAS_ENDERECOS.path + '/' + idPessoa);
            return;
        }
    };
    
    return {
        getAll,
        get,
        post,
        put,
        destroy,
    };
};