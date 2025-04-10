import { PAGE_CUPONS } from '~/utils/constants/pages.js';
import { formatCalendarAsDate } from '~/utils/functions/formatData';

export const useCupomDescontoRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();
    const toast = useToastCustom();

    const getAll = async (params: any) => {
        try {
            const response = await $fetch('cadastro/cupons-desconto/buscar', {
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
            const response = await $fetch(`cadastro/cupons-desconto/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_CUPONS.path);
            return;
        }
    };

    const getByCodigoCupom = async (codigo_cupom: string) => {
        try {
            const response = await $fetch(`cadastro/cupons-desconto/buscarPorCodigo/${codigo_cupom}`, {
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

    const post = async (data: any) => {
        try {
            const response = await $fetch('cadastro/cupons-desconto', {
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
            request.errorRequest(e, PAGE_CUPONS.path + '/cadastrar');
            return;
        }
    };
    
    const put = async (id: number, data: any) => {
        try {
            const response = await $fetch(`cadastro/cupons-desconto/${id}`, {
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
            request.errorRequest(e, PAGE_CUPONS.path + '/' + id);
            return;
        }
    };

    const destroy = async (id: number) => {
        try {
            const response = await $fetch(`cadastro/cupons-desconto/${id}`, {
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
            request.errorRequest(e, PAGE_CUPONS.path);
            return;
        }
    };

    return {
        getAll,
        get,
        getByCodigoCupom,
        post,
        put,
        destroy,
    };
};

const formatData = (data: any) => {
    data.data_validade = data.data_validade ? formatCalendarAsDate(data.data_validade) : null;
    return data;
};