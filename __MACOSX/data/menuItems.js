import {
    PAGE_DASHBOARD,
    PAGE_VENDAS
} from "~/utils/constants/pages";

export const useMenuItems = () => {
    const perfilUsuario = JSON.parse(window.localStorage.getItem('perfilUsuario'));
    const permissoes = usePermissoes();

    const itemsMenuPrincipal = [
        {
            label: 'DashBoard',
            icon: 'pi pi-objects-column',
            route: PAGE_DASHBOARD.path,
            role: PAGE_DASHBOARD.roles.listar,
        },
        {
            label: 'DashBoard',
            icon: 'pi pi-shop',
            route: '',
            role: PAGE_DASHBOARD.roles.listar,
        },
        {
            label: 'DashBoard',
            icon: 'pi pi-box',
            route: '',
            role: PAGE_DASHBOARD.roles.listar,
        },
        {
            label: 'DashBoard',
            icon: 'pi pi-users',
            route: '',
            role: PAGE_DASHBOARD.roles.listar,
        },
        {
            label: 'Minhas Vendas',
            icon: 'pi pi-shopping-cart',
            route: PAGE_VENDAS.path,
            role: PAGE_VENDAS.roles.listar,
        },
        {
            label: 'Minhas Vendas',
            icon: 'pi pi-arrow-right-arrow-left',
            route: '',
            role: PAGE_VENDAS.roles.listar,
        },
        {
            label: 'Minhas Vendas',
            icon: 'pi pi-history',
            route: '',
            role: PAGE_VENDAS.roles.listar,
        },
        {
            label: 'Minhas Vendas',
            icon: 'pi pi-chart-line',
            route: '',
            role: PAGE_VENDAS.roles.listar,
        },
        {
            label: 'Minhas Vendas',
            icon: 'pi pi-th-large',
            route: '',
            role: PAGE_VENDAS.roles.listar,
        },
        {
            label: 'Minhas Vendas',
            icon: 'pi pi-wallet',
            route: '',
            role: PAGE_VENDAS.roles.listar,
        },
        {
            label: 'Minhas Vendas',
            icon: 'pi pi-bullseye',
            route: '',
            role: PAGE_VENDAS.roles.listar,
        },
    ];
  
    const itemsSubmenuPerfil = [
      {
        label: perfilUsuario ? perfilUsuario.nome : '',
        items: [
          {
            label: 'Sair',
            command: () => navigateTo('/login'),
          },
        ],
      },
    ];

    const authRequest = useAuthRequest();
    const toast = useToastCustom();

    const logout = () => {
        authRequest.logout().then((response) => {
            toast.show(response.title, response.message, Severity.Warn);
            setTimeout(async () => {
                navigateTo('/login');
            }, 1000);
        });
    };

    const filtrarItensMenuPrincipal = () => {
        if (!perfilUsuario) {
            // Retorna um array vazio se o perfil do usuário não estiver disponível
            return [];
        }

        return itemsMenuPrincipal;

        // Filtra os itens do menu principal com base nas permissões do usuário
        return itemsMenuPrincipal.reduce((filteredItems, menu) => {
            if (menu.items) {
                const filteredSubMenu = menu.items.filter((item) =>
                    !item.role || permissoes.isPermitido(item.role),
                );

                if (filteredSubMenu.length > 0) {
                    // Adiciona o submenu filtrado apenas se houver itens permitidos
                    filteredItems.push({
                        ...menu,
                        items: filteredSubMenu,
                    });
                }
            } else if (permissoes.isPermitido(menu.role)) {
                // Adiciona o item do menu principal apenas se for permitido
                filteredItems.push(menu);
            }

            return filteredItems;
        }, []);
    };
 
    return { 
        itemsMenuPrincipal: filtrarItensMenuPrincipal(),
        itemsSubmenuPerfil,
    };
};
  