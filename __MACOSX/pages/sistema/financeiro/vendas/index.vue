<template>
  <main class="p-6 px-0 mx-auto text-dark dark:text-white min-h-screen">
    <!-- Título e Ações -->
    <div
      class="flex justify-between items-center pb-8 px-10"
      style="border-bottom: 1px solid #1d1b21"
    >
      <h1 class="text-2xl font-bold text-default">Relatório de Vendas</h1>
      <div class="flex gap-4">
        <PrimeButton
          icon="pi pi-file-import"
          label="Importar Código de Rastreio"
          severity="warning"
          outlined
        />
        <PrimeButton
          icon="pi pi-file-excel"
          label="Exportar CSV"
          severity="success"
          outlined
          @click="showModal = true"
        />
        <PrimeButton
          icon="pi pi-filter-fill"
          label="Filtros"
          severity="primary"
          outlined
          @click="showFilters = !showFilters"
        />
      </div>
    </div>

    <!-- <PrimeDivider/> -->

    <!-- Modal de Cadastro de Venda -->
    <PrimeDialog
      v-model:visible="showModal"
      header="Cadastrar Venda"
      :closable="false"
      :style="{ width: '500px' }"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label for="data">Data</label>
          <PrimeCalendar
            id="data"
            v-model="formData.data"
            placeholder="Selecione a data"
          />
        </div>

        <div class="flex flex-col">
          <label for="status">Status</label>
          <PrimeDropdown
            id="status"
            v-model="formData.status"
            :options="statuses"
            option-label="label"
            placeholder="Selecione o status"
          />
        </div>

        <div class="flex flex-col">
          <label for="metodo">Método</label>
          <PrimeDropdown
            id="metodo"
            v-model="formData.metodo"
            :options="metodos"
            option-label="label"
            placeholder="Selecione o metodo"
          />
        </div>

        <div class="flex flex-row gap-3">
          <div class="flex flex-col">
            <label for="valor_produto">Produto</label>
            <PrimeInputText
              id="produto"
              v-model="formData.produto"
              placeholder="Digite o produto"
            />
          </div>
          <div class="flex flex-col">
            <label for="comprador">Comprador</label>
            <PrimeInputText
              id="comprador"
              v-model="formData.comprador"
              placeholder="Digite o comprador"
            />
          </div>
        </div>

        <div class="flex flex-col">
          <label for="metodo">Oferta</label>
          <PrimeDropdown
            id="oferta"
            v-model="formData.oferta"
            :options="ofertas"
            option-label="label"
            placeholder="Selecione o oferta"
          />
        </div>

        <!-- <div class="flex flex-row gap-3"> -->

        <div class="flex flex-col">
          <label for="valor_comissao">Valor da Comissão</label>
          <PrimeInputNumber
            id="comissao"
            v-model="formData.comissao"
            mode="currency"
            currency="BRL"
            placeholder="Digite a comissão"
          />
        </div>
        <!-- </div> -->

        <!-- Botões de Ação -->
        <div class="flex justify-between">
          <PrimeButton
            label="Cancelar"
            class="p-button-secondary"
            @click="showModal = false"
            outlined
          />
          <PrimeButton
            label="Salvar"
            @click="saveVenda"
            class="dark:bg-[#855be2] border-none"
          />
        </div>
      </div>
    </PrimeDialog>
    <!-- Menu Lateral -->
    <PrimePanel
      v-show="showFilters"
      v-model:activeIndex="activeIndex"
      :style="{ width: '400px' }"
      class="fixed top-0 right-0 h-full bg-white dark:bg-[#0b0b0e] shadow-lg z-50 overflow-y-auto pr-4"
      :on-hide="handleClose"
    >
      <!-- Título e Botão de Fechar -->
      <template #header class="flex justify-between items-center p-1">
        <!-- Título à esquerda -->
        <span class="font-bold text-lg">Filtros</span>

        <!-- Botão de Fechar no canto direito -->
        <!-- <PrimeButton
          icon="pi pi-times"
          severity="danger"
          outlined
          @click="handleClose"
          class="ml-auto p-0 bg-transparent border-none"
          aria-label="Fechar"
        /> -->
      </template>
      <PrimePanel class="panel2 " header="Período" toggleable>
        
        <!-- Seção de Seleção de Período -->
        <div class="p-4">
          <div class="mb-2">
            <div class="mt-4 flex flex-row gap-6 px-2">
              <!-- PrimeCalendars para selecionar intervalo de datas -->
              <div class="mb-4">
                <span>De</span>
                <PrimeCalendar
                  v-model="startDate"
                  :dateFormat="'dd/mm/yy'"
                  class="wcalendar"
                >
                  <template #date="slotProps">
                    <span
                      v-if="
                        new Date(
                          slotProps.date.year +
                            '-' +
                            slotProps.date.month +
                            '-' +
                            slotProps.date.day
                        ) >=
                          new Date(
                            startDate.getFullYear() +
                              '-' +
                              startDate.getMonth() +
                              '-' +
                              startDate.getDate()
                          ) &&
                        new Date(
                          slotProps.date.year +
                            '-' +
                            slotProps.date.month +
                            '-' +
                            slotProps.date.day
                        ) <=
                          new Date(
                            endDate.getFullYear() +
                              '-' +
                              endDate.getMonth() +
                              '-' +
                              endDate.getDate()
                          )
                      "
                      class="marcado"
                    >
                      {{ slotProps.date.day }}
                    </span>
                    <template v-else>{{ slotProps.date.day }}</template>
                  </template>
                </PrimeCalendar>
              </div>
              <div class="mb-4">
                <span>Até</span>
                <PrimeCalendar
                  v-model="endDate"
                  :dateFormat="'dd/mm/yy'"
                  class="wcalendar"
                >
                  <template #date="slotProps">
                    <span
                      v-if="
                        new Date(
                          slotProps.date.year +
                            '-' +
                            slotProps.date.month +
                            '-' +
                            slotProps.date.day
                        ) >=
                          new Date(
                            startDate.getFullYear() +
                              '-' +
                              startDate.getMonth() +
                              '-' +
                              startDate.getDate()
                          ) &&
                        new Date(
                          slotProps.date.year +
                            '-' +
                            slotProps.date.month +
                            '-' +
                            slotProps.date.day
                        ) <=
                          new Date(
                            endDate.getFullYear() +
                              '-' +
                              endDate.getMonth() +
                              '-' +
                              endDate.getDate()
                          )
                      "
                      class="marcado"
                    >
                      {{ slotProps.date.day }}
                    </span>
                    <template v-else>{{ slotProps.date.day }}</template>
                  </template>
                </PrimeCalendar>
              </div>
            </div>
          </div>

          <!-- Botões de Intervalos Pré-definidos -->
          <div class="vstack gap-3">
            <span>Últimos</span>
            <div class="grid grid-cols-5 gap-5 gap-y-4 mt-5">
              <div
                v-for="(period, index) in [
                  1, 7, 15, 30, 45, 90, 180, 365, 540, 730,
                ]"
                :key="index"
                :class="[
                  'primary border-none text-ms font-semibold justify-center hover-filtro flex items-center px-4 py-3 rounded-md cursor-pointer text-white',
                  selectedPeriod === period
                    ? 'dark:bg-[#ad9ffd]'
                    : 'dark:bg-[#855be2]',
                ]"
                @click="selectPeriod(period)"
              >
                {{ period < 46 ? `${period}d` : `${Math.round(period / 30)}m` }}
              </div>
            </div>
          </div>
        </div>
      </PrimePanel>
      <PrimePanel class="panel2 mt-7" header="Status" toggleable>
        
        <!-- Filtro de Status -->
        <div class="p-4 pb-0">
          <div class="mt-10 mb-4 flex justify-start gap-2 btnsStatus">
            <PrimeButton
              @click.prevent="selectAll"
              label="Marcar todos"
              class="text-sm text-blue-500 dark:text-[#acb5bf] dark:bg-[#1c1c1c] border border-solid border-color-default-gray"
            />
            <PrimeButton
              @click.prevent="deselectAll"
              label="Desmarcar todos"
              class="text-sm text-blue-500 dark:text-[#acb5bf] dark:bg-[#1c1c1c] border border-solid border-color-default-gray"
            />
          </div>
          <div class="mt-4">
            <label
              v-for="status in statuses"
              :key="status.id"
              class="flex items-center gap-2"
            >
              <PrimeInputSwitch
                :id="status.id"
                v-model="status.value"
                :value="status.value"
                class="mr-1 mb-2"
              />
              <span class="pb-2">
                {{ status.label }}
              </span>
            </label>
          </div>
        </div>
      </PrimePanel>
      <PrimePanel class="panel3" header="Pedidos"> </PrimePanel>
      <PrimePanel class="panel3" header="Transações"> </PrimePanel>
      <PrimePanel class="panel3" header="Data Finalizada"> </PrimePanel>
      <PrimePanel class="panel3" header="Comprador"> </PrimePanel>
      <PrimePanel class="panel3" header="Afiliado"> </PrimePanel>
      <PrimePanel class="panel3" header="Produtos"> </PrimePanel>
      <PrimePanel class="panel3" header="Ofertas"> </PrimePanel>
      <PrimePanel class="panel3" header="Tipos de Itens"> </PrimePanel>
      <PrimePanel class="panel3" header="Método de Pagamento"> </PrimePanel>
      <PrimePanel class="panel3" header="Parcelas"> </PrimePanel>
      <PrimePanel class="panel3" header="Mensalidades Pagas"> </PrimePanel>
      <PrimePanel class="panel3" header="Tipos de Comissão"> </PrimePanel>
      <PrimePanel class="panel3" header="Código de Cupom"> </PrimePanel>
      <PrimePanel class="panel3 mb-4" header="Origem" style="padding-bottom: 50px">
      </PrimePanel>

      <div
        class="px-2 py-4 fixed gap-x-3 grid grid-cols-[70%_1fr] pr-4 "
        style="bottom: 0; background-color: #000; width: 400px"
      >
        <PrimeButton
          class="primary hoverBtn w-[19rem] bg-black dark:bg-[#855be2] border-none text-ms font-semibold justify-center"
          @click="aplicarFiltros()"
        >
          Aplicar Filtro
        </PrimeButton>
        <PrimeButton
          outlined
          class="primary hoverBtn w-full bg-black text-ms font-semibold justify-center"
          style="color: #855be2"
        >
          Limpar
        </PrimeButton>
      </div>
    </PrimePanel>

    <!-- Blur na tela -->
    <div
      v-if="showFilters || showModal"
      class="fixed inset-0 bg-black opacity-50 z-40"
      @click="fechaBlur()"
    ></div>

    <!-- Cards de Resumo -->
    <div class="grid grid-cols-[290px,1fr,1fr,1fr,290px] gap-8 mt-8 px-10">
      <!-- Card 1: Total de Pedidos -->
      <div
        class="bg-white dark:bg-[#0b0b0e] p-4 px-0 shadow-lg rounded-lg border-solid border border-color-default"
      >
        <div
          class="font-bold text-lg mb-4 px-6 flex justify-between text-default"
        >
          Total de Pedidos
          <PrimeProgressSpinner
            style="width: 20px; height: 20px; margin: 0"
            strokeWidth="6"
            v-if="loadingData"
          />
        </div>
        <div
          class="border-t border-color-default dark:border-gray-600 p-4 text-left text-2xl font-bold text-default"
        >
          {{ totalPedidos }}
        </div>
      </div>

      <!-- Card 2: Total de Itens -->
      <div
        class="bg-white dark:bg-[#0b0b0e] p-4 px-0 shadow-lg rounded-lg border-solid border border-color-default"
      >
        <div
          class="font-bold text-lg mb-4 px-6 flex justify-between text-default"
        >
          Total de Itens
          <PrimeProgressSpinner
            style="width: 20px; height: 20px; margin: 0"
            strokeWidth="6"
            v-if="loadingData"
          />
        </div>
        <div
          class="border-t border-color-default dark:border-gray-600 p-4 text-left text-2xl font-bold text-default"
        >
          {{ totalItens }}
        </div>
      </div>

      <!-- Card 3: Upsells -->
      <div
        class="bg-white dark:bg-[#0b0b0e] p-4 px-0 shadow-lg rounded-lg border-solid border border-color-default"
      >
        <div
          class="font-bold text-lg mb-4 px-6 flex justify-between text-default"
        >
          Upsells
          <PrimeProgressSpinner
            style="width: 20px; height: 20px; margin: 0"
            strokeWidth="6"
            v-if="loadingData"
          />
        </div>
        <div
          class="border-t border-color-default dark:border-gray-600 p-4 text-left text-2xl font-bold text-default"
        >
          {{ upsells }}
        </div>
      </div>

      <!-- Card 4: Order Bumps -->
      <div
        class="bg-white dark:bg-[#0b0b0e] p-4 px-0 shadow-lg rounded-lg border-solid border border-color-default"
      >
        <div
          class="font-bold text-lg mb-4 px-6 flex justify-between text-default"
        >
          Order Bumps
          <PrimeProgressSpinner
            style="width: 20px; height: 20px; margin: 0"
            strokeWidth="6"
            v-if="loadingData"
          />
        </div>
        <div
          class="border-t border-color-default dark:border-gray-600 p-4 text-left text-2xl font-bold text-default"
        >
          {{ orderBumps }}
        </div>
      </div>

      <!-- Card 5: Valor em Comissões (com destaque) -->
      <div
        class="bg-white dark:bg-[#0b0b0e] p-4 px-0 shadow-lg rounded-lg border-solid border border-color-default"
      >
        <div
          class="font-bold text-lg mb-4 px-6 flex justify-between text-default"
        >
          Valor em comissões
          <PrimeProgressSpinner
            style="width: 20px; height: 20px; margin: 0"
            strokeWidth="6"
            v-if="loadingData"
          />
        </div>
        <div
          class="border-t border-color-default dark:border-gray-600 p-4 text-left text-2xl font-bold font-bold"
          style="color: #38A169;"
        >
          R$
          {{
            Number(valorComissoes).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}
        </div>
      </div>
    </div>

    <div class="px-10">
      <div
        class="bg-white dark:bg-[#0b0b0e] shadow-md rounded-lg p-6 px-0 mt-6 border-solid border border-color-default"
      >
        <div
          class="flex justify-between border-b border-color-default dark:border-gray-600 px-6 mb-4"
        >
          <h2 class="text-lg font-semibold mb-4 text-default">
            Histórico de Vendas
          </h2>
          <PrimeProgressSpinner
            style="width: 20px; height: 20px; margin: 0"
            strokeWidth="6"
            v-if="loadingData"
          />
        </div>

        <!-- PrimeDataTable -->
        <PrimeDataTable
          v-if="filteredVendas.length > 0"
          :value="filteredVendas"
          responsiveLayout="scroll"
          class="px-6"
          size="small"
        >
          <PrimeColumn field="acoees" header="Ações" class="text-left">
            <template #body="{ data }">
              <PrimeSplitButton
                icon="pi pi-ellipsis-v"
                menuButtonIcon="pi pi-sort-down-fill"
                :model="items"
                severity="secondary"
                outlined
                @click="popupExcluirRegistro(data)"
                class="py-1 px-2 w-7/12 float-start"
              />
            </template>
          </PrimeColumn>
          <PrimeColumn
            field="produto"
            header="Produto"
            class="text-link"
            sortable
          >
          </PrimeColumn>
          <PrimeColumn
            field="oferta"
            header="Oferta"
            class="text-link"
            sortable
          >
            <template #body="{ data }">
              {{ data.oferta?.value }}
            </template>
          </PrimeColumn>
          <PrimeColumn field="ID" header="pedido" sortable>
            <template #body="{ data }"> 86068{{ data.id }} </template>
          </PrimeColumn>
          <PrimeColumn field="transacao" header="transação" sortable>
            <template #body>
              T{{ Math.random().toString(36).substr(2, 11).toUpperCase() }}...
            </template>
          </PrimeColumn>
          <PrimeColumn field="comprador" header="comprador" sortable>
          </PrimeColumn>
          <PrimeColumn field="afiliado" header="afiliado(s)">
            <template #body="{ data }"> Venda Direta </template>
          </PrimeColumn>
          <PrimeColumn field="metodo" header="método">
            <template #body="{ data }">
              <!-- {{ data.metodo.id }} -->
              <img
                :src="getImageSrc(data.metodo?.value)"
                :width="data.metodo?.value == 'visa' ? '32px' : '26px'"
                class="mx-auto"
                alt=""
              />
            </template>
          </PrimeColumn>
          <PrimeColumn field="nacionalidade" header="nacionalidade">
            <template #body="{ data }">
              <img
                src="https://logodownload.org/wp-content/uploads/2022/05/brazil-flag-bandeira.png"
                width="24px"
                class="mx-auto"
                alt=""
              />
            </template>
          </PrimeColumn>
          <PrimeColumn field="comissao" header="comissão" sortable>
            <template #body="{ data }">
              <span class="font-bold">
                {{ formatNumberAsCurrency(data.comissao) }}
              </span>
            </template>
          </PrimeColumn>
          <PrimeColumn field="data" header="Data da Transação" sortable>
            <template #body="{ data }">
              {{ formatDateAsString(data.data) }} 1...
            </template>
          </PrimeColumn>
          <PrimeColumn field="data" header="Ultima Atualização" sortable>
            <template #body="{ data }">
              {{ formatDateAsString(data.data) }} 1...
            </template>
          </PrimeColumn>
          <PrimeColumn field="status.label" header="Status">
            <template #body="{ data }">
              <PrimeBadge
                :value="data.status.label"
                severity="warning"
                class="rounded px-4 text-green-500"
                style="
                  background-color: #305645;
                  font-weight: normal;
                  height: 20px;
                  padding: 0 6px;
                  margin-right: 5px;
                "
              ></PrimeBadge>
            </template>
          </PrimeColumn>
          <!-- <PrimeColumn class="py-0">
          <template #body="slotProps">
            <span class="flex gap-x-1.5 justify-center">
              <PrimeButton
                class="!p-2 w-10"
                icon="pi pi-trash"
                outlined
                size="small"
                severity="danger"
                @click="popupExcluirRegistro(slotProps.data)"
              />
            </span>
          </template>
        </PrimeColumn> -->
        </PrimeDataTable>

        <!-- Mensagem de "Sem registros" caso não haja vendas -->
        <div
          v-else
          class="flex flex-col items-center text-center text-gray-500"
        >
          <strong>Sem registros por aqui</strong>
          <p>Não há registros para serem exibidos!</p>
        </div>
      </div>
    </div>
  </main>

  <!-- <div class="w-100 text-center p-4">
    <PrimeButton
        icon="pi pi-plus"
        label="Adicionar Venda"
        severity="info"
        outlined
        @click="showModal = true"
      />
  </div> -->

  <div class="iconWhatsapp">
    <img src="@/assets/images/whatsapp.png" alt=""  />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import {
  formatNumberAsCurrency,
  formatDateAsString,
} from "~/utils/functions/formatData";
const totalPedidos = ref(0);
const totalItens = ref(0);
const upsells = ref(0);
const orderBumps = ref(0);
const valorComissoes = ref(0);
const startDate = ref(new Date());
const endDate = ref(new Date());
const vendas = ref([]);
const confirmDialog = useConfirmDialog();
const loadingData = ref(true);
const selectedPeriod = ref(null);
const selectPeriod = (days) => {
  selectedPeriod.value = days;
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - days);
  startDate.value = start;

  endDate.value = today;
};

