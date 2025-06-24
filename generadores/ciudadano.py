import random
from datetime import datetime, timedelta

# Arrays de nombres y apellidos
nombresH = [
    "Juan", "Pedro", "Luis", "Carlos", "Miguel", "Facundo", "Gastón", "Joaquín", "Joshua", "Mauro", "Adolfo", "Gustavo", "Felipe",
    "Mathias", "Matias", "Mauricio", "Kevin", "Joni", "Brashan", "Andrés", "Santiago", "Tomás", "Francisco", "Diego", "Agustín",
    "Lucas", "Mateo", "Nicolás", "Martín", "Emiliano", "Gabriel", "Leonardo", "Alejandro", "Daniel", "Javier", "Sebastián", "Pablo",
    "Manuel", "Ramiro", "Iván", "Bruno", "Enzo", "Simón", "Samuel", "Benjamín", "Damián", "Axel", "Valentín", "Federico", "Emmanuel",
    "Maximiliano", "Cristian", "Ricardo", "Eduardo", "Hernán", "Julio", "Raúl", "Oscar", "Rubén", "Alberto", "Fernando", "Esteban",
    "Guillermo", "Hugo", "Ignacio", "Jorge", "Leandro", "Mariano", "Patricio", "Rafael", "Sergio", "Ulises", "Vicente", "Walter",
    "Adrián", "Alan", "Alfonso", "Armando", "Arturo", "Baltasar", "Camilo", "César", "Dante", "Elías", "Ernesto", "Fabián", "Franco",
    "Germán", "Ismael", "Jacobo", "Lautaro", "Lisandro", "Luciano", "Marcos", "Mario", "Matías", "Nahuel", "Omar", "Orlando", "Renzo",
    "Rodrigo", "Salvador", "Teo", "Thiago", "Tobías", "Valentino", "Vicente", "Wilfredo", "Yago", "Zacarías"
]
nombresM = [
    "María", "Ana", "Lucía", "Elena", "Sofía", "Candelaria", "Selena", "Serena", "Genyfer", "Jolanda", "Melina", "Jessica", "Isabela",
    "Valentina", "Camila", "Martina", "Paula", "Agustina", "Julieta", "Victoria", "Emilia", "Mía", "Catalina", "Renata", "Abril", "Josefina",
    "Florencia", "Delfina", "Bianca", "Carla", "Gabriela", "Clara", "Ariana", "Milagros", "Lara", "Carolina", "Noelia", "Rocío", "Daniela",
    "Pilar", "Guadalupe", "Antonella", "Brenda", "Sol", "Ailén", "Malena", "Luz", "Celeste", "Tamara", "Natalia", "Andrea", "Lorena",
    "Patricia", "Sandra", "Verónica", "Silvana", "Mónica", "Romina", "Marina", "Leticia", "Vanesa", "Cecilia", "Estefanía", "Marisol",
    "Alicia", "Susana", "Graciela", "Mirta", "Norma", "Beatriz", "Silvia", "Teresa", "Rosa", "Marta", "Claudia", "Viviana", "Fernanda",
    "Ariadna", "Evelyn", "Pamela", "Yamila", "Mariela", "Jimena", "Aixa", "Aldana", "Juliana", "Magalí", "Brisa", "Aitana", "Zoe",
    "Mara", "Bárbara", "Fátima", "Nadia", "Ivana", "Melisa", "Agueda", "Aurelia", "Consuelo", "Eugenia", "Inés", "Irene", "Lidia",
    "Mercedes", "Nuria", "Olga", "Raquel", "Sara", "Violeta", "Yolanda"
]
apellidos = ["González", "Rodríguez", "Pérez", "López", "Martínez", "Sánchez", "Ramírez", "Torres", "Flores", "Castillo", "Kojima", "Torvalds", "De León", "De Luque", "Mesa", "Silla", "Camión", "Acero", "De la Pradera Cálida", "Bonaventura", "Sativa", "Saldaño", "Gómez", "Cripto", "Milei", "Kirchner", "Correa", "Machado", "Pomar", "Acevedo"]

# Función para generar una fecha de nacimiento aleatoria entre 0 y 100 años
def random_birth_date(min_age=0, max_age=100):
    today = datetime.today()
    birth_date = today - timedelta(days=random.randint(min_age * 365, max_age * 365))
    return birth_date.date()

# Ruta del archivo de salida
output_file = "inserciones_ciudadano.txt"

used_ids = set()
values_list = []

for _ in range(1000):
    # ID único
    while True:
        id_val = random.randint(1_000_000, 8_000_000)
        if id_val not in used_ids:
            used_ids.add(id_val)
            break

    sexo = random.randint(1, 2)
    nombres = nombresM if sexo == 1 else nombresH

    primer_nombre = random.choice(nombres)
    segundo_nombre = random.choice(nombres) if random.random() < 0.6 else "NULL"
    primer_apellido = random.choice(apellidos)
    segundo_apellido = random.choice(apellidos) if random.random() < 0.7 else "NULL"
    fecha_nacimiento = random_birth_date().isoformat()
    esta_vivo = 'TRUE'

    values = (
        id_val,
        f"'{primer_nombre}'",
        f"'{segundo_nombre}'" if segundo_nombre != "NULL" else "NULL",
        f"'{primer_apellido}'",
        f"'{segundo_apellido}'" if segundo_apellido != "NULL" else "NULL",
        f"'{fecha_nacimiento}'",
        esta_vivo
    )

    values_list.append(f"({', '.join(map(str, values))})")

# Escribir todo en una sola sentencia INSERT
with open(output_file, "w", encoding="utf-8") as file:
    file.write("INSERT INTO Ciudadano (id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, esta_vivo) VALUES\n")
    file.write(",\n".join(values_list))
    file.write(";\n")

print(f"Archivo generado: {output_file}")
