import { formatCalendarAsDate, formatMaskAsNumber } from '~/utils/functions/formatData.js';

export const useAuthRequest = () => {
    const config = useRuntimeConfig();
    const request = useRequest();
    const token = useCookie('token');

    const login = async (data: any) => {
        try {
            const response: any = await $fetch('login', {
                baseURL: config.public.apiBase,
                headers: { "Content-type": "application/json" },
                method: 'POST',
                body: JSON.stringify(data),
            });
            return response;
        } catch (e) {
            request.errorLoginRequest(e);
            throw e;
        }
    };

    const logout = async () => {
        try {
            const response: any = await $fetch('logout', {
                baseURL: config.public.apiBase,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token.value,
                },
                method: 'POST',
            });
            token.value = null;
            return response;
        } catch (e) {
            request.errorRequest(e);
        }
    };

    const validarSessao = async () => {
        try {
            const response = await $fetch('validar-sessao', {
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

    const recuperarSenha = async (data: any) => {
        try {
            const response: any = await $fetch('recuperar-senha', {
                baseURL: config.public.apiBase,
                headers: { "Content-type": "application/json" },
                method: 'POST',
                body: JSON.stringify(data),
            });
            return response;
        } catch (e) {
            request.errorRequest(e);
        }
    };

    const validarTokenRedefinicao = async (data: any) => {
        try {
            const queryString = new URLSearchParams(data).toString();
            const url = 'validar-token-redefinicao?' + queryString;

            const response = await $fetch(url, {
                baseURL: config.public.apiBase,
                headers: { "Content-type": "application/json" },
                method: 'GET',
            });
            return response;
        } catch (e) {
            request.errorRequest(e);
        }
    };

    const redefinirSenha = async (data: any) => {
        try {
            const response: any = await $fetch('redefinir-senha', {
                baseURL: config.public.apiBase,
                headers: { "Content-type": "application/json" },
                method: 'POST',
                body: JSON.stringify(data),
            });
            return response;
        } catch (e) {
            request.errorRequest(e);
        }
    };

    const gerarSenha = () => {
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const specialChars = '!@#$%&?';
        const length = 8;
      
        const allChars = lowercaseChars + uppercaseChars + numberChars + specialChars;
      
        const getRandomChar = (charset: string) => charset[Math.floor(Math.random() * charset.length)];
        const getRandomItem = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];
      
        const passwordArray = [
            getRandomChar(uppercaseChars),
            getRandomChar(lowercaseChars),
            getRandomChar(numberChars),
            getRandomChar(specialChars),
        ];
        
        while (passwordArray.length < length) {
        passwordArray.push(getRandomItem(allChars.split('')));
        }
    
        passwordArray.sort(() => Math.random() - 0.5);
        return passwordArray.join('');
    };

    const cadastrarNovoUsuario = async (data: any) => {
        try {
            const response: any = await $fetch('cadastrar-usuario', {
                baseURL: config.public.apiBase,
                headers: { "Content-type": "application/json" },
                method: 'POST',
                body: JSON.stringify(formatData(data)),
            });
            return response;
        } catch (e) {
            request.errorRequest(e);
            throw e;
        }
    };

    return {
        login,
        logout,
        validarSessao,
        recuperarSenha,
        validarTokenRedefinicao,
        redefinirSenha,
        gerarSenha,
        cadastrarNovoUsuario,
    };
};

const formatData = (data: any) => {
    data.cpf_cnpj = data.cpf_cnpj ? formatMaskAsNumber(data.cpf_cnpj) : null;
    data.data_nascimento = data.data_nascimento ? formatCalendarAsDate(data.data_nascimento) : null;
    data.data_abertura = data.data_abertura ? formatCalendarAsDate(data.data_abertura) : null;
    return data;
};