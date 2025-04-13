import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { ptForm } from 'yup-locale-pt';
import { STATUS } from '~/utils/constants/common/status.js'; 
import { TIPO_PESSOA } from '~/utils/constants/cadastro/tipoPessoa.js';
import { formatMaskAsNumber } from '~/utils/functions/formatData.js';

yup.setLocale(ptForm);

const schema = yup.object({
    nome: yup.string().required(),
    status_id: yup.number().required().oneOf(
        Object.values(STATUS).map(status => status.id),
        'Selecione um status válido',
    ),
    tipo_pessoa: yup.string().required().oneOf(
        Object.values(TIPO_PESSOA).map(tipo => tipo.id),
        'Selecione um tipo de pessoa válido',
    ),
    cpf_cnpj: yup.string().required().test(
        'cpf_cnpj',
        'Valor inválido',
        (value, context) => validarCpfCnpj(value, context),
    ),
    data_nascimento: yup.date().when('tipo_pessoa', {
        is: (value) => value === TIPO_PESSOA.FISICA.id,
        then: (schema) => schema.required(),
    }),
    inscricao_estadual: yup.string().nullable(),
    inscricao_municipal: yup.string().nullable(),
    razao_social: yup.string().when('tipo_pessoa', {
        is: (value) => value === TIPO_PESSOA.JURIDICA.id,
        then: (schema) => schema.required(),
    }),
    data_abertura: yup.date().when('tipo_pessoa', {
        is: (value) => value === TIPO_PESSOA.JURIDICA.id,
        then: (schema) => schema.required(),
    }),
    is_profissional: yup.boolean(),
    is_cliente: yup.boolean(),
});

export function usePessoaFormValidation() {
    const { handleSubmit } = useForm({ validationSchema: schema });
    const { value: nome, errorMessage: nomeError } = useField('nome', schema);
    const { value: status_id, errorMessage: statusIdError } = useField('status_id', schema);
    const { value: tipo_pessoa, errorMessage: tipoPessoaError } = useField('tipo_pessoa', schema, { validateOnValueUpdate: false });
    const { value: cpf_cnpj, errorMessage: cpfCnpjError } = useField('cpf_cnpj', schema, { validateOnValueUpdate: false });
    const { value: data_nascimento, errorMessage: dataNascimentoError } = useField('data_nascimento', schema);
    const { value: inscricao_estadual, errorMessage: inscricaoEstadualError } = useField('inscricao_estadual', schema);
    const { value: inscricao_municipal, errorMessage: inscricaoMunicipalError } = useField('inscricao_municipal', schema);
    const { value: razao_social, errorMessage: razaoSocialError } = useField('razao_social', schema);
    const { value: data_abertura, errorMessage: dataAberturaError } = useField('data_abertura', schema);
    const { value: is_profissional, errorMessage: isProfissionalError } = useField('is_profissional', schema);
    const { value: is_cliente, errorMessage: isClienteError } = useField('is_cliente', schema);

    return {
        nome,
        status_id,
        tipo_pessoa,
        cpf_cnpj,
        data_nascimento,
        inscricao_estadual,
        inscricao_municipal,
        razao_social,
        data_abertura,
        is_profissional,
        is_cliente,

        nomeError,
        statusIdError,
        tipoPessoaError,
        cpfCnpjError,
        dataNascimentoError,
        inscricaoEstadualError,
        inscricaoMunicipalError,
        razaoSocialError,
        dataAberturaError,
        isProfissionalError,
        isClienteError,

        handleSubmit,
    };
}

export function validarCPF(value) {
    value = formatMaskAsNumber(value);
    let soma = 0;
    let resto;
    let i;

    if (!value || value == "00000000000") return false;

    for (i = 1; i <= 9; i++) soma = soma + parseInt(value.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(value.substring(9, 10))) return false;

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(value.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(value.substring(10, 11))) return false;
    return true;
}

export function validarCNPJ(value) {
    if (!value) return false;

    value = formatMaskAsNumber(value);
    let tamanho = value.length - 2;
    let numeros = value.substring(0, tamanho);
    let digitos = value.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    if (value == "00000000000000") return false;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = value.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
}

export function validarCpfCnpj(value, context) {
    
    switch (context.parent.tipo_pessoa) {
        case TIPO_PESSOA.FISICA.id:
            return validarCPF(value);
        case TIPO_PESSOA.JURIDICA.id:
            return validarCNPJ(value);
    }
}