const aplicarFiltros = () => {
  // window.location.reload();
  showFilters.value = !showFilters.value;
  loadingData.value = true;
  setTimeout(() => {
    loadingData.value = false;
  }, 1000);

  const dashboard = JSON.parse(localStorage.getItem("dashboard"));
  if (dashboard) {
    totalPedidos.value = dashboard.totalPedidos;
    totalItens.value = dashboard.totalItens;
    upsells.value = dashboard.upsells;
    orderBumps.value = dashboard.orderbumps;
    valorComissoes.value = dashboard.valorComissoes;
  }
};

useHead({
  title: 'Relatório de Vendas',
})

// Estado do modal
const showModal = ref(false);

// Dados do formulário
const formData = ref({
  data: null,
  status: null,
  valor: null,
  comprador: null,
  oferta: null,
  produto: null,
  metodo: null,
});

// Carregar vendas salvas no localStorage
onMounted(() => {
  const vendasSalvas = JSON.parse(localStorage.getItem("vendas")) || [];
  vendas.value = vendasSalvas;
  setTimeout(() => {
    loadingData.value = false;
  }, 1000);

  const dashboard = JSON.parse(localStorage.getItem("dashboard"));
  if (dashboard) {
    totalPedidos.value = dashboard.totalPedidos;
    totalItens.value = dashboard.totalItens;
    upsells.value = dashboard.upsells;
    orderBumps.value = dashboard.orderbumps;
    valorComissoes.value = dashboard.valorComissoes;
  }
});

