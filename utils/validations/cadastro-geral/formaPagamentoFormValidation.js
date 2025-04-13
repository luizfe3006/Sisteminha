import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { ptForm } from 'yup-locale-pt';
import { STATUS } from '~/utils/constants/common/status.js'; 

yup.setLocale(ptForm);

const schema = yup.object({
    descricao: yup.string().required(),
    status_id: yup.number().required().oneOf(
        Object.values(STATUS).map(status => status.id),
        'Selecione um status válido',
    ),
});

export function useFormaPagamentoFormValidation() {
    const { handleSubmit } = useForm({ validationSchema: schema });
    const { value: descricao, errorMessage: descricaoError } = useField('descricao', schema);
    const { value: status_id, errorMessage: statusIdError } = useField('status_id', schema);

    return {
        descricao,
        status_id,
        descricaoError,
        statusIdError,

        handleSubmit,
    };
}