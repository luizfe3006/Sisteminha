import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { ptForm } from 'yup-locale-pt';
import { STATUS } from '~/utils/constants/common/status.js'; 
import { TIPO_ENDERECO } from '~/utils/constants/cadastro/tipoEndereco';

yup.setLocale(ptForm);

const schema = yup.object({
    nome: yup.string().required(),
    logradouro: yup.string().required(),
    numero: yup.string().required(),
    bairro: yup.string().required(),
    complemento: yup.string().nullable(),
    codigo_postal: yup.string().required(),
    pais_id: yup.number().required(),
    estado_id: yup.number().required(),
    cidade_id: yup.number().required(),
    status_id: yup.number().required().oneOf(
        Object.values(STATUS).map(status => status.id),
        'Selecione um status válido',
    ),
    tipo_endereco: yup.string().required().oneOf(
        Object.values(TIPO_ENDERECO).map(tipo => tipo.id),
        'Selecione um tipo de endereço válido',
    ),
});

export function usePessoaEnderecoFormValidation() {
    
    const { handleSubmit } = useForm({ validationSchema: schema });
    const { value: nome, errorMessage: nomeError } = useField('nome', schema);
    const { value: logradouro, errorMessage: logradouroError } = useField('logradouro', schema);
    const { value: numero, errorMessage: numeroError } = useField('numero', schema);
    const { value: bairro, errorMessage: bairroError } = useField('bairro', schema);
    const { value: complemento, errorMessage: complementoError } = useField('complemento', schema);
    const { value: codigo_postal, errorMessage: codigoPostalError } = useField('codigo_postal', schema);
    const { value: pais_id, errorMessage: paisIdError } = useField('pais_id', schema);
    const { value: estado_id, errorMessage: estadoIdError } = useField('estado_id', schema);
    const { value: cidade_id, errorMessage: cidadeIdError } = useField('cidade_id', schema);
    const { value: status_id, errorMessage: statusIdError } = useField('status_id', schema);
    const { value: tipo_endereco, errorMessage: tipoEnderecoError } = useField('tipo_endereco', schema);

    return {
        nome,
        logradouro,
        numero,
        bairro,
        complemento,
        codigo_postal,
        pais_id,
        estado_id,
        cidade_id,
        status_id,
        tipo_endereco,

        nomeError,
        logradouroError,
        numeroError,
        bairroError,
        complementoError,
        codigoPostalError,

        paisIdError,
        estadoIdError,
        cidadeIdError,
        tipoEnderecoError,
        statusIdError,

        handleSubmit,
    };
}