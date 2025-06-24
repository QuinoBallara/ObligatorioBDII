def convertir_false_a_true(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        contenido = file.read()

    # Reemplaza solo los FALSE que están al final de cada fila de valores
    import re
    # Busca FALSE que esté seguido por ")" (posiblemente con espacios o saltos de línea)
    contenido_modificado = re.sub(r'\bFALSE\b(?=\s*\))', 'TRUE', contenido)

    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(contenido_modificado)

    print(f"Archivo procesado y guardado en: {output_file}")

convertir_false_a_true('inserciones_ciudadano.txt', 'inserciones_corregido.txt')