<template>
  <div
    class="min-h-screen bg-[#050307] transition-all duration-500 ease-in-out border-color-default p-4 border-r border-white"
    :style="{
  width: menuAberto ? 'calc(10% + 90px)' : '90px',
  // position: 'fixed',  // Alterado de 'absolute' para 'fixed'
  top: '0',
  left: '0',
  bottom: '0',
  padding:'0',
  zIndex: '1000'
}"

    @mouseenter="menuAberto = true"
    @mouseleave="menuAberto = false"
  >
    <!-- Logotipo -->
    <div class="text-center">
      <img
        v-if="menuAberto"
        src="@/assets/images/tictoLogoOriginal.png"
        alt="Logotipo"
        class="h-20 mx-auto ml-[20px] mt-[20px]"
        :class="{
          'animate-slide-bounce': menuAberto
        }"
      />
      <img
        v-else
        src="@/public/icon.ico"
        alt="icon"
        class="my-5 h-12 mx-auto"
      />
    </div>

    <!-- Lista de menus -->
    <nav class="mt-6 ">
      <ul>
        <li 
          v-for="menu in menus" 
          :key="menu.label" 
          class="relative group"
        >
          <router-link
            :to="menu.route"
            class="relative flex items-center space-x-4 pl-5 pt- text-lg text-white rounded-lg outline-none focus:outline-none hover:text-purple-500 
              before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 
              before:bg-transparent group-hover:before:bg-[linear-gradient(0deg,transparent,#501bf0_25%,#ed9c39_49%,#e53ac9_73%,transparent)]"
            :class="{ 'before:bg-[linear-gradient(0deg,transparent,#501bf0_25%,#ed9c39_49%,#e53ac9_73%,transparent)]': $route.path === menu.route }"
          >
            <span 
              v-html="menu.icon" 
              class="text-lg p-2 pl-5 pt-5 pb-3"
              :class="{ 'text-purple-500': $route.path === menu.route, 'hover:text-purple-500': true }"
            ></span>
            <span v-if="menuAberto" class="text-white textMenu">
              {{ menu.label }}
            </span>
          </router-link>          
        </li>
      </ul>
      <!-- <div class="border-t border-white border-color-default"></div> -->

<div class="pt-2"></div>
<!-- MozartLogo -->
<div >
<div class="border-t border-white border-color-default  pt-.8"></div>
   <img
     v-if="menuAberto"
     src="@/assets/images/mozart.png"
     alt="Logotipo"
     class="h-20 mx-auto ml-[10px] pr-2"
   />
   <img
     v-else
     src="@/assets/images/mozartIcon.png"
     alt="icon"
     class="my-5 h-15 w-15 mx-auto pr-2"
   />
 </div> 
    </nav>




 

  </div>
</template>


<style>
.textMenu {
  font-size: 13.5px; /* ou 0.75rem */
  white-space: nowrap;
  overflow: hidden;
  opacity: 0;
  width: 0;
  display: inline-block;
  transition: opacity 0.5s ease-out, width 0.5s ease-out;
}

.textMenu.show {
  opacity: 1;
  width: auto;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  position: relative; /* Faz com que o item de menu não seja afetado pela mudança do tamanho do menu */
}

nav li > a {
  display: flex;
  align-items: center;
}

nav li > a > span {
  transition: transform 0.3s ease;
}

/* CSS para a animação personalizada */
@keyframes slideBounce {
  0% {
    transform: translateY(-100vh); /* Inicia acima da tela */
  }
  40% {
    transform: translateY(0px); /* Quica um pouco */
  }
  40% {
    transform: translateY(0); /* Para no lugar final */
  }
}

.animate-slide-bounce {
  animation: slideBounce 1s ease-out forwards; /* Aumentei o tempo para suavizar */
}

</style>



<script>
export default {
  data() {
    return {
      menuAberto: false,
      menus: [
        {
          label: "Dashboard",
          icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path></svg>`,
          route: "/sistema/dashboard",
        },
        {
          label: "Vitrine de Produtos",
          icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 13.2422V20H22V22H2V20H3V13.2422C1.79401 12.435 1 11.0602 1 9.5C1 8.67286 1.22443 7.87621 1.63322 7.19746L4.3453 2.5C4.52393 2.1906 4.85406 2 5.21132 2H18.7887C19.1459 2 19.4761 2.1906 19.6547 2.5L22.3575 7.18172C22.7756 7.87621 23 8.67286 23 9.5C23 11.0602 22.206 12.435 21 13.2422ZM19 13.9725C18.8358 13.9907 18.669 14 18.5 14C17.2409 14 16.0789 13.478 15.25 12.6132C14.4211 13.478 13.2591 14 12 14C10.7409 14 9.5789 13.478 8.75 12.6132C7.9211 13.478 6.75911 14 5.5 14C5.331 14 5.16417 13.9907 5 13.9725V20H19V13.9725ZM5.78865 4L3.35598 8.21321C3.12409 8.59843 3 9.0389 3 9.5C3 10.8807 4.11929 12 5.5 12C6.53096 12 7.44467 11.3703 7.82179 10.4295C8.1574 9.59223 9.3426 9.59223 9.67821 10.4295C10.0553 11.3703 10.969 12 12 12C13.031 12 13.9447 11.3703 14.3218 10.4295C14.6574 9.59223 15.8426 9.59223 16.1782 10.4295C16.5553 11.3703 17.469 12 18.5 12C19.8807 12 21 10.8807 21 9.5C21 9.0389 20.8759 8.59843 20.6347 8.19746L18.2113 4H5.78865Z"></path></svg>`,
          route: "",
        },
         {
           label: "Meus Produtos",
           icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"></path></svg>`,
           route: "",
         },
         {
           label: "Meus Afiliados",
           icon: `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`,
           route: "",
         },
        {
          label: "Minhas Vendas",
          icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>`,
          route: "/sistema/financeiro/vendas",
        },
        {
          label: "Minhas Assinatura",
          icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 4H21C21.5523 4 22 4.44772 22 5V12H20V6H6V9L1 5L6 1V4ZM18 20H3C2.44772 20 2 19.5523 2 19V12H4V18H18V15L23 19L18 23V20Z"></path></svg>`,
          route: "",
        },
        {
          label: "Recuperacao de Compra",
          icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9a9 9 0 00-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7a6.995 6.995 0 01-11.06 5.7l-1.42 1.44A9 9 0 1012 3z"></path></svg>`,
          route: "",
        },
        {
          label: "Relatorios",
          icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 0 0-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 0 0-11.3 0L266.3 586.7a8.03 8.03 0 0 0 0 11.3l39.5 39.7z"></path></svg>`,
          route: "",
        },
        {
          label: "TicTools",
          icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.75 2.5C9.09721 2.5 11 4.40279 11 6.75V11H6.75C4.40279 11 2.5 9.09721 2.5 6.75C2.5 4.40279 4.40279 2.5 6.75 2.5ZM9 9V6.75C9 5.50736 7.99264 4.5 6.75 4.5C5.50736 4.5 4.5 5.50736 4.5 6.75C4.5 7.99264 5.50736 9 6.75 9H9ZM6.75 13H11V17.25C11 19.5972 9.09721 21.5 6.75 21.5C4.40279 21.5 2.5 19.5972 2.5 17.25C2.5 14.9028 4.40279 13 6.75 13ZM6.75 15C5.50736 15 4.5 16.0074 4.5 17.25C4.5 18.4926 5.50736 19.5 6.75 19.5C7.99264 19.5 9 18.4926 9 17.25V15H6.75ZM17.25 2.5C19.5972 2.5 21.5 4.40279 21.5 6.75C21.5 9.09721 19.5972 11 17.25 11H13V6.75C13 4.40279 14.9028 2.5 17.25 2.5ZM17.25 9C18.4926 9 19.5 7.99264 19.5 6.75C19.5 5.50736 18.4926 4.5 17.25 4.5C16.0074 4.5 15 5.50736 15 6.75V9H17.25ZM13 13H17.25C19.5972 13 21.5 14.9028 21.5 17.25C21.5 19.5972 19.5972 21.5 17.25 21.5C14.9028 21.5 13 19.5972 13 17.25V13ZM15 15V17.25C15 18.4926 16.0074 19.5 17.25 19.5C18.4926 19.5 19.5 18.4926 19.5 17.25C19.5 16.0074 18.4926 15 17.25 15H15Z"></path></svg>`,
          route: "",
        },
        {
          label: "Saques",
          icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"></path></svg>`,
          route: "",
        },
        {
          label: "Indique e Ganhe",
          icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M14.5 2.5c0 1.5-1.5 6-1.5 6h-2S9.5 4 9.5 2.5a2.5 2.5 0 015 0zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4.08-4.89c.18-.75.33-1.47.39-2.06A9.996 9.996 0 0122 12c0 5.52-4.48 10-10 10S2 17.52 2 12c0-3.92 2.25-7.31 5.53-8.95.07.59.21 1.32.39 2.06A8.028 8.028 0 004 12c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.93-1.58-5.49-3.92-6.89zM18 12c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2 .98-3.77 2.48-4.86.23.81.65 2.07.65 2.07C8.43 9.93 8 10.92 8 12c0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.08-.43-2.07-1.13-2.79 0 0 .41-1.22.65-2.07A5.998 5.998 0 0118 12z"></path></svg>`,
          route: "",
        },
      ],
      
    };
    
    
  },
  watch: {
    menuAberto(newVal) {
      if (newVal) {
        // Quando o menu estiver aberto, mostre as letras suavemente
        setTimeout(() => {
          const menus = document.querySelectorAll('.textMenu');
          menus.forEach(menu => menu.classList.add('show'));
        }, 100); // Aguarda o tempo necessário para a transição do menu
      } else {
        // Quando o menu for fechado, remova a classe 'show' suavemente
        const menus = document.querySelectorAll('.textMenu');
        menus.forEach(menu => menu.classList.remove('show'));
      }
    },
  },
};
</script>


