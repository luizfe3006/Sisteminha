import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { ptForm } from 'yup-locale-pt';
import { STATUS } from '~/utils/constants/common/status.js'; 
import { TIPO_PRODUTO } from '~/utils/constants/cadastro/tipoProduto.js';

yup.setLocale(ptForm);

const schema = yup.object({
    nome: yup.string().required(),
    descricao: yup.string().required(),
    valor_venda: yup.number().required(),
    largura: yup.number().nullable(),
    altura: yup.number().nullable(),
    comprimento: yup.number().nullable(),
    peso: yup.number().nullable(),
    status_id: yup.number().required().oneOf(
        Object.values(STATUS).map(status => status.id),
        'Selecione um status válido',
    ),
    tipo_produto: yup.string().oneOf(
        Object.values(TIPO_PRODUTO).map(tipo => tipo.id),
        'Selecione um tipo de produto válido',
    ),
    produto_categoria_id: yup.number().required(),

});

export function useProdutoFormValidation() {
    const { handleSubmit } = useForm({ validationSchema: schema });
    const { value: nome, errorMessage: nomeError } = useField('nome', schema);
    const { value: descricao, errorMessage: descricaoError } = useField('descricao', schema);
    const { value: valor_venda, errorMessage: valorVendaError } = useField('valor_venda', schema);
    const { value: largura, errorMessage: larguraError } = useField('largura', schema);
    const { value: altura, errorMessage: alturaError } = useField('altura', schema);
    const { value: comprimento, errorMessage: comprimentoError } = useField('comprimento', schema);
    const { value: peso, errorMessage: pesoError } = useField('peso', schema);
    const { value: status_id, errorMessage: statusIdError } = useField('status_id', schema);
    const { value: tipo_produto, errorMessage: tipoProdutoError } = useField('tipo_produto', schema, { validateOnValueUpdate: false });
    const { value: produto_categoria_id, errorMessage: categoriaIdError } = useField('produto_categoria_id', schema, { validateOnValueUpdate: false });

    return {
        nome,
        descricao,
        valor_venda,
        largura,
        altura,
        comprimento,
        peso,
        status_id,
        tipo_produto,
        produto_categoria_id,

        nomeError,
        descricaoError,
        valorVendaError,
        larguraError,
        alturaError,
        comprimentoError,
        pesoError,
        statusIdError,
        tipoProdutoError,
        categoriaIdError,

        handleSubmit,
    };
}