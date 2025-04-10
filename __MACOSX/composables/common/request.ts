export const useRequest = () => {
    const toast = useToastCustom();
    const config = useRuntimeConfig();
    const token = useState('token');

    const errorRequest = (e: any, redirectUrl = '') => {
        try {
            if (e.response.status > 499 && e.response.status <= 599) {
                toast.erroRequest(e);
            } else if (e.response.status == 403) {
                toast.show(Summary.Error, 'Você não tem permissão para acessar este recurso', Severity.Error);
                redirectUrl = redirectUrl || '/';
            } else if (e.response.status == 404) {
                toast.show(Summary.Error, 'Dados não encontrados', Severity.Error);
                redirectUrl = redirectUrl || '/';
            } else if (e.response.status == 401) {
                redirectUrl = '/login';
                toast.show(Summary.Error, 'Você não está autenticado. Faça o login novamente', Severity.Error);
            }else if (e.response.status == 402) {
                redirectUrl = 'https://healthby.ai#planos';
                toast.show(Summary.Error, 'Seu plano expirou, verifique seu pagamento', Severity.Error);
            }else if (e.response.status == 422) {
                handleValidationErrors(e.response._data.errors);
            } else {
                const mensagem = e.response._data.message || e.response.statusText;
                toast.show(Summary.Error, mensagem, Severity.Error);
            }

            if (redirectUrl) {
                setTimeout(() => {
                    navigateTo(redirectUrl, { external: true});
                }, 1000);
            }
        } catch (error) {
            toast.erroRequest(error);
        }
    };

    const errorLoginRequest = (e: any) => {
        try {
            if (e.response.status !== 401) {
                errorRequest(e);
                return;
            }

            const mensagem = e.response._data.message || e.response.statusText;
            toast.show(Summary.Error, mensagem, Severity.Error);
        } catch (error) {
            toast.erroRequest(error);
        }
    };

    const handleValidationErrors = (errors: any) => {
        let mensagem = '';
        for (const field in errors) {
          if (Object.prototype.hasOwnProperty.call(errors, field)) {
                const errorMessages = errors[field].map((error: string) => `- ${error}`).join('\n');
                mensagem += `${errorMessages}\n`;
          }
        }
        toast.show(Summary.Error, mensagem, Severity.Error, 6000);
    };

    return {
        errorRequest,
        errorLoginRequest,
    };
};
