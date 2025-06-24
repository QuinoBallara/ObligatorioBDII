import random
import re

# Función para generar una credencial del tipo AAA12345
def generar_credencial():
    letras = ''.join(random.choices("ABCDEFGHIJKLMNOPQRSTUVWXYZ", k=3))
    numeros = ''.join(random.choices("0123456789", k=5))
    return letras + numeros

# Archivos de entrada/salida
input_file = "inserciones_ciudadano.txt"
output_file = "inserciones_credencial_civica.txt"

# Leer IDs del archivo anterior
ids = []
with open(input_file, "r", encoding="utf-8") as file:
    for line in file:
        match = re.match(r"\((\d+),", line.strip())
        if match:
            ids.append(int(match.group(1)))

# Generar sentencias INSERT para Ciudadano_CredencialCivica
with open(output_file, "w", encoding="utf-8") as file:
    file.write("INSERT INTO Ciudadano_CredencialCivica (ciudadano_id, credencial_civica) VALUES\n")
    valores = []
    for cid in ids:
        credencial = generar_credencial()
        valores.append(f"({cid}, '{credencial}')")
    file.write(",\n".join(valores))
    file.write(";\n")

print(f"Archivo generado: {output_file}")