const fechaBlur = () => {
  if (showFilters.value) {
    showFilters.value = !showFilters.value;
  }
  if (showModal.value) {
    showModal.value = !showModal.value;
  }
};

const atualizar_dados = () => {
  totalPedidos.value = 0;
  valorComissoes.value = 0;
  const vendasSalvas = JSON.parse(localStorage.getItem("vendas")) || [];
  vendasSalvas.forEach((venda) => {
    totalPedidos.value += 1;
    valorComissoes.value += venda.comissao;
  });
};

// Função para salvar a venda
const saveVenda = () => {
  // if (formData.value.data && formData.value.status && formData.value.valor) {
  const vendasSalvas = JSON.parse(localStorage.getItem("vendas")) || [];

  vendasSalvas.push({
    ...formData.value,
    id: vendasSalvas.length + 1, // Gera um ID simples
  });

  localStorage.setItem("vendas", JSON.stringify(vendasSalvas));

  showModal.value = false;
  formData.value = {
    data: null,
    status: null,
    valor: null,
    comprador: null,
    oferta: null,
    produto: null,
    metodo: null,
  };
  vendas.value = JSON.parse(localStorage.getItem("vendas"));
  atualizar_dados();
  // } else {
  //   alert("Por favor, preencha todos os campos!");
  // }
};

