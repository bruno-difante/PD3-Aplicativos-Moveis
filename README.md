# 🛒 Cadastro de Produtos de Mercado

Aplicativo mobile desenvolvido em **React Native** com **Expo** para a disciplina de **Aplicativos Móveis**.  
O sistema permite cadastrar, visualizar e excluir produtos de mercado, com todos os dados armazenados em memória (sem banco de dados).

---

## 📋 Funcionalidades

- **Cadastro de produtos** com 4 campos: Nome, Marca, Preço e Quantidade em Estoque.
- **Listagem completa** de todos os produtos cadastrados.
- **Exclusão individual** de produtos com confirmação.
- **Validação de campos** antes do cadastro (campos obrigatórios, formato numérico).
- **Interface moderna** com tema escuro e design responsivo.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia     | Versão / Detalhes           |
| -------------- | --------------------------- |
| React Native   | via Expo SDK                |
| Expo           | Template `blank`            |
| JavaScript     | ES6+                        |
| Armazenamento  | `useState` (memória local)  |

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

1. **Node.js** (versão 18 ou superior)  
   - Download: [https://nodejs.org/](https://nodejs.org/)
   - Verifique a instalação:
     ```bash
     node --version
     ```

2. **npm** (instalado junto com o Node.js)  
   - Verifique a instalação:
     ```bash
     npm --version
     ```

3. **Expo Go** (aplicativo no celular para testar)  
   - Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)  
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

---

## 🚀 Passo a Passo — Instalação e Execução

### 1. Clonar ou copiar o projeto

Se o projeto estiver em um repositório Git:

```bash
git clone <URL_DO_REPOSITORIO>
```

Ou simplesmente copie a pasta `CadastroProdutos` para o local desejado.

### 2. Acessar a pasta do projeto

```bash
cd CadastroProdutos
```

### 3. Instalar as dependências

Execute o comando abaixo para instalar todos os pacotes necessários:

```bash
npm install
```

> ⏳ Aguarde a instalação ser concluída. Isso pode levar alguns minutos na primeira vez.

### 4. Iniciar o servidor de desenvolvimento

```bash
npx expo start
```

Após executar, um **QR Code** será exibido no terminal.

### 5. Executar no celular

- Abra o aplicativo **Expo Go** no seu celular.
- **Android**: Escaneie o QR Code diretamente pelo app Expo Go.
- **iOS**: Escaneie o QR Code usando a câmera do iPhone — ele abrirá automaticamente no Expo Go.

> ⚠️ **Importante**: O celular e o computador devem estar conectados na **mesma rede Wi-Fi**.

### 6. Executar no emulador (opcional)

Se preferir usar um emulador:

- **Android**: Pressione `a` no terminal (requer Android Studio com emulador configurado).
- **iOS**: Pressione `i` no terminal (requer Xcode — apenas macOS).
- **Web**: Pressione `w` no terminal para abrir no navegador.

---

## 📁 Estrutura do Projeto

```
CadastroProdutos/
├── App.js              # Código principal do aplicativo
├── app.json            # Configurações do Expo
├── index.js            # Ponto de entrada do app
├── package.json        # Dependências do projeto
├── assets/             # Ícones e imagens do app
│   ├── icon.png
│   ├── favicon.png
│   └── ...
├── node_modules/       # Pacotes instalados (gerado pelo npm)
└── README.md           # Este arquivo
```

---

## 📖 Como Funciona o Aplicativo

1. **Tela Principal**: Ao abrir o app, o título "Cadastro de Produtos" é exibido no topo.
2. **Formulário**: Preencha os 4 campos — Nome do Produto, Marca, Preço (R$) e Quantidade em Estoque.
3. **Cadastrar**: Toque no botão "Cadastrar Produto" para adicionar o item à lista.
4. **Visualizar**: Os produtos cadastrados aparecem em cards abaixo do formulário.
5. **Excluir**: Toque no botão "✕" ao lado de um produto para removê-lo (com confirmação).

> 📌 **Nota**: Os dados ficam armazenados apenas em memória (via `useState`). Ao fechar o aplicativo, os dados são perdidos.

---

## 📹 Link do vídeo no Youtube

https://www.youtube.com/watch?v=j6vBaFzdUko

---

## 👨‍💻 Autor

Desenvolvido como trabalho da disciplina de **Aplicativos Móveis**.

---

## 📄 Licença

Este projeto é de uso acadêmico.
