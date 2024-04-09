# Requisitos do Sistema Backoffice para Minimercado de Vila

## Introdução
Este documento descreve os requisitos para o desenvolvimento de um sistema de backoffice para um minimercado localizado em uma vila. O sistema deve auxiliar na gestão de estoque, vendas, compras e gerenciamento de funcionários.

## Casos de Uso

### Caso de Uso: Registrar Venda
**Ator Principal:** Caixa

**Pré-condições:** O caixa está logado no sistema.

**Fluxo Básico:**
1. O caixa seleciona os produtos a serem vendidos.
2. O sistema calcula o total da venda.
3. O caixa recebe o pagamento do cliente.
4. O sistema registra a venda e atualiza o estoque.
5. O sistema gera um recibo para o cliente.

**Fluxo Alternativo:**
- **Pagamento em Cartão:** Se o cliente pagar com cartão, o sistema processa o pagamento eletronicamente.

**Pós-condições:** A venda é registrada no sistema e o estoque é atualizado.

### Caso de Uso: Gerenciar Estoque
**Ator Principal:** Gerente

**Pré-condições:** O gerente está logado no sistema.

**Fluxo Básico:**
1. O gerente acessa a lista de produtos em estoque.
2. O gerente pode adicionar novos produtos, atualizar informações ou remover produtos.
3. O sistema registra todas as operações de estoque.

**Fluxo Alternativo:**
- **Alerta de Estoque Baixo:** Se um produto atingir um nível mínimo de estoque, o sistema emite um alerta para o gerente.

**Pós-condições:** O estoque é atualizado de acordo com as operações realizadas.

### Caso de Uso: Gerenciar Funcionários
**Ator Principal:** Gerente

**Pré-condições:** O gerente está logado no sistema.

**Fluxo Básico:**
1. O gerente acessa a lista de funcionários.
2. O gerente pode adicionar novos funcionários, atualizar informações ou remover funcionários.
3. O sistema registra todas as operações de gerenciamento de funcionários.

**Fluxo Alternativo:**
- **Controle de Acesso:** O sistema permite que o gerente defina os níveis de permissão de acesso para cada funcionário.

**Pós-condições:** As informações dos funcionários são atualizadas conforme as operações realizadas.

### Caso de Uso: Realizar Compras de Fornecedores
**Ator Principal:** Gerente de Compras

**Pré-condições:** O gerente de compras está logado no sistema.

**Fluxo Básico:**
1. O gerente de compras acessa a lista de fornecedores.
2. O gerente seleciona os produtos a serem adquiridos e as quantidades desejadas.
3. O sistema gera um pedido de compra com os detalhes dos produtos e quantidades.
4. O pedido é enviado automaticamente ao fornecedor.
5. O sistema registra a transação de compra e atualiza o estoque quando os produtos são recebidos.

**Fluxo Alternativo:**
- **Comparação de Preços:** O sistema permite ao gerente de compras comparar preços entre diferentes fornecedores para tomar decisões mais informadas.

**Pós-condições:** As compras são registradas no sistema e o estoque é atualizado após o recebimento dos produtos.

### Caso de Uso: Monitorar Desempenho de Vendas
**Ator Principal:** Gerente de Vendas

**Pré-condições:** O gerente de vendas está logado no sistema.

**Fluxo Básico:**
1. O gerente de vendas acessa relatórios de desempenho de vendas.
2. O sistema exibe informações sobre as vendas realizadas, incluindo produtos mais vendidos, tendências de vendas e desempenho de vendedores.
3. O gerente pode filtrar os relatórios por período de tempo, categoria de produto ou outros parâmetros relevantes.
4. Com base nas análises dos relatórios, o gerente pode tomar decisões estratégicas para impulsionar as vendas.

**Fluxo Alternativo:**
- **Acompanhamento de Metas:** O sistema permite ao gerente definir metas de vendas e acompanhar o progresso em relação a essas metas.

**Pós-condições:** O desempenho de vendas é monitorado e informações relevantes são disponibilizadas para tomada de decisões.

## Considerações Finais
O sistema de backoffice proposto será essencial para a eficiente operação do minimercado de vila, permitindo um melhor controle sobre estoque, vendas, compras, finanças e recursos humanos. A implementação desses requisitos garantirá uma gestão mais eficaz e organizada do negócio.

## Estrutura de Pastas
![image-1](https://github.com/JulioSilvaa/CRUD_CleanArch/assets/69260762/4414e6e1-1b4b-4663-862e-b1812f8b0510)



## Explicação da Estrutura de Pastas (Arquitetura Limpa)

- **`app/controllers`**: Esta pasta contém os controladores responsáveis por receber as requisições do cliente e chamar os casos de uso correspondentes.

- **`app/models`**: Aqui estão os modelos que representam os dados da aplicação.

- **`app/usecases`**: Contém os casos de uso da aplicação.

- **`domain/entities`**: Aqui ficam as entidades de domínio, que são objetos de negócio puros e não possuem lógica relacionada à persistência de dados.

- **`domain/repositories`**: Contém as interfaces que definem os contratos para interagir com os dados no banco de dados.

- **`domain/services`**: Aqui estão os serviços de domínio que encapsulam a lógica de negócio complexa.

- **`interfaces/gateways`**: Contém as interfaces que definem contratos para interagir com recursos externos, como sistemas de pagamento.

- **`interfaces/presenters`**: Aqui estão os apresentadores que formatam os dados para exibição ao cliente.

- **`interfaces/web`**: Esta pasta contém os arquivos relacionados à interface de usuário da aplicação web.
