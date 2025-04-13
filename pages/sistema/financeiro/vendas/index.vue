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
          label="Importar Código de Rastreio"
          severity="warning"
          outlined
        >
          <template #icon>
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
              <path
                d="M5 13v-8a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5.5m-9.5 -2h7m-3 -3l3 3l-3 3"
              ></path>
            </svg>
          </template>
        </PrimeButton>
        <PrimeButton
          label="Exportar CSV"
          severity="success"
          outlined
          @click="showModal = true"
        >
          <template #icon>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 384 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm60.1 106.5L224 336l60.1 93.5c5.1 8-.6 18.5-10.1 18.5h-34.9c-4.4 0-8.5-2.4-10.6-6.3C208.9 405.5 192 373 192 373c-6.4 14.8-10 20-36.6 68.8-2.1 3.9-6.1 6.3-10.5 6.3H110c-9.5 0-15.2-10.5-10.1-18.5l60.3-93.5-60.3-93.5c-5.2-8 .6-18.5 10.1-18.5h34.8c4.4 0 8.5 2.4 10.6 6.3 26.1 48.8 20 33.6 36.6 68.5 0 0 6.1-11.7 36.6-68.5 2.1-3.9 6.2-6.3 10.6-6.3H274c9.5-.1 15.2 10.4 10.1 18.4zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"
              ></path>
            </svg>
          </template>
        </PrimeButton>
        <PrimeButton
          label="Filtros"
          severity="primary"
          outlined
          @click="showFilters = !showFilters"
        >
          <template #icon>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"
              ></path>
            </svg>
          </template>
        </PrimeButton>
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
    <Transition name="slide-left">
      <div
        v-if="showFilters"
        class="fixed top-0 right-0 h-full shadow-lg z-[4001] flex flex-col"
        :style="{ width: '520px' }"
      >
        <!-- Título fixo no topo -->
        <div
          class="p-4 pb-8 pt-6 -mb-2 flex justify-between items-center bg-transparent"
        >
          <span class="font-medium text-[17px]">Filtros</span>
        </div>

        <!-- Área de conteúdo com rolagem -->
        <div
          class="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-4"
        >
          <PrimePanel
            v-panel-header-clickable
            class="panel2 header-clickable"
            header="Período"
            toggleable
          >
            <template #togglericon="slotProps">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 16 16"
                :fill="slotProps.collapsed ? '#cbd5e005' : '#0c63e4'"
                :style="{
                  transform: slotProps.collapsed
                    ? 'rotate(0deg)'
                    : 'rotate(-180deg)',
                  transition: 'transform 0.3s ease',
                }"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </template>
            <!-- Seção de Seleção de Período -->
            <div class="p-4">
              <div class="mb-2">
                <div class="mt-4 flex flex-row gap-6">
                  <!-- PrimeCalendars para selecionar intervalo de datas -->
                  <div class="mb-4">
                    <span>De</span>
                    <PrimeCalendar
                      v-model="startDate"
                      :dateFormat="'dd/mm/yy'"
                      class="wcalendar"
                      :max-date="new Date()"
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
                      :max-date="new Date()"
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
                <div class="grid grid-cols-5 gap-2 gap-y-4 mt-5">
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
                    {{
                      period < 46 ? `${period}d` : `${Math.round(period / 30)}m`
                    }}
                  </div>
                </div>
              </div>
            </div>
          </PrimePanel>
          <PrimePanel
            v-panel-header-clickable
            class="panel2 header-clickable"
            header="Status"
            toggleable
          >
            <template #togglericon="slotProps">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 16 16"
                :fill="slotProps.collapsed ? '#cbd5e005' : '#0c63e4'"
                :style="{
                  transform: slotProps.collapsed
                    ? 'rotate(0deg)'
                    : 'rotate(-180deg)',
                  transition: 'transform 0.3s ease',
                }"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </template>
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
          <PrimePanel class="panel3 empty-panel" header="Pedidos"></PrimePanel>
          <PrimePanel class="panel3 empty-panel" header="Transações">
          </PrimePanel>
          <PrimePanel class="panel3 empty-panel" header="Data Finalizada">
          </PrimePanel>
          <PrimePanel class="panel3 empty-panel" header="Comprador">
          </PrimePanel>
          <PrimePanel class="panel3 empty-panel" header="Afiliado">
          </PrimePanel>
          <PrimePanel class="panel3 empty-panel" header="Produtos">
          </PrimePanel>
          <PrimePanel class="panel3 empty-panel" header="Ofertas"> </PrimePanel>
          <PrimePanel class="panel3 empty-panel" header="Tipos de Itens">
          </PrimePanel>
          <PrimePanel class="panel3 empty-panel" header="Método de Pagamento">
          </PrimePanel>
          <PrimePanel class="panel3 empty-panel" header="Parcelas">
          </PrimePanel>
          <PrimePanel class="panel3 empty-panel" header="Mensalidades Pagas">
          </PrimePanel>
          <PrimePanel class="panel3 empty-panel" header="Tipos de Comissão">
          </PrimePanel>
          <PrimePanel class="panel3 empty-panel" header="Código de Cupom">
          </PrimePanel>
          <PrimePanel
            class="panel3 empty-panel mb-4"
            header="Origem"
            style="padding-bottom: 50px"
          >
          </PrimePanel>

          <div
            class="px-2 py-4 mb-2 fixed gap-x-3 grid grid-cols-[70%_1fr] pr-4"
            style="bottom: 0; background-color: #000; width: 520px"
          >
            <PrimeButton
              class="primary hoverBtn w-[270px] bg-black dark:bg-[#855be2] border-none text-ms font-semibold justify-center"
              @click="aplicarFiltros()"
            >
              Aplicar Filtro
            </PrimeButton>
            <PrimeButton
              outlined
              class="primary hoverBtn w-[91px] hover:text-white text-[#855be2] bg-black text-ms font-semibold justify-center"
              style="border-color: #855be2"
            >
              Limpar
            </PrimeButton>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Blur na tela -->
    <div
      v-if="showFilters || showModal"
      class="fixed inset-0 bg-black/5 backdrop-blur-md z-40"
      @click="fechaBlur()"
    ></div>

    <!-- Cards de Resumo -->
    <div class="grid grid-cols-[287px,1fr,1fr,1fr,287px] gap-8 mt-8 px-10">
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
          style="color: #38a169"
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
          <PrimeColumn
            field="acoees"
            header="Ações"
            class="text-left actions-column"
          >
            <template #body="{ data }">
              <PrimeSplitButton
                icon="pi pi-ellipsis-v"
                menuButtonIcon="pi pi-sort-down-fill"
                :model="items"
                severity="secondary"
                outlined
                @click="popupExcluirRegistro(data)"
                class="p-1 w-[50px] float-start"
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
              <div class="flex items-center justify-center">
                <PrimeBadge
                  severity="warning"
                  class="rounded px-4 text-green-500"
                  style="
                    background-color: #305645;
                    font-weight: normal;
                    height: 20px;
                    padding: 0 6px;
                    margin-right: 5px;
                  "
                >
                  <span class="flex items-center">
                    {{ data.status.label }}
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      version="1.2"
                      baseProfile="tiny"
                      viewBox="0 0 24 24"
                      data-tip="Recorrência"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      currentItem="false"
                      class="ml-1"
                    >
                      <path
                        d="M16.5 7h-2.086l1.293-1.293c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-3.707 3.707 3.707 3.707c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-1.293-1.293h2.086c1.379 0 2.5 1.346 2.5 3s-1.346 3-3 3c-.553 0-1 .448-1 1s.447 1 1 1c2.757 0 5-2.243 5-5s-2.019-5-4.5-5zM8.293 12.293c-.391.391-.391 1.023 0 1.414l1.293 1.293h-2.086c-1.379 0-2.5-1.346-2.5-3s1.346-3 3-3c.553 0 1-.448 1-1s-.447-1-1-1c-2.757 0-5 2.243-5 5s2.019 5 4.5 5h2.086l-1.293 1.293c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l3.707-3.707-3.707-3.707c-.391-.391-1.023-.391-1.414 0z"
                      ></path>
                    </svg>
                  </span>
                </PrimeBadge>
              </div>
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
    <img src="@/assets/images/whatsapp.png" alt="" />
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

