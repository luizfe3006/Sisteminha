<template>
  <PrimeButton
    label="Get All"
    @click="getAll()"
  /><br>
  <PrimeButton
    label="Get"
    @click="get(1)"
  /><br>
  <PrimeButton
    label="Post"
    @click="post({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456'
    })"
  /><br>
  <PrimeButton
    label="Put"
    @click="put(12, { name: 'Edtiado5' })"
  /><br>
  <PrimeButton
    label="Delete"
    @click="destroy(12)"
  /><br>

  {{ response }}

  <PrimeButton
    label="Logout"
    severity="danger"
    @click="logout()"
  />
</template>

<script setup>
  const userRequest = useUserRequest();
  const authRequest = useAuthRequest();
  const token = useCookie('token');

  const logout = () => {
    authRequest.logout().then(() => {
      token.value = null;
      navigateTo('/login');
    });
  };

  const response = ref('');

  const getAll = async () => {
    response.value = await userRequest.getAll();
  };

  const get = async (id) => {
    response.value = await userRequest.get(id);
  };

  const post = async (data) => {
    response.value = await userRequest.post(data);
  };

  const put = async (id, data) => {
    response.value = await userRequest.put(id, data);
  };

  const destroy = async (id) => {
    response.value = await userRequest.destroy(id);
  };
</script>