const excluirVenda = (id) => {
  const vendasSalvas = JSON.parse(localStorage.getItem("vendas")) || [];
  const vendasFiltradas = vendasSalvas.filter((venda) => venda.id !== id);
  localStorage.setItem("vendas", JSON.stringify(vendasFiltradas));
  vendas.value = vendasFiltradas;
  atualizar_dados();
};

const popupExcluirRegistro = (registro) => {
  confirmDialog.deleteConfirm(
    "Excluir a venda",
    `Deseja realmente excluir a venda "${registro.id}" ?`,
    () => {
      excluirVenda(registro.id);
    }
  );
};

const filteredVendas = computed(() => {
  return vendas.value.slice().reverse();
});

const showFilters = ref(false); // Controla a visibilidade do menu
const activeIndex = ref(null); // Controle do índice ativo no menu
const selectedStatuses = ref([]); // Status selecionados
const statuses = ref([
  { id: 1, value: false, label: "Abortado" },
  { id: 2, value: false, label: "Atrasado" },
  { id: 3, value: true, label: "Autorizado" },
  { id: 4, value: false, label: "Chargeback" },
  { id: 5, value: false, label: "Em Disputa" },
  { id: 6, value: false, label: "Encerrado" },
  { id: 7, value: false, label: "Expirado" },
  { id: 8, value: false, label: "Incompleta" },
  { id: 9, value: false, label: "Recusado" },
  {
    id: 10,
    value: false,
    label: "Reembolso Solicitado",
  },
  { id: 11, value: false, label: "Reclamado" },
  { id: 16, value: false, label: "Pendente" },
  {
    id: 12,
    value: false,
    label: "Período de Testes",
  },
  { id: 13, value: false, label: "Processando" },
  { id: 14, value: false, label: "Reembolsado" },
  { id: 15, value: false, label: "Grátis" },
]);
const metodos = ref([
  { id: 1, value: "mastercard", label: "Mastercard" },
  { id: 2, value: "visa", label: "Visa" },
  { id: 3, value: "elo", label: "Elo" },
]);

