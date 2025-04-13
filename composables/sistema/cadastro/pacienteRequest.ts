import { PAGE_PACIENTES } from '~/utils/constants/pages.js';

export const usePacienteRequest = () => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const request = useRequest();

    const getAll = async (params: any) => {
        try {
            const response = await $fetch(`cadastro/pacientes/buscar`, {
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
            const response = await $fetch(`cadastro/pacientes/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PACIENTES.path + '/' + id);
            return;
        }
    };

    const post = async (id:number, data: any) => {
        try {
            const response = await $fetch(`cadastro/pacientes/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
                method: 'POST',
                body: JSON.stringify((data)),
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PACIENTES.path + '/' + id);
            return;
        }
    };
    
    const put = async (id: number, data: any) => {
        try {
            const response = await $fetch(`cadastro/pacientes/${id}`, {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
                method: 'PUT',
                body: JSON.stringify((data)),
            });
            return response;
        } catch (e) {
            request.errorRequest(e, PAGE_PACIENTES.path + '/' + id);
            return;
        }
    };

    const destroy = async (id: number ) => {
        try {
            const response = await $fetch(`cadastro/pacientes/${id}`, {
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
            request.errorRequest(e, PAGE_PACIENTES.path + '/' + id);
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

