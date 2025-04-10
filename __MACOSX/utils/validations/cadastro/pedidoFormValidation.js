import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { ptForm } from 'yup-locale-pt';
import { STATUS } from '~/utils/constants/common/status.js'; 
import { TIPO_PEDIDO } from '~/utils/constants/cadastro/tipoPedido.js';

yup.setLocale(ptForm);

const schema = yup.object({
    data_pedido: yup.date().required(),
    valor_bruto: yup.number().required().min(0),
    valor_desconto: yup.number().nullable().min(0),
    valor_frete: yup.number().nullable().min(0),
    valor_total: yup.number().required().min(0),
    observacao: yup.string().nullable(),
    pessoa_id: yup.number().required(),
    status_pedido_id: yup.number().required().oneOf(
        Object.values(STATUS).map(status => status.id),
        'Selecione um status válido',
    ),
    tipo_pedido: yup.string().required().oneOf(
        Object.values(TIPO_PEDIDO).map(tipo => tipo.id),
        'Selecione um tipo de pedido válido',
    ),
});

export function usePedidoFormValidation() {
    const { handleSubmit } = useForm({ validationSchema: schema });
    const { value: data_pedido, errorMessage: dataPedidoError } = useField('data_pedido', schema);
    const { value: valor_bruto, errorMessage: valorBrutoError } = useField('valor_bruto', schema);
    const { value: valor_desconto, errorMessage: valorDescontoError } = useField('valor_desconto', schema);
    const { value: valor_frete, errorMessage: valorFreteError } = useField('valor_frete', schema);
    const { value: valor_total, errorMessage: valorTotalError } = useField('valor_total');
    const { value: observacao, errorMessage: observacaoError } = useField('observacao', schema);
    const { value: status_pedido_id, errorMessage: statusIdError } = useField('status_pedido_id', schema);
    const { value: tipo_pedido, errorMessage: tipoPedidoError } = useField('tipo_pedido', schema, { validateOnValueUpdate: false });
    const { value: pessoa_id, errorMessage: pessoaIdError } = useField('pessoa_id', schema);

    return {
        data_pedido,
        valor_bruto,
        valor_desconto,
        valor_frete,
        valor_total,
        observacao,
        status_pedido_id,
        tipo_pedido,
        pessoa_id,

        dataPedidoError,
        valorBrutoError,
        valorDescontoError,
        valorFreteError,
        valorTotalError,
        observacaoError,
        statusIdError,
        tipoPedidoError,
        pessoaIdError,

        handleSubmit,
    };
}