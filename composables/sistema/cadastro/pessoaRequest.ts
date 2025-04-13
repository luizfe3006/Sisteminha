import { PAGE_PESSOAS } from '~/utils/constants/pages.js';
import { formatCalendarAsDate, formatMaskAsNumber } from '~/utils/functions/formatData.js';

export const usePessoaRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();

    const getAll = async (params: any) => {
        try {
            const response = await $fetch('cadastro/pessoas/buscar', {
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
            const response = await $fetch(`cadastro/pessoas/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PESSOAS.path);
            return;
        }
    };

    const post = async (data: any) => {
        try {
            const response = await $fetch('cadastro/pessoas', {
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
            request.errorRequest(e, PAGE_PESSOAS.path + '/cadastrar');
            return;
        }
    };
    
    const put = async (id: number, data: any) => {
        try {
            const response = await $fetch(`cadastro/pessoas/${id}`, {
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
            request.errorRequest(e, PAGE_PESSOAS.path + '/' + id);
            return;
        }
    };

    const destroy = async (id: number) => {
        try {
            const response = await $fetch(`cadastro/pessoas/${id}`, {
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
            request.errorRequest(e, PAGE_PESSOAS.path);
            return;
        }
    };

    const getOptions = async () => {
        try {
            const response = await $fetch('cadastro/pessoas/options', {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PESSOAS.path);
            return;
        }
    };

    const getOptionsProfissionais = async () => {
        try {
            const response = await $fetch('cadastro/pessoas/options-profissionais', {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PESSOAS.path);
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
        getOptionsProfissionais,
    };
};

const formatData = (data: any) => {
    data.cpf_cnpj = data.cpf_cnpj ? formatMaskAsNumber(data.cpf_cnpj) : null;
    data.data_nascimento = data.data_nascimento ? formatCalendarAsDate(data.data_nascimento) : null;
    data.data_abertura = data.data_abertura ? formatCalendarAsDate(data.data_abertura) : null;
    return data;
};