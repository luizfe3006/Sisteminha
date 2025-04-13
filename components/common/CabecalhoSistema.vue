<template>
  <div
    class="header-width bg-white dark:bg-[#0b0b0e] border-slate-200 py-4 px-5 flex justify-between text-black dark:text-white header-style"
  >
    <div class="flex items-center cursor-pointer" @click="showModal = true">
      <p class="text-ms text-default">
        Olá, <strong>{{ itemsSubmenuPerfil[0].label }}!</strong> Hoje é
        {{ today }}
      </p>
    </div>

    <div class="flex items-center">
      <div class="flex items-center justify-center p-4">
        <!-- <span
          v-if="!isDark"
          class="pi pi-sun text-yellow-400 text-2xl cursor-pointer transition-transform transform hover:scale-110"
          @click="toggleTheme"
        ></span>
        <span
          v-else
          class="pi pi-moon text-gray-400 text-2xl cursor-pointer transition-transform transform hover:scale-110"
          @click="toggleTheme"
        ></span> -->
      </div>
      <div class="flex items-center">
        <div class="painel-comprador">
          Painel do comprador
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M16 3l4 4l-4 4"></path><path d="M10 7l10 0"></path><path d="M8 13l-4 4l4 4"></path><path d="M4 17l9 0"></path></svg>
        </div>
        <i class="pi pi-whatsapp text-purple "></i>
        <i class="icone-personalizado"></i>
        <!-- <i class="pi pi-inbox text-purple"></i> -->
        <i class="pi pi-bell text-purple"></i>
        <i class="pi pi-question-circle text-purple"></i>

        <div class="switchTheme">
          <PrimeInputSwitch v-model="checked" />
        </div>
        <!-- <div class="themeSwitch">
          <div class="border-off">
            <i class="pi pi-moon"></i>
          </div>
          <div>
            <i class="pi pi-moon"></i>
          </div>
        </div> -->

      
        <PrimeButton
          aria-haspopup="true"
          aria-controls="submenu_perfil"
          text
          outlined
          aria-label="Perfil"
          @click="toggleSubmenuPerfil"
        >
          <img src="@/assets/images/perfil.jpeg" class="w-8 h-8 mb-3 flex items-center justify-center rounded-full" alt="">
          <img src="@/assets/images/verified.png" width="16px" class="pb-6" alt="">
        </PrimeButton>
      </div>

      <PrimeMenu
        id="submenu_perfil"
        ref="submenuPerfil"
        :model="itemsSubmenuPerfil"
        :popup="true"
      >
        <template #item="{ item, props }">
          <router-link
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
            custom
          >
            <a  :href="href" v-bind="props.action" @click="navigate">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
          <a
            v-else
            :href="item.url"
            :target="item.target"
            v-bind="props.action"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </template>
      </PrimeMenu>
    </div>
    <PrimeDialog
      v-model:visible="showModal"
      header="Alterar Dashboard"
      :closable="false"
      :style="{ width: '500px' }"
    >
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div>
        <label for="data" class="mb-2 block">Data atual</label>
        <PrimeCalendar
          id="data"
          v-model="dataSelecionada"
          placeholder="Selecione a data"
          class="w-full"
        />
      </div>

      <div>
        <label for="totalPedidos" class="mb-2 block">Total de Pedidos</label>
        <PrimeInputNumber
          id="totalPedidos"
          v-model="totalPedidos"
          class="w-full"
        />
      </div>

      <div>
        <label for="totalItens" class="mb-2 block">Total de Itens</label>
        <PrimeInputNumber
          id="totalItens"
          v-model="totalItens"
          class="w-full"
        />
      </div>

      <div>
        <label for="upsells" class="mb-2 block">Upsells</label>
        <PrimeInputNumber
          id="upsells"
          v-model="upsells"
          class="w-full"
        />
      </div>

      <div>
        <label for="orderbumps" class="mb-2 block">Order Bumps</label>
        <PrimeInputNumber
          id="orderbumps"
          v-model="orderbumps"
          class="w-full"
        />
      </div>

      <div>
        <label for="valorComissoes" class="mb-2 block">Valor em Comissões</label>
        <PrimeInputNumber
          id="valorComissoes"
          v-model="valorComissoes"
          class="w-full"
          :max-fraction-digits="2"
          locale="en-US"
          mode="currency"
          currency="USD"
        />
      </div>
    </div>


      <!-- Botões de Ação -->
      <div class="flex w-full justify-between mt-5">
        <PrimeButton
          label="Cancelar"
          class="p-button-danger"
          @click="showModal = false"
          outlined
        />
        <PrimeButton
          label="Salvar"
          @click="salvarData"
          class="dark:bg-[#855be2] border-none"
        />
      </div>
    </PrimeDialog>
  </div>
