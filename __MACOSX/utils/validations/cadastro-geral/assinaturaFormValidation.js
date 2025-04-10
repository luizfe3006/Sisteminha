import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { ptForm } from 'yup-locale-pt';
import { formatCalendarAsDate } from '~/utils/functions/formatData';

yup.setLocale(ptForm);

const schema = yup.object({
    assinatura_status_id: yup.number().required(),
    organizacao_id: yup.number().required(),
    plano_id: yup.number().required(),
    data_expiracao: yup
    .date()
    .transform((value, originalValue) => {
        // Usa a função `formatCalendarAsDate` para formatar a data
        if (typeof originalValue === 'string') {
            try {
                return formatCalendarAsDate(originalValue); // Formata e retorna o valor
            } catch {
                return originalValue; // Retorna original em caso de erro
            }
        }
        return originalValue; // Mantém o valor original caso não seja uma string
    })
    .required(),

});

export function useAssinaturaFormValidation() {
    const { handleSubmit } = useForm({ validationSchema: schema });
    const { value: organizacao_id, errorMessage: organizacaoIdError } = useField('organizacao_id', schema);
    const { value: plano_id, errorMessage: planoIdError } = useField('plano_id', schema);
    const { value: assinatura_status_id, errorMessage: assinaturaStatusIdError } = useField('assinatura_status_id', schema);
    const { value: data_expiracao, errorMessage: dataExpiracaoError } = useField('data_expiracao', schema, { validateOnValueUpdate: false });

    return {
        assinatura_status_id,
        organizacao_id,
        plano_id,
        data_expiracao,

        dataExpiracaoError,
        planoIdError,
        organizacaoIdError,
        assinaturaStatusIdError,

        handleSubmit,
    };
}