const vPanelHeaderClickable = {
  mounted(el) {
    const header = el.querySelector(".p-panel-header");
    if (header) {
      header.addEventListener("click", (event) => {
        // Find and click the toggle icon if the click wasn't directly on it
        const toggleIcon = header.querySelector(".p-panel-header-icon");
        if (toggleIcon && !event.target.closest(".p-panel-header-icon")) {
          toggleIcon.click();
        }
      });
    }
  },
};

useHead({
  title: "Relatório de Vendas",
});

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

  setInterval(() => {
    mudaLabelCalendario();
  }, 100);

  const dashboard = JSON.parse(localStorage.getItem("dashboard"));
  if (dashboard) {
    totalPedidos.value = dashboard.totalPedidos;
    totalItens.value = dashboard.totalItens;
    upsells.value = dashboard.upsells;
    orderBumps.value = dashboard.orderbumps;
    valorComissoes.value = dashboard.valorComissoes;
  }
});

const mudaLabelCalendario = () => {
  document
    .querySelectorAll(".p-datepicker-calendar th span")
    .forEach(function (elemento) {
      switch (elemento.textContent) {
        case "Do":
          elemento.textContent = "dom";
          break;
        case "Se":
          elemento.textContent = "seg";
          break;
        case "Te":
          elemento.textContent = "ter";
          break;
        case "Qa":
          elemento.textContent = "qua";
          break;
        case "Qi":
          elemento.textContent = "qui";
          break;
        case "Sx":
          elemento.textContent = "sex";
          break;
        case "Sa":
          elemento.textContent = "sáb";
          break;
        default:
          break;
      }
    });
};

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
  return (
    images[`/assets/images/logos/${metodo ?? "mastercard"}.png`]?.default ||
    images["/assets/images/logos/mastercard.png"].default
  );
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
  background-color: #08090b !important; /* Fundo escuro no modo dark */
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
  border: 1px solid #faad14;
  color: #faad14 !important;
  height: 2.5rem;
  padding: 0 22px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: 0.2s;
}
.p-button.p-button-warning.p-button-outlined:hover {
  border: 1px solid #faad14;
  background: #faad14;
  color: #fff !important;
}
.p-button.p-button-primary.p-button-outlined {
  border: 1px solid #855be2;
  color: #855be2;
  height: 2.5rem;
  padding: 0 22px !important;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
.p-button.p-button-success.p-button-outlined {
  border: 1px solid #38a169;
  color: #38a169;
  height: 2.5rem;
  padding: 0 22px !important;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
.p-button.p-button-success.p-button-outlined:hover {
  border: 1px solid #38a169;
  background: #38a169;
  color: #fff !important;
}
.p-inputswitch.p-highlight .p-inputswitch-slider {
  background-color: #855be2;
}
.p-panel .p-panel-header .p-panel-header-icon:hover {
  background-color: transparent !important;
}
.p-splitbutton-menubutton {
  border-left: none !important;
  padding-right: 4px !important;
  position: relative !important;
}
.p-splitbutton-menubutton .p-button-icon::before {
  font-size: 6px !important;
  position: absolute !important;
  right: 9px !important;
  top: 48% !important;
  transform: translateY(-50%) !important;
}
.pi-ellipsis-v:before {
  margin-left: 6px !important;
  width: 4px;
}
.p-splitbutton-menubutton,
.p-splitbutton .p-splitbutton-defaultbutton {
  padding: 5px 0;
  background-color: #ffffff0a;
  color: #fff;
  border-color: #5a5a5b35;
}
.p-datatable-tbody .p-splitbutton .p-splitbutton-defaultbutton {
  border-radius: 4px 0 0 4px !important;
  padding-left: 5px !important;
}

.p-datatable-tbody .p-splitbutton .p-splitbutton-menubutton {
  border-radius: 0 4px 4px 0 !important;
}
.hover-filtro:hover {
  opacity: 0.8;
}
.p-datatable-tbody {
  border: 1px solid #635e704f !important;
  border-radius: 20px;
}
.p-datatable-tbody td {
  color: #cbd5e0;
  font-size: 0.8rem !important;
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
  transition: all 0.5s ease;
  cursor: pointer;
}
.iconWhatsapp:hover {
  background-color: #69cbb9 !important;
  transform: scale(1.2);
}

/* Animação de slide para o painel lateral */
.slide-left-enter-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
}

.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
}

.header-clickable .p-panel-header {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.header-clickable .p-panel-header:hover {
  background-color: rgba(133, 91, 226, 0.05);
}

.empty-panel .p-toggleable-content {
  display: none;
}

.empty-panel .p-panel-header {
  padding-bottom: 10px !important;
  border-radius: 0 !important;
}

.p-datatable-tbody .p-badge {
  width: 95%;
  height: 24px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7.5px !important;
}

.actions-column .p-column-header-content {
  justify-content: start;
}

.p-row-even td {
  width: 136px !important;
}

.p-datatable-thead th {
  width: 136px !important;
}

.p-column-header-content {
  justify-content: center;
}

.p-column-header-content .p-sortable-column-icon {
  width: 12px;
  height: 12px;
  color: #635e70;
}
</style>
