# Autoflex Web Front

Este repositório é destinado à camada front-end do desafio proposto no processo seletivo para desenvolvedor full stack na empresa Projedata.

## :label: Sobre o desafio

O desafio consiste na implementação de um sistema para uma indústria, sendo responsável pela gestão dos produtos fabricados e das matérias-primas necessárias para a fabricação.

### :pushpin: Funcionalidades

- Interface para o CRUD de produtos (Products);
- Interface para o CRUD de matérias-primas (RawMaterials);
- Interface para a sugestão de produção baseada nas matérias-primas disponíveis em estoque, com prioridade para os produtos de maior valor.

## :computer: Como executar

Para executar localmente, clone o repositório para a sua máquina, e então, execute no terminal o seguinte comando:

```bash
pnpm dev
```

> [!IMPORTANT]
> Você precisará ter instalado em sua máquina a plataforma **Node.js**. Você pode utilizar o gerenciador de pacotes nativo (NPM), caso não queira instalar ou utilizar o PNPM, ou outra ferramenta.

## :gem: Tecnologias e Patterns

O front-end foi construído sobre o **React** com **TypeScript**, com uma das implementações possíveis de **arquitetura feature-based**. Além dessas ferramentas, foi utilizado **Vite**, para turbinar o build, **Tailwind CSS** para padronização dos estilos, os componentes disponibilizados pelo **shadcn/ui**, **React Router** para o roteamento, e **React Query** para cacheamento e controle dos dados retornados pelas requisições à [API do back-end](https://github.com/andrade-tiago/autoflex.rest-api).
