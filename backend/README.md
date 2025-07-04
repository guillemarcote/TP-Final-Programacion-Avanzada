### Paso 1: Crear y activar entorno virtual
python -m venv venv
venv\Scripts\activate  # En Windows
# source venv/bin/activate  # En Linux/Mac

### Paso 2: Instalar dependencias
python -m pip install -r requirements.txt
pip install django djangorestframework django-cors-headers

### Paso 3: Migraciones
python manage.py makemigrations
python manage.py migrate

### Paso 4: Crear superusuario (opcional para admin)
python manage.py createsuperuser

### Paso 5: Ejecutar servidor
python manage.py runserver

## Esto levantará el backend en:
## http://localhost:8000