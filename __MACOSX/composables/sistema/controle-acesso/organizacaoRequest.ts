import { PAGE_ORGANIZACOES } from '~/utils/constants/pages.js';

export const useOrganizacaoRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();

    const getAll = async (params: any) => {
        try {
            const response = await $fetch('controle-acesso/organizacoes/buscar', {
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
            const response = await $fetch(`controle-acesso/organizacoes/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_ORGANIZACOES.path);
            return;
        }
    };

    const post = async (data: any) => {
        try {
            const response = await $fetch('controle-acesso/organizacoes', {
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
            request.errorRequest(e, PAGE_ORGANIZACOES.path + '/cadastrar');
            return;
        }
    };
    
    const put = async (id: number, data: any) => {
        try {
            const response = await $fetch(`controle-acesso/organizacoes/${id}`, {
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
            request.errorRequest(e, PAGE_ORGANIZACOES.path + '/' + id);
            return;
        }
    };

    const destroy = async (id: number) => {
        try {
            const response = await $fetch(`controle-acesso/organizacoes/${id}`, {
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
            request.errorRequest(e, PAGE_ORGANIZACOES.path);
            return;
        }
    };

    const getUsuarios = async (id: number, params: any) => {
        try {
            const response = await $fetch('controle-acesso/organizacoes/'+id+'/users', {
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

    const desassociarUsuario = async (id: number, idUsuario: number) => {
        try {
            const response = await $fetch('controle-acesso/organizacoes/'+id+'/users/'+idUsuario, {
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
            request.errorRequest(e);
            return;
        }
    };

    const associarUsuario = async (id: number, idUsuario: number) => {
        try {
            const response = await $fetch('controle-acesso/organizacoes/'+id+'/users/'+idUsuario, {
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

    const getUsuariosDisponiveis = async (id: number) => {
        try {
            const response = await $fetch('controle-acesso/organizacoes/'+id+'/usersDisponiveis', {
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
    const getOptions = async () => {
        try {
            const response = await $fetch('controle-acesso/organizacoes/options', {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_ORGANIZACOES.path);
            return;
        }
    };

    return {
        getAll,
        get,
        post,
        put,
        destroy,
        getUsuarios,
        desassociarUsuario,
        associarUsuario,
        getUsuariosDisponiveis,
        getOptions,
    };
};