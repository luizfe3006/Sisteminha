import { PAGE_PRODUTOS_CATEGORIAS } from '~/utils/constants/pages.js';

export const useProdutoCategoriaRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();

    const getAll = async (params: any) => {
        try {
            const response = await $fetch('cadastro/produtos-categorias/buscar', {
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
            const response = await $fetch(`cadastro/produtos-categorias/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PRODUTOS_CATEGORIAS.path);
            return;
        }
    };

    const post = async (data: any) => {
        try {
            const response = await $fetch('cadastro/produtos-categorias', {
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
            request.errorRequest(e, PAGE_PRODUTOS_CATEGORIAS.path + '/cadastrar');
            return;
        }
    };
    
    const put = async (id: number, data: any) => {
        try {
            const response = await $fetch(`cadastro/produtos-categorias/${id}`, {
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
            request.errorRequest(e, PAGE_PRODUTOS_CATEGORIAS.path + '/' + id);
            return;
        }
    };

    const destroy = async (id: number) => {
        try {
            const response = await $fetch(`cadastro/produtos-categorias/${id}`, {
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
            request.errorRequest(e, PAGE_PRODUTOS_CATEGORIAS.path);
            return;
        }
    };

    const getOptions = async () => {
        try {
            const response = await $fetch('cadastro/produtos-categorias/options', {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PRODUTOS_CATEGORIAS.path);
            return;
        }
    };

    const getProdutos = async (id: number, params: any) => {
        try {
            const response = await $fetch('cadastro/produtos-categorias/'+id+'/produtos', {
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
    
    return {
        getAll,
        get,
        post,
        put,
        destroy,
        getOptions,
        getProdutos,
    };
};