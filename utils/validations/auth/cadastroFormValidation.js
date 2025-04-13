import * as yup from "yup";
import { useForm, useField, configure } from "vee-validate";
import { ptForm } from "yup-locale-pt";
import { TIPO_PESSOA } from "~/utils/constants/cadastro/tipoPessoa.js";
import { formatMaskAsNumber } from "~/utils/functions/formatData.js";

yup.setLocale(ptForm);

const schema = yup.object({
  passo_atual: yup.number().required(),

  tipo_pessoa: yup.string().when("passo_atual", {
    is: 0,
    then: (schema) =>
      schema.required().oneOf(
        Object.values(TIPO_PESSOA).map((tipo) => tipo.id),
        "Selecione um tipo de pessoa válido",
      ),
  }),
  cpf_cnpj: yup.string().when("passo_atual", {
    is: 0,
    then: (schema) =>
      schema
        .required()
        .test("cpf_cnpj", "Valor inválido", (value, context) =>
          validarCpfCnpj(value, context),
        ),
  }),
  nome: yup.string().when("passo_atual", {
    is: 0,
    then: (schema) => schema.required("Nome/Razão Social é obrigatório"),
  }),
  numero_conselho: yup.string().when("passo_atual", {
    is: 0,
    then: (schema) => schema.required("Número do Conselho é obrigatório"),
  }),
  email: yup.string().when("passo_atual", {
    is: 1,
    then: (schema) =>
      schema
        .required()
        .test("email", "Valor inválido", (value) => validarEmail(value)),
  }),
  telefone: yup.string().when("passo_atual", {
    is: 1,
    then: (schema) => schema.required("Telefone é obrigatório"),
  }),
  password: yup.string().when("passo_atual", {
    is: 2,
    then: (schema) =>
      schema
        .required()
        .min(8)
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+{}|:<>?/~`"'\-=\\[\];,./]).*$/,
          "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
        ),
  }),
});

export function useCadastroFormValidation() {
  configure({
    validateOnModelUpdate: false,
    bails: false,
  });

  const { handleSubmit } = useForm({ validationSchema: schema });

  const { value: tipo_pessoa, errorMessage: tipoPessoaError } = useField(
    "tipo_pessoa",
    schema,
  );
  const { value: passo_atual, errorMessage: passoAtualError } = useField(
    "passo_atual",
    schema,
    { validateOnValueUpdate: false },
  );
  const { value: cpf_cnpj, errorMessage: cpfCnpjError } = useField(
    "cpf_cnpj",
    schema,
  );
  const { value: nome, errorMessage: nomeRazaoSocialError } = useField(
    "nome",
    schema,
  );
  const { value: numero_conselho, errorMessage: numeroConselhoError } =
    useField("numero_conselho", schema);
  const { value: email, errorMessage: emailError } = useField("email", schema, {
    validateOnValueUpdate: false,
  });
  const { value: password, errorMessage: passwordError } = useField(
    "password",
    schema,
  );
  const { value: telefone, errorMessage: telefoneError } = useField(
    "telefone",
    schema,
  );

  return {
    passo_atual,
    tipo_pessoa,
    cpf_cnpj,
    nome,
    numero_conselho,
    email,
    password,
    telefone,

    tipoPessoaError,
    passoAtualError,
    cpfCnpjError,
    nomeRazaoSocialError,
    numeroConselhoError,
    emailError,
    passwordError,
    telefoneError,

    handleSubmit,
  };
}

export function validarCPF(value) {
  value = formatMaskAsNumber(value);
  let soma = 0;
  let resto;
  let i;

  if (!value || value == "00000000000") return false;

  for (i = 1; i <= 9; i++)
    soma = soma + parseInt(value.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(value.substring(9, 10))) return false;

  soma = 0;
  for (i = 1; i <= 10; i++)
    soma = soma + parseInt(value.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
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
export function validarEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}