const ofertas = ref([
  { id: 1, value: "79C97M0N", label: "79C97M0N" },
  { id: 2, value: "Q47LR95T", label: "Q47LR95T" },
  { id: 3, value: "8IX5HF2V", label: "8IX5HF2V" },
  { id: 4, value: "7MV9K6Z6", label: "7MV9K6Z6" },
]);

// Funções para Marcar/Desmarcar Todos os Checkboxes
const selectAll = () => {
  selectedStatuses.value = statuses.value.map((status) => status.value);
};
const images = import.meta.glob("@/assets/images/logos/*.png", { eager: true });

const getImageSrc = (metodo) => {
  return images[`/assets/images/logos/${metodo ?? "mastercard"}.png`]?.default || images["/assets/images/logos/mastercard.png"].default;
};

const deselectAll = () => {
  selectedStatuses.value = [];
};

// Fechar o menu lateral
const handleClose = () => {
  showFilters.value = false;
};
// Componente de Card
const SummaryCard = defineProps({
  title: String,
  value: [String, Number],
  highlight: Boolean,
});
</script>

<style>
.pi-sort-down-fill {
  padding-bottom: 2px;
}
.p-inputtext {
  background-color: #ffffff !important; /* Fundo claro no modo claro */
  color: #000000 !important; /* Texto escuro no modo claro */
}

