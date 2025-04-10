import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { ptForm } from "yup-locale-pt";
import { CICLOS } from "~/utils/constants/common/ciclosDeCobranca";

yup.setLocale(ptForm);

const schema = yup.object({
  nome: yup.string().required("O nome do plano é obrigatório"),
  preco: yup
    .number()
    .required("O preco do plano é obrigatório")
    .min(0, "O preco deve ser maior ou igual a 0"),
  ciclo_cobranca: yup
    .string()
    .required("Selecione um ciclo de cobrança válido")
    .oneOf(
      Object.values(CICLOS).map((tipo) => tipo.id),
      "Selecione um ciclo de cobrança válido",
    ),
    limite_usuario: yup
    .number()
    .required("O limite máximo de usuários é obrigatório")
    .min(1, "O limite deve ser pelo menos 1"),
  ativo: yup.boolean(),
});

export function usePlanoFormValidation() {
  const { handleSubmit } = useForm({ validationSchema: schema });

  const { value: nome, errorMessage: nomeError } = useField("nome", schema);
  const { value: preco, errorMessage: precoError } = useField("preco", schema);
  const { value: ciclo_cobranca, errorMessage: cicloCobrancaError } = useField(
    "ciclo_cobranca",
    schema,
  );
  const { value: limite_usuario, errorMessage: limiteUsuariosError } = useField(
    "limite_usuario",
    schema,
  );
  const { value: ativo, errorMessage: ativoError } = useField("ativo", schema);

  return {
    nome,
    preco,
    ciclo_cobranca,
    limite_usuario,
    ativo,

    nomeError,
    precoError,
    cicloCobrancaError,
    limiteUsuariosError,
    ativoError,

    handleSubmit,
  };
}
