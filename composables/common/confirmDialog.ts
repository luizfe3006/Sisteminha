import { useConfirm } from "primevue/useconfirm";

export const useConfirmDialog = () => {

    const confirm = useConfirm();

    const deleteConfirm = (
        titulo = 'Confirmação Exclusão',
        mensagem = 'Você tem certeza que deseja deletar este registro ?',
        onAccept: () => void,
    ) => {
        confirm.require({
            message: mensagem,
            header: titulo,
            icon: 'pi pi-info-circle',
            rejectClass: 'p-button-success',
            acceptClass: 'p-button-danger p-button-outlined',
            accept: () => {
                onAccept();
            },
            reject: () => {
                
            },
        });
    };
    return {
        deleteConfirm,
    };
};