.dark .p-inputtext {
  background-color: #08090B !important; /* Fundo escuro no modo dark */
  color: #acb5bf !important; /* Texto branco no modo dark */
  border-color: #202020 !important;
}

/* Caso queira alterar a borda quando estiver em foco */
.p-inputtext:focus {
  border-color: #855be2 !important; /* Exemplo de borda roxa no foco */
}
/* Para alterar o fundo do input com base no tema */
.p-datatable .p-datatable-thead > tr > th {
  background-color: #ffffff !important; /* Fundo claro no modo claro */
  color: #000000 !important; /* Texto escuro no modo claro */
}
.dark .p-datatable .p-datatable-tbody > tr {
  background-color: transparent !important; /* Fundo escuro no modo dark */
  color: #d4d9df !important; /* Texto escuro no modo claro */
}
.dark .p-datatable .p-datatable .p-datatable-tbody > tr {
  background-color: #ffffff !important; /* Fundo claro no modo claro */
  color: #000000 !important; /* Texto escuro no modo claro */
}
.dark .p-datatable .p-datatable-tbody > tr > td {
  text-align: center;
  font-size: 0.8rem !important;
  padding: 0;
  border-color: #1d1b21 !important;
  background-color: transparent !important;
}
.dark .p-datatable .p-datatable-thead > tr > th {
  background-color: transparent !important; /* Fundo escuro no modo dark */
  color: #d4d9df !important; /* Texto branco no modo dark */
  text-transform: uppercase;
  font-size: 0.9rem;
  border: none !important;
  /* border-color: #6b6775 !important; */
  padding-left: 8px !important;
  padding-right: 8px !important;
}

