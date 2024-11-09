function botao() {
    // Captura os valores dos campos
    var nome = document.getElementById("fnome").value;
    var ende = document.getElementById("fende").value;
    var rg = document.getElementById("frg").value;
    var tele = document.getElementById("ftel").value;
    var email = document.getElementById("femail").value;
    var cpf = document.getElementById("fcpf").value;
    var data = document.getElementById("fdata").value;

    // Verifica se todos os campos estão preenchidos
    if (nome === "" || ende === "" || rg === "" || tele === "" || email === "" || cpf === "" || data === "") {
        alert("Por favor, preencha todos os campos.");
    } else {
        // Envia os dados ao servidor
        fetch('/salvar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `nome=${encodeURIComponent(nome)}&endereco=${encodeURIComponent(ende)}&rg=${encodeURIComponent(rg)}&telefone=${encodeURIComponent(tele)}&email=${encodeURIComponent(email)}&cpf=${encodeURIComponent(cpf)}&data=${encodeURIComponent(data)}`
        })
        .then(response => {
            if (response.ok) {
                return response.text(); // Retorna o corpo da resposta
            } else {
                throw new Error('Erro ao salvar os dados.');
            }
        })
        .then(data => {
            window.location.href = 'taxa.html'; // Redireciona para "taxa.html"
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Ocorreu um erro. Não foi possível salvar os dados.");
        });
    }
}
