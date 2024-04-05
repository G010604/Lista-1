// Classe Contato
class Contato {
    constructor(nome, telefone, email) {
      this.nome = nome;
      this.telefone = telefone;
      this.email = email;
    }
}
  
// Classe GerenciadorContatos
class GerenciadorContatos {
    constructor() {
        this.contatos = [];
    }
  
    adicionarContato(contato) {
        this.contatos.push(contato);
    }
  
    removerContato(nome) {
        this.contatos = this.contatos.filter(contato => contato.nome !== nome);
    }
  
    listarContatos() {
        return this.contatos;
    }
  
    buscarContatoPorNome(nome) {
        return this.contatos.find(contato => contato.nome === nome);
    }
}
  
// Facade para interagir com as operações de contato
class ContatoFacade {
    constructor() {
      this.gerenciador = new GerenciadorContatos();
    }
  
    adicionarContato(nome, telefone, email) {
      const contato = new Contato(nome, telefone, email);
      this.gerenciador.adicionarContato(contato);
    }
  
    removerContato(nome) {
      this.gerenciador.removerContato(nome);
    }
  
    listarContatos() {
      return this.gerenciador.listarContatos();
    }
  
    buscarContato(nome) {
      return this.gerenciador.buscarContatoPorNome(nome);
    }
}
  
// CLI para interagir com a fachada de Contatos
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
  
const facade = new ContatoFacade();
  
function exibirMenu() {
    console.log('\nMenu:');
    console.log('1. Adicionar Contato');
    console.log('2. Remover Contato');
    console.log('3. Listar Contatos');
    console.log('4. Buscar Contato');
    console.log('5. Sair');
}
  
function adicionarContato() {
    rl.question('Nome: ', nome => {
      rl.question('Telefone: ', telefone => {
        rl.question('Email: ', email => {
          facade.adicionarContato(nome, telefone, email);
          console.log('Contato adicionado com sucesso!');
          exibirMenu();
          selecionarOpcao();
        });
      });
    });
}
  
function removerContato() {
    rl.question('Nome do Contato a ser removido: ', nome => {
      facade.removerContato(nome);
      console.log('Contato removido com sucesso!');
      exibirMenu();
      selecionarOpcao();
    });
}
  
function listarContatos() {
    const contatos = facade.listarContatos();
    console.log('\nLista de Contatos:');
    contatos.forEach(contato => {
      console.log(`Nome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email}`);
    });
    exibirMenu();
    selecionarOpcao();
}
  
function buscarContato() {
    rl.question('Nome do Contato a ser buscado: ', nome => {
      const contato = facade.buscarContato(nome);
      if (contato) {
        console.log(`Contato encontrado: Nome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email}`);
      } else {
        console.log('Contato não encontrado.');
      }
      exibirMenu();
      selecionarOpcao();
    });
}
  
function selecionarOpcao() {
    rl.question('\nSelecione uma opção: ', opcao => {
      switch (opcao) {
        case '1':
          adicionarContato();
          break;
        case '2':
          removerContato();
          break;
        case '3':
          listarContatos();
          break;
        case '4':
          buscarContato();
          break;
        case '5':
          rl.close();
          break;
        default:
          console.log('Opção inválida.');
          exibirMenu();
          selecionarOpcao();
          break;
      }
    });
}
  
exibirMenu();
selecionarOpcao();
  