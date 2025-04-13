import { PAGE_FATURAS } from '~/utils/constants/pages.js';
import { formatCalendarAsDate } from '~/utils/functions/formatData';

export const useFaturaRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();

    const getAll = async (params: any) => {
        try {
            const response = await $fetch('financeiro/faturas/buscar', {
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
            const response = await $fetch(`financeiro/faturas/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_FATURAS.path);
            return;
        }
    };

    const post = async (data: any) => {
        try {
            const response = await $fetch('financeiro/faturas', {
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
            request.errorRequest(e, PAGE_FATURAS.path + '/cadastrar');
            return;
        }
    };
    
    const put = async (id: number, data: any) => {
        try {
            const response = await $fetch(`financeiro/faturas/${id}`, {
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
            request.errorRequest(e, PAGE_FATURAS.path + '/' + id);
            return;
        }
    };

    const destroy = async (id: number) => {
        try {
            const response = await $fetch(`financeiro/faturas/${id}`, {
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
            request.errorRequest(e, PAGE_FATURAS.path);
            return;
        }
    };

    const gerarDocumentoFiscal = async (id: number) => {
        try {
            const response = await $fetch(`financeiro/faturas/${id}/gerar-documento-fiscal`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
                method: 'POST',
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
        gerarDocumentoFiscal,
    };
};

const formatData = (data: any) => {
    data.data_vencimento = data.data_vencimento ? formatCalendarAsDate(data.data_vencimento) : null;
    data.data_pagamento = data.data_pagamento ? formatCalendarAsDate(data.data_pagamento) : null;
    return data;
};