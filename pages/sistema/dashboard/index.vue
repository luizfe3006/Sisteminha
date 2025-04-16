<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-5 text-default">Dashboard</h2>
    <div
      class="lg:w-8/12 py-4 pt-2 px-0 bg-white dark:bg-[#0b0b0e] shadow-md rounded-lg border-solid border border-color-default"
    >
      <!-- Cabeçalho -->
      <div
        class="flex justify-between items-center p-5 pb-2 pt-0 text-black dark:text-white border-solid border-b border-color-default"
        as
      >
        <h2 class="text-lg font-bold text-center text-default">
          Gráfico de receitas
        </h2>

        <div class="flex items-center space-x-4">
          <PrimeProgressSpinner
            v-if="loadingGrafico"
            style="width: 20px; height: 20px; margin: 0"
            stroke-width="6"
          />
          <!-- Grupo de Input -->
          <PrimeInputGroup class="w-auto group-calendar rounded-lg">
            <PrimeCalendar
              ref="calendarRefInicio"
              v-model="inicio"
              class="w-60 dark:bg-black dark:text-white bg-white text-black"
            >
              <template #date="slotProps">
                <div
                  @mouseover="hoverInitDate = slotProps.date"
                  @mouseleave="hoverInitDate = null"
                  v-if="isMarked(slotProps.date)"
                  class="marcado"
                >
                  {{ slotProps.date.day }}
                </div>
                <div
                  @mouseover="hoverInitDate = slotProps.date"
                  @mouseleave="hoverInitDate = null"
                  v-else
                >
                  {{ slotProps.date.day }}
                </div>
              </template>
            </PrimeCalendar>
            <PrimeButton
              :icon="'pi pi-calendar'"
              class="bg-blue-500 text-[#cbd5e0] dark:bg-[#08090b] border-none"
              @click="openCalendarInicio"
            />
          </PrimeInputGroup>

          <PrimeInputGroup class="w-auto group-calendar rounded-lg">
            <PrimeCalendar
              ref="calendarRefFim"
              v-model="fim"
              class="w-60 dark:bg-black dark:text-white bg-white text-black"
            >
              <template #date="slotProps">
                <div
                  @mouseover="hoverEndDate = slotProps.date"
                  @mouseleave="hoverEndDate = null"
                  v-if="isMarked(slotProps.date)"
                  class="marcado"
                >
                  {{ slotProps.date.day }}
                </div>
                <div
                  @mouseover="hoverEndDate = slotProps.date"
                  @mouseleave="hoverEndDate = null"
                  v-else
                >
                  {{ slotProps.date.day }}
                </div>
              </template>
            </PrimeCalendar>
            <PrimeButton
              :icon="'pi pi-calendar'"
              class="bg-blue-500 text-white dark:bg-[#08090b] border-none"
              @click="openCalendarFim"
            />
          </PrimeInputGroup>
        </div>
      </div>

      <!-- Gráfico -->
      <PrimeChart
        type="line"
        :data="chartData"
        :options="chartOptions"
        class="text-black dark:text-white mt-4 px-4"
        height="370px"
      />
    </div>
  </div>
</template>

<script setup>
import { formatDateAsString } from "~/utils/functions/formatData";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  parse,
  format,
} from "date-fns";
import { ptBR } from "date-fns/locale";

const inicio = ref(startOfMonth(new Date())); // Primeiro dia do mês atual
const fim = ref(endOfMonth(new Date())); // Último dia do mês atual

const rawData = ref([]);
const loadingGrafico = ref(false);

const hoverInitDate = ref(null);
const hoverEndDate = ref(null);

function isMarked(date) {
  const current = new Date(date.year, date.month, date.day);

  const start = inicio.value;
  const end = fim.value;

  const isHoverValidInit =
    !hoverInitDate.value ||
    new Date(
      hoverInitDate.value.year,
      hoverInitDate.value.month,
      hoverInitDate.value.day
    ) <= end;

  const isHoverValidEnd =
    !hoverEndDate.value ||
    new Date(
      hoverEndDate.value.year,
      hoverEndDate.value.month,
      hoverEndDate.value.day
    ) >= start;

  const hoverStart =
    hoverInitDate.value && isHoverValidInit
      ? new Date(
          hoverInitDate.value.year,
          hoverInitDate.value.month,
          hoverInitDate.value.day
        )
      : start;

  const hoverEnd =
    hoverEndDate.value && isHoverValidEnd
      ? new Date(
          hoverEndDate.value.year,
          hoverEndDate.value.month,
          hoverEndDate.value.day
        )
      : end;

  const min = new Date(Math.min(hoverStart.getTime(), hoverEnd.getTime()));
  const max = new Date(Math.max(hoverStart.getTime(), hoverEnd.getTime()));

  return current >= min && current <= max;
}

const aggregateSales = (sales) => {
  const groupedData = {};

  // Agrupar e somar as vendas
  sales.forEach((sale) => {
    const date = formatDateAsString(sale.data);
    if (groupedData[date]) {
      groupedData[date] += sale.comissao;
    } else {
      groupedData[date] = sale.comissao;
    }
  });

  // Converter o objeto agrupado para um array
  return Object.keys(groupedData).map((date) => ({
    date,
    revenue: groupedData[date],
  }));
};

const animacaoLoadingGrafico = () => {
  loadingGrafico.value = true;
  setTimeout(() => {
    loadingGrafico.value = false;
  }, 1000);
};