/* Caso queira alterar a borda quando estiver em foco */
.p-datatable-table:focus {
  border-color: #855be2 !important; /* Exemplo de borda roxa no foco */
}
.p-dialog .p-dialog-header .p-dialog-content {
  background-color: #ffffff !important; /* Fundo claro no modo claro */
  color: #000000 !important; /* Texto escuro no modo claro */
}
.dark .p-dialog .p-dialog-header {
  background-color: #313030 !important; /* Fundo escuro no modo dark */
  color: #ffffff !important; /* Texto branco no modo dark */
}
.dark .p-dialog .p-dialog-content {
  background-color: #2e2e2e !important; /* Fundo escuro no modo dark */
  color: #ffffff !important; /* Texto branco no modo dark */
}

.dark .p-panel .p-panel-header {
  background-color: #050307 !important; /* Fundo escuro no modo dark */
  color: #ffffff !important; /* Texto branco no modo dark */
  border: none !important;
}
.dark .p-panel .p-panel-content {
  background-color: #2e2e2e !important; /* Fundo escuro no modo dark */
  color: #ffffff !important; /* Texto branco no modo dark */
  border: none !important;
}
.dark .p-dialog .p-dialog-footer {
  background-color: #2e2e2e !important; /* Fundo escuro no modo dark */
  color: #ffffff !important; /* Texto branco no modo dark */
  border: none !important;
}

