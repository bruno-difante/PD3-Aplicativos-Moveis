// =============================================================================
// App.js - Cadastro de Produtos de Mercado
// Disciplina: Aplicativos Móveis
// Descrição: Aplicativo React Native (Expo) para cadastro de produtos de
//            mercado. Os dados são armazenados em memória utilizando useState.
// =============================================================================

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

// =============================================================================
// Componente Principal do Aplicativo
// =============================================================================
export default function App() {

  // ---------------------------------------------------------------------------
  // ESTADO (useState) - Armazenamento em memória
  // ---------------------------------------------------------------------------

  // Estado para armazenar a lista de produtos cadastrados.
  // Cada produto é um objeto com: id, nome, marca, preco, quantidade.
  const [produtos, setProdutos] = useState([]);

  // Estados individuais para cada campo do formulário de cadastro.
  const [nome, setNome] = useState('');       // Nome do produto
  const [marca, setMarca] = useState('');      // Marca do produto
  const [preco, setPreco] = useState('');      // Preço do produto (R$)
  const [quantidade, setQuantidade] = useState(''); // Quantidade em estoque

  // ---------------------------------------------------------------------------
  // FUNÇÃO: Adicionar Produto
  // Valida os campos e adiciona um novo produto à lista em memória.
  // ---------------------------------------------------------------------------
  const adicionarProduto = () => {
    // Validação: verifica se todos os campos foram preenchidos.
    if (!nome.trim() || !marca.trim() || !preco.trim() || !quantidade.trim()) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos antes de cadastrar.');
      return;
    }

    // Validação: verifica se o preço é um número válido.
    if (isNaN(parseFloat(preco)) || parseFloat(preco) < 0) {
      Alert.alert('Preço inválido', 'Informe um valor numérico válido para o preço.');
      return;
    }

    // Validação: verifica se a quantidade é um número inteiro válido.
    if (isNaN(parseInt(quantidade)) || parseInt(quantidade) < 0) {
      Alert.alert('Quantidade inválida', 'Informe um número inteiro válido para a quantidade.');
      return;
    }

    // Cria o objeto do novo produto com um ID único baseado em timestamp.
    const novoProduto = {
      id: Date.now().toString(), // ID único gerado pelo timestamp atual
      nome: nome.trim(),
      marca: marca.trim(),
      preco: parseFloat(preco).toFixed(2), // Formata o preço com 2 casas decimais
      quantidade: parseInt(quantidade),     // Converte para número inteiro
    };

    // Atualiza o estado adicionando o novo produto ao início da lista.
    setProdutos((listaAtual) => [novoProduto, ...listaAtual]);

    // Limpa os campos do formulário após o cadastro bem-sucedido.
    setNome('');
    setMarca('');
    setPreco('');
    setQuantidade('');

    Alert.alert('Sucesso!', `"${novoProduto.nome}" foi cadastrado com sucesso.`);
  };

  // ---------------------------------------------------------------------------
  // FUNÇÃO: Remover Produto
  // Remove um produto da lista com base no seu ID único.
  // ---------------------------------------------------------------------------
  const removerProduto = (id) => {
    // Na plataforma web, Alert.alert não suporta múltiplos botões corretamente.
    // Por isso, usamos window.confirm() no web e Alert.alert() no mobile.
    if (Platform.OS === 'web') {
      const confirmar = window.confirm('Deseja realmente excluir este produto?');
      if (confirmar) {
        // Filtra a lista mantendo apenas os produtos com ID diferente do selecionado.
        setProdutos((listaAtual) =>
          listaAtual.filter((produto) => produto.id !== id)
        );
      }
    } else {
      // Exibe um alerta de confirmação antes de excluir (iOS/Android).
      Alert.alert(
        'Confirmar Exclusão',
        'Deseja realmente excluir este produto?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Excluir',
            style: 'destructive',
            // Filtra a lista mantendo apenas os produtos com ID diferente do selecionado.
            onPress: () => {
              setProdutos((listaAtual) =>
                listaAtual.filter((produto) => produto.id !== id)
              );
            },
          },
        ]
      );
    }
  };

  // ---------------------------------------------------------------------------
  // RENDERIZAÇÃO: Interface do Usuário
  // ---------------------------------------------------------------------------
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* ===== CABEÇALHO / TÍTULO DO SISTEMA ===== */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🛒</Text>
        <Text style={styles.headerTitle}>Cadastro de Produtos</Text>
        <Text style={styles.headerSubtitle}>Sistema de Gerenciamento de Mercado</Text>
      </View>

      {/* ===== FORMULÁRIO DE CADASTRO ===== */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Novo Produto</Text>

        {/* Campo 1: Nome do Produto */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Nome do Produto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Arroz Integral"
            placeholderTextColor="#8888aa"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* Campo 2: Marca */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Marca</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Tio João"
            placeholderTextColor="#8888aa"
            value={marca}
            onChangeText={setMarca}
          />
        </View>

        {/* Campo 3: Preço (R$) - Teclado numérico */}
        <View style={styles.rowInputs}>
          <View style={[styles.inputWrapper, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.inputLabel}>Preço (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#8888aa"
              value={preco}
              onChangeText={setPreco}
              keyboardType="decimal-pad"
            />
          </View>

          {/* Campo 4: Quantidade em Estoque - Teclado numérico */}
          <View style={[styles.inputWrapper, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.inputLabel}>Qtd. Estoque</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#8888aa"
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* Botão para salvar/cadastrar o produto */}
        <TouchableOpacity
          style={styles.botaoCadastrar}
          onPress={adicionarProduto}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoCadastrarTexto}>＋  Cadastrar Produto</Text>
        </TouchableOpacity>
      </View>

      {/* ===== LISTAGEM DE PRODUTOS CADASTRADOS ===== */}
      <View style={styles.listaContainer}>
        <View style={styles.listaTituloRow}>
          <Text style={styles.listaTitulo}>Produtos Cadastrados</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>{produtos.length}</Text>
          </View>
        </View>

        {/* Verifica se há produtos cadastrados */}
        {produtos.length === 0 ? (
          // Mensagem exibida quando não há nenhum produto cadastrado.
          <View style={styles.listaVazia}>
            <Text style={styles.listaVaziaIcon}>📦</Text>
            <Text style={styles.listaVaziaTexto}>
              Nenhum produto cadastrado ainda.
            </Text>
            <Text style={styles.listaVaziaSubtexto}>
              Preencha o formulário acima para começar.
            </Text>
          </View>
        ) : (
          // FlatList renderiza a lista de produtos de forma otimizada.
          <FlatList
            data={produtos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              // ===== CARD DE CADA PRODUTO =====
              <View style={styles.produtoCard}>
                <View style={styles.produtoInfo}>
                  {/* Nome do produto em destaque */}
                  <Text style={styles.produtoNome}>{item.nome}</Text>
                  {/* Marca do produto */}
                  <Text style={styles.produtoMarca}>{item.marca}</Text>
                  {/* Linha com preço e quantidade */}
                  <View style={styles.produtoDetalhes}>
                    <View style={styles.tagPreco}>
                      <Text style={styles.tagPrecoTexto}>
                        R$ {item.preco}
                      </Text>
                    </View>
                    <View style={styles.tagEstoque}>
                      <Text style={styles.tagEstoqueTexto}>
                        Estoque: {item.quantidade}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Botão para excluir o produto */}
                <TouchableOpacity
                  style={styles.botaoExcluir}
                  onPress={() => removerProduto(item.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.botaoExcluirTexto}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

// =============================================================================
// ESTILOS - StyleSheet
// Tema escuro moderno com cores vibrantes e visual profissional.
// =============================================================================
const styles = StyleSheet.create({
  // Container principal da aplicação
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },

  // ---------- CABEÇALHO ----------
  header: {
    backgroundColor: '#1a1a2e',
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
    // Sombra para dar profundidade ao cabeçalho
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  headerIcon: {
    fontSize: 36,
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#8888aa',
    marginTop: 4,
    letterSpacing: 0.3,
  },

  // ---------- FORMULÁRIO ----------
  formContainer: {
    backgroundColor: '#1a1a2e',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    // Borda sutil com cor de destaque
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#a29bfe',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  inputWrapper: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8888aa',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: '#12122a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 15,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  rowInputs: {
    flexDirection: 'row',
  },

  // ---------- BOTÃO CADASTRAR ----------
  botaoCadastrar: {
    backgroundColor: '#6c5ce7',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
    // Sombra roxa no botão
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoCadastrarTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ---------- LISTA DE PRODUTOS ----------
  listaContainer: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  listaTituloRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  listaTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  badge: {
    backgroundColor: '#6c5ce7',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 10,
  },
  badgeTexto: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },

  // ---------- LISTA VAZIA ----------
  listaVazia: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  listaVaziaIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  listaVaziaTexto: {
    fontSize: 15,
    color: '#8888aa',
    fontWeight: '600',
  },
  listaVaziaSubtexto: {
    fontSize: 13,
    color: '#555577',
    marginTop: 4,
  },

  // ---------- CARD DO PRODUTO ----------
  produtoCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  produtoInfo: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  produtoMarca: {
    fontSize: 13,
    color: '#8888aa',
    marginBottom: 8,
  },
  produtoDetalhes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagPreco: {
    backgroundColor: '#2d2d5e',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  tagPrecoTexto: {
    color: '#a29bfe',
    fontSize: 13,
    fontWeight: '700',
  },
  tagEstoque: {
    backgroundColor: '#1e3a2f',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagEstoqueTexto: {
    color: '#55efc4',
    fontSize: 13,
    fontWeight: '600',
  },

  // ---------- BOTÃO EXCLUIR ----------
  botaoExcluir: {
    backgroundColor: '#3d1a2e',
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  botaoExcluirTexto: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '700',
  },
});