// Recuperar as vendas do localStorage e agrupar os dados
onMounted(() => {
  const storedSales = JSON.parse(localStorage.getItem("vendas")) || [];
  rawData.value = aggregateSales(storedSales);

  animacaoLoadingGrafico();
  setInterval(() => {
    mudaLabelCalendario();
  }, 100);
});
// Referência para o calendário
const calendarRefInicio = ref(null);
const calendarRefFim = ref(null);

useHead({
  title: "Dashboard",
});

const openCalendarInicio = async () => {
  if (calendarRefInicio.value) {
    await nextTick(); // Aguarda o próximo ciclo para garantir que a referência está disponível
    const inputEl = calendarRefInicio.value.$el.querySelector("input"); // Pega o input interno
    if (inputEl) {
      inputEl.focus(); // Foca o input para abrir o calendário
    }
  }
};

const openCalendarFim = async () => {
  if (calendarRefFim.value) {
    await nextTick(); // Aguarda o próximo ciclo para garantir que a referência está disponível
    const inputEl = calendarRefFim.value.$el.querySelector("input"); // Pega o input interno
    if (inputEl) {
      inputEl.focus(); // Foca o input para abrir o calendário
    }
  }
};

const filteredData = computed(() => {
  if (!inicio.value || !fim.value) return [];

  // Gera uma lista com todas as datas entre início e fim no formato dd/MM/yyyy
  const allDates = eachDayOfInterval({
    start: inicio.value,
    end: addDays(fim.value, 1),
  }).map(formatDateAsString);

  // Converte rawData em um objeto para acesso rápido, adicionando 1 dia a cada data
  const salesMap = rawData.value.reduce((acc, sale) => {
    const pasedDate = parse(sale.date, "dd/MM/yyyy", new Date());
    const newDate = addDays(pasedDate, 1); // Adiciona 1 dia
    const date = format(newDate, "dd/MM/yyyy", { locale: ptBR });
    acc[date] = (acc[date] || 0) + sale.revenue;
    return acc;
  }, {});

  // Retorna todas as datas com revenue correto
  return allDates.map((date) => ({
    date,
    revenue: salesMap[date] || 0, // Se não houver venda, revenue será 0
  }));
});

watch(
  () => inicio.value,
  () => {
    animacaoLoadingGrafico();
  }
);

watch(
  () => fim.value,
  () => {
    animacaoLoadingGrafico();
  }
);

const chartData = computed(() => ({
  labels: filteredData.value.slice(1).map((d) => {
    const [dia, mes, ano] = d.date.split("/");
    const date = new Date(Date.UTC(ano, mes - 1, dia));

    return date
      .toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      })
      .replace(" de ", " ")
      .replace(".", "");
  }),
  datasets: [
    {
      label: "Valor total",
      data: filteredData.value.slice(1).map((d) => d.revenue),
      borderColor: "#5735ee",
      backgroundColor: "#5735ee",
      borderWidth: 2,
      fill: false,
    },
  ],
}));

// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       display: true,
//       labels: {
//         font: {
//           size: 14,
//         },
//       },
//     },
//     tooltip: {
//       callbacks: {
//         label: (tooltipItem) => {
//           let value = tooltipItem.raw; // Pega o valor bruto
//           return `Valor total: ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;        },
//       },
//     },
//   },
//   scales: {
//     y: {
//       type: "linear",
//       beginAtZero: true,
//       ticks: {
//         stepSize: 100,
//       }
//     }
//   },
// };

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
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index", // Permite mostrar o tooltip ao passar o mouse em qualquer ponto da linha
    intersect: false, // Garante que o tooltip apareça na linha, não só nos pontos
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      enabled: true, // Ativa o tooltip
      mode: "index", // Mantém o tooltip visível conforme o mouse se move sobre a linha
      intersect: false, // Faz com que o tooltip apareça mesmo sem estar sobre um ponto específico
      callbacks: {
        label: (tooltipItem) => {
          const value = tooltipItem.raw; // Pega o valor bruto
          return `Valor total: ${value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;
        },
      },
    },
  },
};
</script>

<style>
.p-calendar {
  background: rgba(255, 255, 255, 0.1) !important; /* Fundo semi-transparente */
  backdrop-filter: blur(10px); /* Desfoque no fundo */
  border-radius: 12px; /* Bordas arredondadas */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borda sutil */
}

.dark .p-calendar {
  background: rgba(0, 0, 0, 0.3) !important; /* Fundo escuro para o modo dark */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borda sutil */
}

.p-calendar .p-inputtext {
  background: transparent !important; /* Fundo transparente para o input */
  color: #ffffff !important; /* Texto branco */
  border: none !important; /* Remove bordas padrão */
}

.p-calendar .p-inputtext:focus {
  border-color: #855be2 !important; /* Exemplo de borda roxa no foco */
}

/* Adiciona o efeito de sombra nos elementos de input */
.p-calendar {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* Para alterar o fundo do input com base no tema */
.p-inputtext {
  background-color: #ffffff !important; /* Fundo claro no modo claro */
  color: #000000 !important; /* Texto escuro no modo claro */
}

.dark .p-inputtext {
  /* background-color: #08090b !important; /* Fundo escuro no modo dark */
  color: #cbd5e0 !important; /* Texto branco no modo dark */
  /* border-color: #1d1b21 !important; */
}

.dark .group-calendar .p-inputtext {
  border-width: 1px 0 1px 1px;
}

.dark .group-calendar {
  background-color: #0b0b0e !important; /* Fundo escuro no modo dark */
  color: #ffffff !important; /* Texto branco no modo dark */
  border: 1px solid #1d1b21 !important;
}

.border-color-default {
  border-color: #1d1b21 !important;
}

.dark .group-calendar .p-inputtext {
  border-width: 0;
}
</style>
