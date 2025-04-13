import { PAGE_PRODUTOS } from '~/utils/constants/pages.js';

export const useProdutoRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();

    const getAll = async (params: any) => {
        try {
            const response = await $fetch('cadastro/produtos/buscar', {
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
            const response = await $fetch(`cadastro/produtos/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PRODUTOS.path);
            return;
        }
    };

    const post = async (data: any) => {
        try {
            const response = await $fetch('cadastro/produtos', {
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
            request.errorRequest(e, PAGE_PRODUTOS.path + '/cadastrar');
            return;
        }
    };
    
    const put = async (id: number, data: any) => {
        try {
            const response = await $fetch(`cadastro/produtos/${id}`, {
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
            request.errorRequest(e, PAGE_PRODUTOS.path + '/' + id);
            return;
        }
    };

    const destroy = async (id: number) => {
        try {
            const response = await $fetch(`cadastro/produtos/${id}`, {
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
            request.errorRequest(e, PAGE_PRODUTOS.path);
            return;
        }
    };

    const getOptions = async () => {
        try {
            const response = await $fetch('cadastro/produtos/options', {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PRODUTOS.path);
            return;
        }
    };

    const getAllPublic = async (params: any) => {
        try {
            const response = await $fetch('public/cadastro/produtos/buscar', {
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

    const getProdutosPublic = async (id: number) => {
            try {
                const response = await $fetch(`public/cadastro/produtos/${id}`, {
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
        const uploadArquivo = async (data: FormData, id: number) => {
            try {
                const response = await $fetch(`cadastro/produtos/${id}/uploadArquivo`, {
                    baseURL: config.public.apiBase,
                    headers: {
                        "Accept": "application/json",
                        // "Content-type": "application/json",
                        "Authorization": "Bearer " + token.value,
                    },
                    method: 'POST',
                    body: data,
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
        getAllPublic,
        getProdutosPublic,
        uploadArquivo,
    };
};