// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Definindo as variáveis necessárias
    const saldoElement = document.querySelector("#saldo");
    let saldo = 0; // Inicializa o saldo como zero
    const saqueButton = document.querySelector("#saque-button");
    const depositoButton = document.querySelector("#deposito-button");
    const saqueInfo = document.querySelector("#saque-info");
    const depositoInfo = document.querySelector("#deposito-info");
    const saqueInput = document.querySelector("#saque-amount");
    const depositoInput = document.querySelector("#deposito-amount");

    // Atualiza o saldo inicial na interface
    atualizarSaldo();

    // Evento para exibir o campo de saque
    saqueButton.addEventListener('click', function() {
        // Exibe o campo de saque e oculta o campo de depósito
        toggleVisibility(saqueInfo, depositoInfo, saqueInput);
    });

    // Evento para exibir o campo de depósito
    depositoButton.addEventListener('click', function() {
        // Exibe o campo de depósito e oculta o campo de saque
        toggleVisibility(depositoInfo, saqueInfo, depositoInput);
    });

    // Evento para processar saque ao pressionar Enter
    saqueInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const valorSaque = Number(saqueInput.value);
            if (valorSaque > 0) {
                saque(valorSaque); // Chama a função de saque
                resetInput(saqueInfo, saqueInput);
            } else {
                alert("Por favor, insira um valor válido para o saque.");
            }
        }
    });

    // Evento para processar depósito ao pressionar Enter
    depositoInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const valorDeposito = Number(depositoInput.value);
            if (valorDeposito > 0) {
                deposito(valorDeposito); // Chama a função de depósito
                resetInput(depositoInfo, depositoInput);
            } else {
                alert("Por favor, insira um valor válido para o depósito.");
            }
        }
    });

    // Função para realizar o saque
    function saque(valorSaque) {
        if (valorSaque <= 0) {
            alert("O valor do saque deve ser positivo.");
            return;
        }
        if (valorSaque > saldo) {
            alert("Saldo insuficiente para o saque.");
            return;
        }
        saldo -= valorSaque; // Subtrai o valor do saldo
        atualizarSaldo(); // Atualiza a interface
    }

    // Função para realizar o depósito
    function deposito(valorDeposito) {
        if (valorDeposito <= 0) {
            alert("O valor do depósito deve ser positivo.");
            return;
        }
        saldo += valorDeposito; // Adiciona o valor ao saldo
        atualizarSaldo(); // Atualiza a interface
    }

    // Função para atualizar a interface com o saldo atual
    function atualizarSaldo() {
        saldoElement.innerText = "R$ " + saldo.toFixed(2); // Formata e exibe o saldo
    }

    // Função para alternar a visibilidade de campos
    function toggleVisibility(showElement, hideElement, inputElement) {
        if (showElement.classList.contains('hidden')) {
            showElement.classList.remove('hidden');
            inputElement.focus(); // Foca no input correspondente
            hideElement.classList.add('hidden'); // Oculta o outro campo
        }
    }

    // Função para limpar o campo de entrada e ocultar a informação
    function resetInput(infoElement, inputElement) {
        infoElement.classList.add('hidden'); // Oculta o campo de informação
        inputElement.value = ''; // Limpa o campo de entrada
    }
});

// Evento para manipular o clique no botão de envio do formulário
document.querySelector("button").addEventListener('click', function() {
    const username = document.querySelector("input[type=text]").value.trim();
    const password = document.querySelector("input[type=password]").value.trim();

    // Verifica se os campos estão preenchidos
    if (username !== "" && password !== "") {
        localStorage.setItem('username', username); // Armazena o nome de usuário
        window.location.href = "menu.html"; // Redireciona para a página de menu
    } else {
        alert("Preencha todos os campos"); // Alerta se os campos estiverem vazios
    }
});

// Verifica se a URL da página contém "menu.html"
if (window.location.href.includes("menu.html")) {
    // Obtém o nome de usuário do localStorage
    const username = localStorage.getItem('username');
    
    // Verifica se o username foi encontrado
    if (username) {
        // Atualiza o conteúdo do <h1> com o nome de usuário
        const h1Element = document.querySelector("h1");
        if (h1Element) {
            h1Element.innerText += ` ${username}`;
        }
    } else {
        console.log("Nome de usuário não encontrado no localStorage.");
    }
}