.border-color-default {
  border-color: #1d1b21 !important;
}
.border-color-default-gray {
  border-color: #282828 !important;
}
.p-button.p-button-warning.p-button-outlined {
  color: #faad14 !important;
  height: 2.5rem;
  width: 272px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  font-weight: 500;
  transition: .2s;
}
.p-button.p-button-warning.p-button-outlined:hover {
  border: 2px solid #faad14;
  background: #faad14;
  color: #fff !important;
}
.p-button.p-button-primary.p-button-outlined {
  color: #855be2;
  height: 2.5rem;
  width: 114px;
  padding: 0 1.5rem;
  gap: .5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
.p-button.p-button-success.p-button-outlined {
  color: #38a169;
  height: 2.5rem;
  width: 164px;
  padding: 0 1.5rem;
  gap: .5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
.p-button.p-button-success.p-button-outlined:hover {
  border: 2px solid #38a169;
  background: #38a169;
  color: #fff !important;
}
.p-inputswitch.p-highlight .p-inputswitch-slider {
  background-color: #855be2;
}
.p-splitbutton-menubutton {
  border-left: none !important;
  padding-right: 7px !important;
}
.p-splitbutton-menubutton .p-button-icon::before {
  font-size: 8px;
}
.p-splitbutton-menubutton,
.p-splitbutton .p-splitbutton-defaultbutton {
  padding: 5px 0;
  background-color: #1e1e1e;
  color: #fff;
  border-color: #3e3e3e;
}
.p-splitbutton .p-splitbutton-defaultbutton {
  padding-left: 7px;
}
.hover-filtro:hover {
  opacity: 0.8;
}
.p-datatable-tbody {
  border: 1px solid #635e704f !important;
  border-radius: 20px;
}
.p-datatable-tbody td {
  color: #CBD5E0;
  font-size: 0.8rem !important;
}
.wcalendar {
  width: 91% !important;
}
.iconWhatsapp {

display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  margin: 0 !important;
  position: fixed !important;
  width: 60px !important;
  height: 60px !important;
  bottom: 30px !important;
  right: 30px !important;
  background-color: #00bd99 !important;
  color: #fff !important;
  border-radius: 50px !important;
  text-align: center !important;
  font-size: 30px !important;
  z-index: 1000 !important;
  transition: all .5s ease;
  cursor: pointer;
}
.iconWhatsapp:hover {
  background-color: #69cbb9 !important;
  transform: scale(1.2);
}



</style>
