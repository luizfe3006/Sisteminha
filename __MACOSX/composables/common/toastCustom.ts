import { useToast } from "primevue/usetoast";

export enum Severity {
    Info = "info",
    Success = "success",
    Warn = "warn",
    Error = "error"
}

export enum Summary {
    Info = "Informação",
    Success = "Sucesso",
    Warn = "Atenção",
    Error = "Erro"
}

export const useToastCustom = () => {

    const toast = useToast();
    const defaultLife = 3000;

    const show = (
        summary: string,
        detail: string,
        severity: Severity = Severity.Info, // Use o enum Severity
        life = defaultLife,
    ) => {
        toast.add({
            severity: severity,
            summary: summary,
            detail: detail,
            life: life,
        });
    };

    const erroRequest = (e: any) => {
        console.error(e.message);
        toast.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro interno no servidor', life: 3000 });
    };
    
    return {
        show,
        erroRequest,
    };
};