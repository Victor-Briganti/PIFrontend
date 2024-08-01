# Adopet ONG (Projeto Integrador)

<p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white"/>
</p>

## Participantes

- João Victor Briganti de Oliveira
- Pedro Conrado Negreiro da Silva
- Augusto Maccagnan Mendes
- Matheus Floriano Saito da Silva

## Sobre

Esta aplicação foi criada para simplificar a adoção de animais de estimação. Oferecendo uma plataforma intuitiva que permite aos usuários visualizar perfis detalhados dos animais disponíveis.

Ao utilizar a aplicação, os usuários podem filtrar os animais de acordo com suas preferências, facilitando a busca pelo companheiro perfeito. A plataforma também garante um processo de adoção transparente e responsável, desde o cadastro inicial até o acompanhamento pós-adotivo.

## Instalação

```bash
# Instalação do gerenciador de pacotes
sudo apt install npm

# Iniciação do projeto
# OBS: Necessário fazer isso somente uma vez
npm create vite@latest adopet_frontend
cd adopet_frontend
npm install
```

## Iniciando Servidor

```bash
npm run dev
```

## Atualização

Após cada pull, se houve uma alteração no package.json será necessário executar o seguinte comando:

```bash
npm install
```

## Contribuindo

### Mensagens de Commit

Por padrão as mensagens de commit devem seguir o seguinte padrão:

[Nome da funcionalidade] Titulo da modificação

Breve descrição(Não passar de 3 linhas).

### Commit

Utilize uma branch com o seu nome para realizar as modificações no programa. **NÃO** suba essa branch para o github, ela deve ser de uso local.

**PASSOS:**

1. git switch main
2. git pull
3. git merge **seu nome**
4. git push

### Pulling

Ao realizar um git pull, se houve modificações se torna necessário atualizar a branch com seu nome também. Para isso siga os seguintes passos:

1. git switch **seu nome**
2. git merge main

Caso houver conflito me procure(João).
