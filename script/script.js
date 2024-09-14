document.addEventListener('DOMContentLoaded', function() {
    // Definindo as variáveis necessárias
    const saldoElement = document.querySelector("#saldo");
    let saldo = 0;

    let usuario 

    const saqueButton = document.querySelector("#saque-button");
    const depositoButton = document.querySelector("#deposito-button");
    const saqueInfo = document.querySelector("#saque-info");
    const depositoInfo = document.querySelector("#deposito-info");
    const saqueInput = document.querySelector("#saque-amount");
    const depositoInput = document.querySelector("#deposito-amount");

    // Atualiza o saldo inicial na interface
    atualizarSaldo();

    // Adiciona um manipulador de eventos para o clique no botão de saque
    saqueButton.addEventListener('click', function() {
        if (saqueInfo.classList.contains('hidden')) {
            saqueInfo.classList.remove('hidden');
            saqueInput.focus(); // Foca no input quando o campo é exibido
            depositoInfo.classList.add('hidden'); // Oculta o campo de depósito se estiver visível
        }
    });

    // Adiciona um manipulador de eventos para o clique no botão de depósito
    depositoButton.addEventListener('click', function() {
        if (depositoInfo.classList.contains('hidden')) {
            depositoInfo.classList.remove('hidden');
            depositoInput.focus(); // Foca no input quando o campo é exibido
            saqueInfo.classList.add('hidden'); // Oculta o campo de saque se estiver visível
        }
    });

    // Adiciona um manipulador de eventos para o pressionar a tecla Enter no input de saque
    saqueInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const valorSaque = Number(saqueInput.value);
            if (valorSaque > 0) {
                saque(valorSaque); // Chama a função saque com o valor do input
                saqueInfo.classList.add('hidden');
                saqueInput.value = ''; // Limpa o campo de entrada
            } else {
                alert("Por favor, insira um valor válido para o saque.");
            }
        }
    });

    // Função para realizar o saque
    function saque(valorSaque) {
        // Valida o valor do saque
        if (valorSaque <= 0) {
            alert("O valor do saque deve ser positivo.");
            return;
        }

        // Verifica se há saldo suficiente
        if (valorSaque > saldo) {
            alert("Saldo insuficiente para o saque.");
            return;
        }

        // Subtrai o valor do saldo
        saldo -= valorSaque;

        // Atualiza a interface com o novo saldo
        atualizarSaldo();
    }

    // Função para realizar o depósito
    function deposito(valorDeposito) {
        // Valida o valor do depósito
        if (valorDeposito <= 0) {
            alert("O valor do depósito deve ser positivo.");
            return;
        }

        // Adiciona o valor ao saldo
        saldo += valorDeposito;

        // Atualiza a interface com o novo saldo
        atualizarSaldo();
    }

    // Função para atualizar a interface com o saldo atual
    function atualizarSaldo() {
        saldoElement.innerText = "R$ " + saldo.toFixed(2);
    }

    // Adiciona um manipulador de eventos para o pressionar a tecla Enter no input de depósito
    depositoInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const valorDeposito = Number(depositoInput.value);
            if (valorDeposito > 0) {
                deposito(valorDeposito); // Chama a função deposito com o valor do input
                depositoInfo.classList.add('hidden');
                depositoInput.value = ''; // Limpa o campo de entrada
            } else {
                alert("Por favor, insira um valor válido para o depósito.");
            }
        }
    });

    // Adiciona um manipulador de eventos para o clique no botão de envio do formulário
   
})

document.querySelector("button").addEventListener('click', function() {
    const username = document.querySelector("input[type=text]").value.trim();
    const password = document.querySelector("input[type=password]").value.trim();

    if (username !== "" && password !== "") {
        localStorage.setItem('username', username)
        window.location.href = "menu.html";
    } else {
        alert("Preencha todos os campos");
    }
    
     
     
})
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