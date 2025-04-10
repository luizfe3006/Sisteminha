import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { ptForm } from 'yup-locale-pt';
import { TIPO_TRANSACAO } from '~/utils/constants/financeiro/tipoTransacao';
import { TIPO_RECORRENCIA } from '~/utils/constants/financeiro/tipoRecorrencia';

yup.setLocale(ptForm);

const schema = yup.object({
    descricao: yup.string().required(),
    valor: yup.number().required(),
    data_vencimento: yup.date().required(),
    pago: yup.boolean().nullable(),
    data_pagamento: yup.date().when('pago', {
        is: (value) => value === true,
        then: (schema) => schema.required(),
    }),
    tipo_transacao: yup.string().required().oneOf(
        Object.values(TIPO_TRANSACAO).map(tipo => tipo.id),
        'Selecione um tipo de transação válido',
    ),
    tipo_recorrencia: yup.string().nullable().oneOf(
        Object.values(TIPO_RECORRENCIA).map(tipo => tipo.id),
        'Selecione um tipo de recorrencia válido',
    ),
    quantidade_recorrencias: yup.number().nullable(),
    conta_id: yup.number().required(),
    conta_destino_id: yup.number().when('tipo_transacao', {
        is: (value) => value === TIPO_TRANSACAO.TRANSFERENCIA.id,
        then: (schema) => schema.required(),
    }),
    transacao_categoria_id: yup.number().required(),

});

export function useTransacaoFormValidation() {
    const { handleSubmit } = useForm({ validationSchema: schema });
    const { value: descricao, errorMessage: descricaoError } = useField('descricao', schema);
    const { value: valor, errorMessage: valorError } = useField('valor', schema);
    const { value: data_vencimento, errorMessage: dataVencimentoError } = useField('data_vencimento', schema);
    const { value: pago, errorMessage: pagoError } = useField('pago', schema);
    const { value: data_pagamento, errorMessage: dataPagamentoError } = useField('data_pagamento', schema, { validateOnValueUpdate: false });
    const { value: tipo_transacao, errorMessage: tipoTransacaoError } = useField('tipo_transacao', schema, { validateOnValueUpdate: false });
    const { value: tipo_recorrencia, errorMessage: tipoRecorrenciaError } = useField('tipo_recorrencia', schema, { validateOnValueUpdate: false });
    const { value: quantidade_recorrencias, errorMessage: quantidadeRecorrenciasError } = useField('quantidade_recorrencias', schema, { validateOnValueUpdate: false });
    const { value: conta_id, errorMessage: contaIdError } = useField('conta_id');
    const { value: conta_destino_id } = useField('conta_destino_id');
    const { value: transacao_categoria_id, errorMessage: categoriaIdError } = useField('transacao_categoria_id');

    return {
        descricao,
        valor,
        data_vencimento,
        pago,
        data_pagamento,
        tipo_transacao,
        tipo_recorrencia,
        quantidade_recorrencias,
        conta_id,
        conta_destino_id,
        transacao_categoria_id,

        descricaoError,
        valorError,
        dataVencimentoError,
        pagoError,
        dataPagamentoError,
        tipoTransacaoError,
        tipoRecorrenciaError,
        quantidadeRecorrenciasError,
        contaIdError,
        categoriaIdError,

        handleSubmit,
    };
}