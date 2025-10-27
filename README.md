# 🏧 Simulador de Cajero Automático

Este proyecto es un **Simulador de Cajero** desarrollado en **HTML, CSS y JavaScript** utilizando **ES Modules**.  
Permite a un usuario iniciar sesión con alias y PIN, y luego realizar operaciones bancarias como:

✔ Consultar saldo  
✔ Depositar dinero  
✔ Retirar dinero  
✔ Transferir a otro usuario  
✔ Ver historial de transacciones  

El sistema utiliza **LocalStorage** para almacenar los usuarios y sus movimientos.

---

## 🚀 Funcionalidades

| Funcion | Descripcion |
|--------|-------------|
| Login | Validacion de alias y PIN con SweetAlert2 |
| Menu principal | Navegacion entre acciones |
| Saldo | Muestra el balance actual |
| Depositos | Incrementa el saldo |
| Retiros | Descuenta el saldo si es suficiente |
| Transferencias | Enviar dinero a otros usuarios |
| Historial | Muestra todas las transacciones |
| Logout | Cierre de sesión y limpieza de usuario |

---

## 🗂️ Estructura del proyecto
```bash
ProyectoFinal-Fama/
│
├🗂️ js/
│   ├📜 balance.js        # Vista de consulta de saldo
│   ├📜 deposit.js        # Vista de depositos
│   ├📜 history.js        # Vista del historial
│   ├📜 index.js          # Lógica de login
│   ├📜 principal.js      # Control principal de operaciones
│   ├📜 transfer.js       # Vista de transferencias
│   ├📜 withdraw.js       # Vista de retiros
│
├🗂️ style/
│   └🎨 style.css         # Estilos de la interfaz
│
├📄 index.html            # Pantalla de inicio / login
├📄 principal.html        # Pantalla principal del cajero
├⚙️ .gitignore            # Archivos ignorados por Git
├⚙️ clientes.json         # Fuente de datos inicial de los usuarios
└📝 README.md             # Documentación del proyecto

```

---

## 🛠️ Tecnologías usadas

- HTML5 + CSS3
- JavaScript ES Modules
- Bootstrap 5 (CDN)
- SweetAlert2 (CDN)
- LocalStorage

---

## 🔐 Usuarios de prueba

| Nombre | Alias | PIN | Saldo inicial |
|--------|------|-----|--------------|
| Victor | victor | 1234 | $50.000 |
| Martin | martin | 2222 | $120.000 |
| Alicia | alicia | 9999 | $35.000 |
| Ruben | ruben | 9999 | $85.000 |

---

# ▶️ ¿Cómo ejecutar el proyecto?

**1.** Descargar o clonar el repositorio:
```bash
git clone https://github.com/VictorFama/ProyectoFinal-Fama.git
```

**2.** npm install
```bash
npm install
```

**3.** Abrir **index.html** en el navegador

**4.** Iniciar sesión con uno de los usuarios predefinidos

✅ Recomendado: usar Live Server para evitar problemas de rutas con módulos importados