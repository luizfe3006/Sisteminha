import { PAGE_USUARIOS } from '~/utils/constants/pages.js';

export const useUserRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();

    const getAll = async (params: any) => {
        try {
            const response = await $fetch('controle-acesso/users/buscar', {
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
            const response = await $fetch(`controle-acesso/users/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_USUARIOS.path);
            return;
        }
    };

    const post = async (data: any) => {
        try {
            const response = await $fetch('controle-acesso/users', {
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
            request.errorRequest(e, PAGE_USUARIOS.path + '/cadastrar');
            return;
        }
    };
    
    const put = async (id: number, data: any) => {
        try {
            const response = await $fetch(`controle-acesso/users/${id}`, {
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
            request.errorRequest(e, PAGE_USUARIOS.path + '/' + id);
            return;
        }
    };

    const destroy = async (id: number) => {
        try {
            const response = await $fetch(`controle-acesso/users/${id}`, {
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
            request.errorRequest(e, PAGE_USUARIOS.path);
            return;
        }
    };

    const retornarPerfilUsuario = async () => {
        try {
            const response = await $fetch('controle-acesso/users/perfil', {
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
            throw e;
        }
    };

    const getGrupos = async (id: number, params: any) => {
        try {
            const response = await $fetch('controle-acesso/users/'+id+'/grupos', {
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

    const desassociarGrupo = async (id: number, idGrupo: number) => {
        try {
            const response = await $fetch('controle-acesso/users/'+id+'/grupos/'+idGrupo, {
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

    const associarGrupo = async (id: number, idGrupo: number) => {
        try {
            const response = await $fetch('controle-acesso/users/'+id+'/grupos/'+idGrupo, {
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

    const getGruposDisponiveis = async (id: number) => {
        try {
            const response = await $fetch('controle-acesso/users/'+id+'/gruposDisponiveis', {
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

    const getOrganizacoes = async (id: number, params: any) => {
        try {
            const response = await $fetch('controle-acesso/users/'+id+'/organizacoes', {
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

    const getOrganizacoesDisponiveis = async (id: number) => {
        try {
            const response = await $fetch('controle-acesso/users/'+id+'/organizacoesDisponiveis', {
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
                const response = await $fetch('controle-acesso/users/options', {
                    baseURL: config.public.apiBase,
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + token.value,
                    },
                });
                return response;
            } catch (e) {
                return;
            }
        };

    return {
        getAll,
        get,
        post,
        put,
        destroy,
        retornarPerfilUsuario,
        getGrupos,
        desassociarGrupo,
        associarGrupo,
        getGruposDisponiveis,
        getOrganizacoes,
        getOrganizacoesDisponiveis,
        getOptions,
    };
};