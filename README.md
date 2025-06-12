# PROJETO‑6FUSION 🚀

## 📝 Descrição
**PROJETO‑6FUSION** é uma aplicação web simples e funcional, com back-end em **Flask** (Python) e front-end em **HTML,CSS E JS**, conectada a um banco de dados **MongoDB**. A solução permite cadastrar, consultar e visualizar dados de forma leve e eficiente.

---

## ⚙️ Tecnologias e Ferramentas
- **Back-end**: Flask  
- **Banco de dados**: MongoDB (via PyMongo)  
- **Front-end**: HTML5 + CSS3 + JS
- **Templates**: Jinja2  
- **Gerenciamento de ambiente**: Python 3.8+, pip, virtualenv  
- **Versionamento**: Git + GitHub  

---

## 📥 Instalação e Execução

### Pré-requisitos
- Python 3.8 ou superior  
- MongoDB (local ou Atlas)  
- pip  


## 📥 Instalação e Execução

### ✅ Pré-requisitos

- Python 3.8 ou superior  
- MongoDB (instalado localmente ou via Atlas)  
- pip instalado

### 🚀 Passos

# 1. Clone o repositório
git clone https://github.com/Nicodcruz/PROJETO-6FUSION.git
cd PROJETO-6FUSION

# 2. Crie e ative o ambiente virtual
python -m venv venv
source venv/bin/activate       # Linux/macOS
venv\Scripts\activate          # Windows

# 3. Instale as dependências
pip install -r requirements.txt

# 4. (Opcional) Configure variáveis de ambiente
export FLASK_APP=app.py
export FLASK_ENV=development
export MONGO_URI="mongodb://localhost:27017/6fusion"

# 5. Execute a aplicação
flask run

## 🌐 Estrutura de Páginas
URL	Descrição
/	Página inicial / dashboard
/cadastro	Formulário para cadastrar novos dados
/consulta	Lista dados salvos no banco
/detalhes/<id>	Mostra detalhes de um registro específico

Todas as páginas utilizam templates HTML com Jinja2 para renderização dinâmica a partir do Flask.

## 📂 Estrutura do Projeto
csharp
Copiar
Editar
PROJETO-6FUSION/
├── app.py                 # Aplicação Flask principal (rotas + lógica)
├── requirements.txt       # Dependências do projeto
├── static/                # Arquivos estáticos (CSS, imagens)
└── templates/             # Páginas HTML (Jinja2 templates)
    ├── index.html
    ├── cadastro.html
    ├── consulta.html
    └── detalhes.html
# 🗃️ Banco de Dados
Armazenamento no MongoDB em uma coleção (ex: registros).

Conexão via PyMongo.

Cada registro possui um campo _id gerado pelo MongoDB.

# ✨ Fluxo de Funcionamento
Usuário acessa /cadastro, preenche dados e envia via POST ao Flask.

Flask valida e insere documento no MongoDB.

Ao acessar /consulta, Flask busca registros e renderiza tabela.

Clicando em “ver detalhes”, Flask renderiza /detalhes/<id> com dados completos.

# 🔐 Segurança & Boas Práticas
Escapamento automático de dados em templates Jinja2 (proteção contra XSS).

Validação de dados no servidor.

Armazenamento seguro de credenciais MongoDB via variáveis de ambiente.

Estrutura organizada e modular, separando lógica de rotas e template.

# 📄 Licença
Este projeto está sob a MIT License. Consulte o arquivo LICENSE para mais detalhes.

# 🤝 Contribuição
Faça um fork do projeto.

Abra uma branch (feature/nova-funcionalidade).

Adicione commits claros e informativos.

Envie um Pull Request detalhando suas mudanças.

📞 Contato
Autor: Nico D. Cruz

GitHub: @Nicodcruz
