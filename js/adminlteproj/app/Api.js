
export class Api {
    async panelInfo() {
        return {
            title: "AdminLTE Project",
            version: "1.0.0",
            menu: [
                { title: "Sistema / Usuários", link: 'sistema/usuarios' },
                { title: "Sistema / Configurações / Geral", link: 'sistema/configuracoes/geral' },
                { title: "Sistema / Configurações / Avançado", link: 'sistema/configuracoes/avancado' },

                { title: "Relatórios / Vendas", link: 'relatorios/vendas' },
                { title: "Relatórios / Financeiro", link: 'relatorios/financeiro' },
                { title: "Relatórios / Estoque", link: 'relatorios/estoque' },
                { title: "Ajuda / Documentação", link: 'ajuda/documentacao' },
                { title: "Ajuda / Sobre", link: 'ajuda/sobre' },
            ]
        };
    }
}

export const api = new Api();