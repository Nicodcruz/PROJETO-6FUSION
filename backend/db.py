from pymongo import MongoClient

client = MongoClient("mongodb+srv://cadastro_users:dsa12345@cadastro.qrerbqa.mongodb.net/?retryWrites=true&w=majority&appName=cadastro")
db = client["meu_banco"]
usuarios_collection = db["usuarios"]

# Cria índice único no campo email
usuarios_collection.create_index("email", unique=True)
