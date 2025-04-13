import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { ptForm } from 'yup-locale-pt';

yup.setLocale(ptForm);

const schema = yup.object({
    valor: yup.number().required('O valor é obrigatório').min(0.01, 'O valor deve ser maior que 0'),
    valor_desconto: yup.number().nullable(),
    valor_adicional: yup.number().nullable(),
    valor_total: yup.number().required('O valor total é obrigatório').min(0.01, 'O valor total deve ser maior que 0'),
    data_vencimento: yup.date().required('A data de vencimento é obrigatória'),
    data_pagamento: yup.date().nullable(),
    quitado: yup.boolean().nullable(),
    pedido_id: yup.number().required('O pedido é obrigatório'),
    assinatura_id: yup.number().required('A assinatura é obrigatório'),
    forma_pagamento_id: yup.number().required('A forma de pagamento é obrigatória'),
});

export function useFaturaFormValidation() {
    const { handleSubmit } = useForm({ validationSchema: schema });
    const { value: valor, errorMessage: valorError } = useField('valor');
    const { value: valor_desconto, errorMessage: valorDescontoError } = useField('valor_desconto');
    const { value: valor_adicional, errorMessage: valorAdicionalError } = useField('valor_adicional');
    const { value: valor_total, errorMessage: valorTotalError } = useField('valor_total');
    const { value: data_vencimento, errorMessage: dataVencimentoError } = useField('data_vencimento');
    const { value: data_pagamento, errorMessage: dataPagamentoError } = useField('data_pagamento');
    const { value: quitado, errorMessage: quitadoError } = useField('quitado', schema);
    const { value: pedido_id, errorMessage: pedidoIdError } = useField('pedido_id');
    const { value: forma_pagamento_id, errorMessage: formaPagamentoError } = useField('forma_pagamento_id');
    const { value: assinatura_id, errorMessage: assinaturaIdError } = useField('assinatura_id');

    return {
        valor,
        valorError,
        valor_desconto,
        valorDescontoError,
        valor_adicional,
        valorAdicionalError,
        valor_total,
        valorTotalError,
        data_vencimento,
        dataVencimentoError,
        data_pagamento,
        dataPagamentoError,
        quitado,
        quitadoError,
        pedido_id,
        pedidoIdError,
        forma_pagamento_id,
        formaPagamentoError,
        assinatura_id,
        assinaturaIdError,

        handleSubmit,
    };
}