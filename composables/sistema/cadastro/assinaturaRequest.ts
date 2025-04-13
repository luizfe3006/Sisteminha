import { PAGE_PEDIDOS } from '~/utils/constants/pages.js';
import { formatCalendarAsDate } from '~/utils/functions/formatData';

//@todo alterar permissão para ver as assinaturas
//WIP - Esperando backEnd
export const useAssinaturaRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();

    const getAll = async (params: any) => {
        try {
            const response = await $fetch('cadastro-geral/assinaturas/buscar', {
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
            const response = await $fetch(`cadastro-geral/assinaturas/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PEDIDOS.path);
            return;
        }
    };

    const post = async (data: any) => {
        try {
            const response = await $fetch('cadastro-geral/assinaturas', {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
                method: 'POST',
                body: JSON.stringify(formatData(data)),
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PEDIDOS.path + '/cadastrar');
            return;
        }
    };
    
    const put = async (id: number, data: any) => {
        try {
            const response = await $fetch(`cadastro-geral/assinaturas/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
                method: 'PUT',
                body: JSON.stringify(formatData(data)),
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PEDIDOS.path + '/' + id);
            return;
        }
    };

    const destroy = async (id: number) => {
        try {
            const response = await $fetch(`cadastro-geral/assinaturas/${id}`, {
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
            request.errorRequest(e, PAGE_PEDIDOS.path);
            return;
        }
    };

    const getOptions = async () => {
        try {
            const response = await $fetch('cadastro-geral/assinaturas/options', {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PEDIDOS.path);
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
    };
};

const formatData = (data: any) => {
    data.data_pedido = data.data_pedido ? formatCalendarAsDate(data.data_pedido) : null;
    return data;
};