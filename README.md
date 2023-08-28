# TADSTube - Plataforma de Compartilhamento de Vídeos

Bem-vindo ao repositório do projeto TADSTube! O TADSTube é uma plataforma de compartilhamento de vídeos desenvolvida utilizando ReactJS para o frontend, Spring Boot para o backend e o PostgreSQL como banco de dados. Esta plataforma permite aos usuários fazer upload, visualizar e interagir com vídeos de forma simples e eficiente.

## Funcionalidades

- **Cadastro e Autenticação:** Os usuários podem criar contas, fazer login e gerenciar suas informações de perfil.
- **Upload de Vídeos:** Os usuários autenticados podem fazer o upload de vídeos para a plataforma.
- **Visualização de Vídeos:** Os usuários podem assistir aos vídeos carregados por outros usuários.
- **Comentários e Curtidas:** Os usuários podem interagir com os vídeos através de comentários e curtidas.
- **Pesquisa e Categorias:** Os vídeos podem ser pesquisados por palavras-chave e filtrados por categorias.

## Pré-requisitos

- Node.js: Certifique-se de ter o Node.js instalado. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).
- Java Development Kit (JDK): Você precisará do JDK instalado para executar o Spring Boot. Baixe-o em [oracle.com/java/technologies/javase-downloads.html](https://www.oracle.com/java/technologies/javase-downloads.html).
- PostgreSQL: O PostgreSQL deve estar instalado e em execução. Você pode baixá-lo em [postgresql.org/download](https://www.postgresql.org/download/).

## Configuração

1. **Frontend (ReactJS):**
   - Navegue até o diretório `frontend` usando o terminal.
   - Execute o comando `npm install` para instalar as dependências.
   - Duplique o arquivo `.env.example` e renomeie a cópia para `.env`.
   - Configure as variáveis de ambiente no arquivo `.env`, como a URL da API.

2. **Backend (Spring Boot):**
   - Importe o projeto backend (`backend`) em sua IDE preferida.
   - Configure as informações do banco de dados no arquivo `application.properties`.
   - Execute o aplicativo Spring Boot.

3. **Banco de Dados (PostgreSQL):**
   - Crie um banco de dados chamado `tadstube` no PostgreSQL.
   - Certifique-se de que as configurações do banco de dados no arquivo `application.properties` correspondam às suas configurações locais.

## Executando o Projeto

1. **Frontend:**
   - No diretório `frontend`, execute o comando `npm start` para iniciar o servidor de desenvolvimento.

2. **Backend:**
   - Inicie o aplicativo Spring Boot a partir de sua IDE ou execute o comando apropriado.

3. **Acessando a Aplicação:**
   - Abra o navegador e acesse `http://localhost:3000` para visualizar a aplicação.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma "issue" para discutir novos recursos ou problemas encontrados. Se você deseja contribuir diretamente, siga estas etapas:

1. Faça um fork deste repositório.
2. Crie um novo branch para suas alterações: `git checkout -b feature/nova-feature`.
3. Faça suas modificações e commit: `git commit -m 'Adiciona nova feature'`.
4. Faça push para o branch: `git push origin feature/nova-feature`.
5. Abra um Pull Request descrevendo suas alterações.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

Divirta-se explorando e contribuindo para o TADSTube! Em caso de dúvidas, não hesite em entrar em contato.