</template>

<script setup>
import { useMenuItems } from "~/data/menuItems";
const userPhoto = ref();
const submenuPerfil = ref();
const showModal = ref(false);
const dataSelecionada = ref();
const totalPedidos = ref();
const totalItens = ref();
const upsells = ref();
const orderbumps = ref();
const valorComissoes = ref();
const checked = ref(true);

const today = ref(
  new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
);
const { itemsSubmenuPerfil } = useMenuItems();

// const isDark = ref(false);

const salvarData = () => {
  if (dataSelecionada.value) {
    const dataFormatada = dataSelecionada.value.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    today.value = dataFormatada;

    localStorage.setItem("dashboard", JSON.stringify({
      'dataSelecionada': dataSelecionada.value,
      'totalPedidos': totalPedidos.value,
      'totalItens': totalItens.value,
      'upsells': upsells.value,
      'orderbumps': orderbumps.value,
      'valorComissoes': valorComissoes.value,
    }));


    showModal.value = false;
  }
};
// const toggleTheme = () => {
//   isDark.value = !isDark.value;
//   if (isDark.value) {
//     document.documentElement.classList.add("dark");
//     localStorage.setItem("theme", "dark");
//   } else {
//     document.documentElement.classList.remove("dark");
//     localStorage.setItem("theme", "light");
//   }
// };

// Mantém a escolha do usuário ao recarregar a página
onMounted(() => {
  // const savedTheme = localStorage.getItem("theme");
  // if (savedTheme === "dark") {
  //   isDark.value = true;
  //   document.documentElement.classList.add("dark");
  // }
  document.documentElement.classList.add("dark");

  const infoDashboard = JSON.parse(localStorage.getItem('dashboard'));
  if (infoDashboard) {
    dataSelecionada.value = infoDashboard.dataSelecionada;
    totalPedidos.value = infoDashboard.totalPedidos;
    totalItens.value = infoDashboard.totalItens;
    upsells.value = infoDashboard.upsells;
    orderbumps.value = infoDashboard.orderbumps;
    valorComissoes.value = infoDashboard.valorComissoes;
  }
});

const userInitials = computed(() => {
  const userName = itemsSubmenuPerfil[0].label;
  const names = userName.split(" ");
  return names[0][0]; // Se tiver só um nome, pega a primeira letra
});
const toggleSubmenuPerfil = (event) => {
  submenuPerfil.value.toggle(event);
};
</script>

<style>

.dark .p-dialog .p-dialog-header {
  background-color: #0e0e0e !important; /* Fundo escuro no modo dark */
  color: #acb5bf !important; /* Texto branco no modo dark */
}
.dark .p-dialog .p-dialog-content {
  background-color: #0e0e0e !important; /* Fundo escuro no modo dark */
  color: #acb5bf !important; /* Texto branco no modo dark */
}

.dark .p-panel .p-panel-header {
  background-color: #050307 !important; /* Fundo escuro no modo dark */
  color: #acb5bf !important; /* Texto branco no modo dark */
  border: none !important;
}
.dark .p-panel .p-panel-content {
  background-color: #101111 !important; /* Fundo escuro no modo dark */
  color: #acb5bf !important; /* Texto branco no modo dark */
  border: none !important;
}
.dark .p-dialog .p-dialog-footer {
  background-color: #0e0e0e !important; /* Fundo escuro no modo dark */
  color: #acb5bf !important; /* Texto branco no modo dark */
  border: none !important;
}
.dark .panel2 .p-panel-header {
  padding: 5px 17.5px !important;
  background: #0d0c0e !important;
  border: 1px solid #262626 !important;
}
.p-inputswitch {
  width: 3.3rem !important;
  height: 1.6rem !important ;
}
.switchTheme .p-inputswitch.p-highlight .p-inputswitch-slider:before {
  transform: translateX(1.085rem) !important;
}
.p-inputswitch.p-highlight .p-inputswitch-slider:before {
  transform: translateX(1.5rem) !important;
}
.header-style::after {
    position: absolute;
    height: .08rem;
    width: 50vw;
    right: 0;
    content: "";
    background: linear-gradient(90deg, #000, #501bf0 25%, #ed9c39 49%, #e53ac9 73%, #000);;
    background-size: 200%;
    background-position-x: left;
    top: 6em;
}
.header-width {
  width: 102% !important;
}
.icone-personalizado {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  background-image: url('/assets/images/inboxe.png');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}
</style>
