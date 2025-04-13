import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { ptForm } from 'yup-locale-pt';
import { STATUS } from '~/utils/constants/common/status.js'; 

yup.setLocale(ptForm);

const schema = yup.object({
    name: yup.string().required(),
    id: yup.number(),
    email: yup.string().required(),
    password: yup.string().when('id', {
        is: (value) => value == null,
        then: yup.string().required(),
        otherwise: yup.string(),
    }),
    status_id: yup.number().required().oneOf(
        Object.values(STATUS).map(status => status.id),
        'Selecione um status válido',
    ),
});

export function useUsuarioFormValidation() {
    
    const { handleSubmit } = useForm({ validationSchema: schema });
    const { value: id, errorMessage: idError } = useField('id', schema);
    const { value: name, errorMessage: nameError } = useField('name', schema);
    const { value: email, errorMessage: emailError } = useField('email', schema);
    const { value: password, errorMessage: passwordError } = useField('password', schema);
    const { value: status_id, errorMessage: statusIdError } = useField('status_id', schema);

    return {
        id,
        idError,
        name,
        email,
        password,
        status_id,

        nameError,
        emailError,
        passwordError,
        statusIdError,

        handleSubmit,
    };
}
