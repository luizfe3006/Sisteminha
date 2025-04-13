export const PAGE_DASHBOARD = {
  path: "/sistema/dashboard",
  roles: {
    listar: "usuarios-listar",
    visualizar: "usuarios-visualizar",
    criar: "usuarios-criar",
    editar: "usuarios-editar",
    excluir: "usuarios-excluir",
  }
};

export const PAGE_VENDAS = {
  path: "/sistema/financeiro/vendas",
  roles: {
    listar: "usuarios-listar",
    visualizar: "usuarios-visualizar",
    criar: "usuarios-criar",
    editar: "usuarios-editar",
    excluir: "usuarios-excluir",
  }
};
export const PAGE_USUARIOS = {
  path: "/sistema/controle-acesso/usuarios",
  roles: {
    listar: "usuarios-listar",
    visualizar: "usuarios-visualizar",
    criar: "usuarios-criar",
    editar: "usuarios-editar",
    excluir: "usuarios-excluir",
    "associar-grupo": "usuarios-associar-grupo",
    "desassociar-grupo": "usuarios-desassociar-grupo",
    "associar-organizacao": "usuarios-associar-organizacao",
    "desassociar-organizacao": "usuarios-desassociar-organizacao",
  },
};