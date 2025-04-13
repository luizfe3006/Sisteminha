import { PAGE_GRUPOS } from '~/utils/constants/pages.js';

export const useGrupoRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();

    const getAll = async (params: any) => {
        try {
            const response = await $fetch('controle-acesso/grupos/buscar', {
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
            const response = await $fetch(`controle-acesso/grupos/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_GRUPOS.path);
            return;
        }
    };

    const post = async (data: any) => {
        try {
            const response = await $fetch('controle-acesso/grupos', {
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
            request.errorRequest(e, PAGE_GRUPOS.path + '/cadastrar');
            return;
        }
    };
    
    const put = async (id: number, data: any) => {
        try {
            const response = await $fetch(`controle-acesso/grupos/${id}`, {
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
            request.errorRequest(e, PAGE_GRUPOS.path + '/' + id);
            return;
        }
    };

    const destroy = async (id: number) => {
        try {
            const response = await $fetch(`controle-acesso/grupos/${id}`, {
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
            request.errorRequest(e, PAGE_GRUPOS.path);
            return;
        }
    };

    const getUsuarios = async (id: number, params: any) => {
        try {
            const response = await $fetch('controle-acesso/grupos/'+id+'/users', {
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
            const response = await $fetch('controle-acesso/grupos/'+id+'/users/'+idUsuario, {
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
            const response = await $fetch('controle-acesso/grupos/'+id+'/users/'+idUsuario, {
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
            const response = await $fetch('controle-acesso/grupos/'+id+'/usersDisponiveis', {
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

    const getPermissoes = async (id: number, params: any) => {
        try {
            const response = await $fetch('controle-acesso/grupos/'+id+'/permissoes', {
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

    const desassociarPermissao = async (id: number, idPermissao: number) => {
        try {
            const response = await $fetch('controle-acesso/grupos/'+id+'/permissoes/'+idPermissao, {
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

    const associarPermissao = async (id: number, idPermissao: number) => {
        try {
            const response = await $fetch('controle-acesso/grupos/'+id+'/permissoes/'+idPermissao, {
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

    const getPermissoesDisponiveis = async (id: number) => {
        try {
            const response = await $fetch('controle-acesso/grupos/'+id+'/permissoesDisponiveis', {
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
        getAll,
        get,
        post,
        put,
        destroy,
        
        getUsuarios,
        desassociarUsuario,
        associarUsuario,
        getUsuariosDisponiveis,

        getPermissoes,
        desassociarPermissao,
        associarPermissao,
        getPermissoesDisponiveis,
    };
};