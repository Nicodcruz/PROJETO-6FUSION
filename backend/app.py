from flask import Flask, request, render_template, redirect, url_for, jsonify
from db import usuarios_collection
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo.errors import DuplicateKeyError

app = Flask(__name__)

@app.route("/")
def home():
    return redirect(url_for("login"))

@app.route("/logout")
def logout():
    return redirect(url_for("login"))

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        senha = request.form.get("senha")

        usuario = usuarios_collection.find_one({"email": email})
        if usuario and check_password_hash(usuario["senha"], senha):
            return render_template("bem_vindo.html", nome=usuario["nome"])

        else:
            return render_template("login.html", erro="Email ou senha incorretos.")

    return render_template("login.html")

@app.route("/cadastro", methods=["GET", "POST"])
def cadastro():
    if request.method == "POST":
        nome = request.form.get("nome")
        email = request.form.get("email")
        senha = request.form.get("senha")

        if usuarios_collection.find_one({"email": email}):
            return redirect(url_for("login"))

        usuario = {
            "nome": nome,
            "email": email,
            "senha": generate_password_hash(senha)
        }

        try:
            usuarios_collection.insert_one(usuario)
            return redirect(url_for("login"))
        except DuplicateKeyError:
            return render_template("cadastro.html", erro="Este email já está cadastrado.")

    return render_template("cadastro.html")

if __name__ == "__main__":
    app.run(debug=True)
