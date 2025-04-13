import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { ptForm } from 'yup-locale-pt';
import { STATUS } from '~/utils/constants/common/status.js'; 
import { TIPO_CONTATO } from '~/utils/constants/cadastro/tipoContato';
import { formatMaskAsNumber } from '~/utils/functions/formatData';

yup.setLocale(ptForm);

const schema = yup.object({
    nome: yup.string().required(),
    valor: yup.string().required().test(
        'validarValor',
        'Valor inválido',
        (value, context) => validarValor(value, context),
    ),
    status_id: yup.number().required().oneOf(
        Object.values(STATUS).map(status => status.id),
        'Selecione um status válido',
    ),
    tipo_contato: yup.string().required().oneOf(
        Object.values(TIPO_CONTATO).map(tipo => tipo.id),
        'Selecione um tipo de contato válido',
    ),
});

export function usePessoaContatoFormValidation() {
    
    const { handleSubmit } = useForm({ validationSchema: schema });
    const { value: nome, errorMessage: nomeError } = useField('nome', schema);
    const { value: valor, errorMessage: valorError } = useField('valor', schema);
    const { value: status_id, errorMessage: statusIdError } = useField('status_id', schema);
    const { value: tipo_contato, errorMessage: tipoContatoError } = useField('tipo_contato', schema);

    return {
        nome,
        valor,
        status_id,
        tipo_contato,

        nomeError,
        valorError,
        tipoContatoError,
        statusIdError,

        handleSubmit,
    };
}

export function validarValor(value, context) {
    let tipo_contato = context.parent.tipo_contato;
    switch (tipo_contato) {
        case TIPO_CONTATO.WHATSAPP.id:
        case TIPO_CONTATO.TELEFONE.id:
            return validarTelefone(value);
        
        case TIPO_CONTATO.EMAIL.id:
        case TIPO_CONTATO.EMAIL_CFC.id:
            return validarEmail(value);

    }

    return true;
}

export function validarTelefone(value) {
    value = formatMaskAsNumber(value);
    // Verifica se o número tem um comprimento mínimo
    if (!value || value.length < 10) {
        return false; // Mínimo de 10 dígitos
    }

    return true;
}

export function validarEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}