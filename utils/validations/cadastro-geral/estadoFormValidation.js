import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { ptForm } from 'yup-locale-pt';
import { STATUS } from '~/utils/constants/common/status.js'; 

yup.setLocale(ptForm);

const schema = yup.object({
    nome: yup.string().required(),
    sigla: yup.string().required(),
    status_id: yup.number().required().oneOf(
        Object.values(STATUS).map(status => status.id),
        'Selecione um status válido',
    ),
    pais_id: yup.number().required(),
});

export function useEstadoFormValidation() {

    const { handleSubmit } = useForm({ validationSchema: schema });
    const { value: nome, errorMessage: nomeError } = useField('nome', schema);
    const { value: sigla, errorMessage: siglaError } = useField('sigla', schema);
    const { value: status_id, errorMessage: statusIdError } = useField('status_id', schema);
    const { value: pais_id, errorMessage: paisIdError } = useField('pais_id', schema);

    return {
        nome,
        sigla,
        status_id,
        pais_id,

        nomeError,
        siglaError,
        statusIdError,
        paisIdError,

        handleSubmit,
    };
}
