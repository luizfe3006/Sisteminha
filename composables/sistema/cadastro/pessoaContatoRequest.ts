import { TIPO_CONTATO } from '~/utils/constants/cadastro/tipoContato';
import { PAGE_PESSOAS_CONTATOS } from '~/utils/constants/pages.js';
import { formatMaskAsNumber } from '~/utils/functions/formatData';

export const usePessoaContatoRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();

    const getAll = async (id: number, params: any) => {
        try {
            const response = await $fetch(`cadastro/pessoas/${id}/contatos/buscar`, {
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
            const response = await $fetch(`cadastro/pessoas/${idPessoa}/contatos/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PESSOAS_CONTATOS.path + '/' + idPessoa);
            return;
        }
    };

    const post = async (idPessoa:number, data: any) => {
        try {
            const response = await $fetch(`cadastro/pessoas/${idPessoa}/contatos`, {
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
            request.errorRequest(e, PAGE_PESSOAS_CONTATOS.path + '/' + idPessoa);
            return;
        }
    };
    
    const put = async (idPessoa: number, id: number, data: any) => {
        try {
            const response = await $fetch(`cadastro/pessoas/${idPessoa}/contatos/${id}`, {
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
            request.errorRequest(e, PAGE_PESSOAS_CONTATOS.path + '/' + id);
            return;
        }
    };

    const destroy = async (idPessoa: number, id: number) => {
        try {
            const response = await $fetch(`cadastro/pessoas/${idPessoa}/contatos/${id}`, {
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
            request.errorRequest(e, PAGE_PESSOAS_CONTATOS.path + '/' + idPessoa);
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

const formatData = (data: any) => {
    if (data.tipo_contato === TIPO_CONTATO.TELEFONE.id ||
        data.tipo_contato === TIPO_CONTATO.WHATSAPP.id)
    {
        data.valor = data.valor ? formatMaskAsNumber(data.valor) : null;
    }
    return data;
};