<template>
  <div class="bg-white p-8 drop-shadow-md rounded-lg w-full lg:w-1/3 sm:mx-auto">
    <div class="text-center mb-7">
      <img
        src="@/assets/images/tictoLogoBlack.png"
        alt="Logotipo"
        class="mt-4 mb-8 h-14 mx-auto"
      >
      <div class="text-900 text-xl font-medium my-2">
        Bem vindo!
      </div>
      <div class="text-gray-600">
        Informe seu nome para continuar
      </div>
    </div>
    
    <div>
      <form
        class="grid gap-3"
        @submit.prevent="onSubmit"
      >
        <div>
          <label
            for="email"
            class="block text-900 font-medium mb-2"
          >Nome</label>
          <PrimeInputText
            id="email"
            v-model="email"
            name="email"
            type="text"
            :class="{ 'p-invalid': emailError }"
            class="w-full"
          />
          <span class="p-error text-sm">{{ emailError }}</span>
        </div>
        <!-- <div>
          <label
            for="password"
            class="block text-900 font-medium mb-2"
          >Senha</label>
          <PrimePassword
            id="password"
            v-model="password"
            name="password"
            :class="{ 'p-invalid': passwordError }"
            class="w-full !grid"
            :feedback="false"
            toggle-mask
          />
          <span class="p-error text-sm">{{ passwordError }}</span>
        </div> -->
        <!-- <div class="flex items-center justify-between mb-6">
          <NuxtLink
            to="/recuperar-senha"
            class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
          >
            Esqueceu sua senha?
          </NuxtLink>
        </div> -->
        
        <PrimeButton
          type="submit"
          label="Acessar"
          class="w-full bg-black"
          :loading="loadingForm"
        />

        <div class="text-center mt-4">
          <span class="text-gray-600">Não tem uma conta ainda? </span>
          <NuxtLink
            to="/cadastrar"
            class="font-medium no-underline text-blue-500 text-right cursor-pointer"
          >
            Cadastre-se
          </NuxtLink>
        </div>  
      </form>
    </div>
  </div>
</template>

<script setup>
  import * as yup from 'yup';
  import { ptForm } from 'yup-locale-pt';
  yup.setLocale(ptForm);

  definePageMeta({
    layout: 'auth',
    middleware: [],
  });

  const toast = useToastCustom();
  const authRequest = useAuthRequest();
  const userRequest = useUserRequest();
  const token = useCookie('token');
  token.value = null;

  const perfilUsuario = ref(null);

  const { handleSubmit } = useForm();
  const { value: email, errorMessage: emailError } = useField('email', yup.string().required());
  const { value: password, errorMessage: passwordError } = useField('password', yup.string().nullable());

  const loadingForm = ref(false);
  const onSubmit = handleSubmit(values => {
    /*
    loadingForm.value = true;
    authRequest.login(values).then((response) => {
      token.value = response.token;
      toast.show(response.title, response.message, Severity.Success);
      setTimeout(async () => {
        perfilUsuario.value = await userRequest.retornarPerfilUsuario();
        window.localStorage.setItem('perfilUsuario', JSON.stringify(perfilUsuario.value));
        navigateTo('/sistema');
      }, 1000);
    }).finally(() => {
      loadingForm.value = false;
    });
    */
    localStorage.setItem("perfilUsuario", JSON.stringify({
      nome: email.value
    }));
    navigateTo('/sistema/dashboard');

  });

</script>