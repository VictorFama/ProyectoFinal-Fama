let CLIENTES = [];

//Obtengo los datos de los clientes desde el archivo JSON y los guardo en la variable CLIENTES
async function loadClientes() {
  try {
    const res = await fetch('./clientes.json');
    CLIENTES = await res.json();
  } catch (e) {
    Swal.fire({
      title: 'Error',
      text: 'No se pudieron cargar los datos de los clientes.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }
}


async function initLogin() {
    //Espero a que se carguen los clientes
    await loadClientes(); 

    //Cuando se envia el formulario de login
    document.querySelector('.form-container').addEventListener('submit', function(event) {
        event.preventDefault();
        
        //Obtengo los valores de alias y pin ingresados en el formulario
        const alias = document.getElementById('alias').value;
        const pin = document.getElementById('pin').value;

        const user = CLIENTES.find(c => c.alias.trim() === alias.trim() && c.pin === pin);
        if (user) {
            localStorage.setItem('user', JSON.stringify({ alias: user.alias, name: user.name }));
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Bienvenido ${user.name}`,
                showConfirmButton: false,
                timer: 1500
                }).then(() => {
                    window.location.href = 'principal.html'
                });
        }else {
            Swal.fire({
                title: 'Error',
                text: 'Alias o PIN incorrecto.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        }
    });
}

initLogin();
