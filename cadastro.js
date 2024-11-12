class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar() {
        let produto = this.lerDados();

        if(this.validaCampos(produto)) {
            if (this.editId == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto);
            }
        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_preco.innerText = this.arrayProdutos[i].preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'Content/editar.png';
            imgEdit.setAttribute("onclick", "produto.editar("+ this.arrayProdutos[i].id +")");

            let imgDelete = document.createElement('img');
            imgDelete.src = 'Content/deletar.png';
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

        }
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto);
        this.id++;
    }

    lerDados() {
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = parseFloat(document.getElementById('preco').value);

        return produto;
    }

    validaCampos(produto) {
        let msg = '';

        if(produto.nomeProduto == '') {
            msg += 'Informe o nome do produto \n';
        }

        if(produto.preco == '' || isNaN(produto.preco)) {
            msg += 'Informe o preço do produto \n';
        }

        if(msg != '') {
            alert(msg);
            return false
        }
        return true;
    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';
        this.editId = null;
    }

    deletar(id) {
        if(confirm('Deseja realmente deletar o produto de id: ' + id)) {
            let tbody = document.getElementById('tbody');

            for(let i = 0; i < this.arrayProdutos.length; i++) {
                if(this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }

    editar(id) {
        let produto = this.arrayProdutos.find(prod => prod.id == id);
        this.editId = id;

        document.getElementById('produto').value = produto.nomeProduto;
        document.getElementById('preco').value = produto.preco;
    }

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }
    }
}

var produto = new Produto();