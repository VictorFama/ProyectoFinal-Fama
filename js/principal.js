import { showBalance } from './balance.js';
import { showDeposit } from './deposit.js';
import { showWithdraw } from './withdraw.js';
import { showTransfer } from './transfer.js';
import { showHistory } from './history.js';

//Creo el array de clientes
const DEFAULT_CLIENTES = [  
  { name: `Victor`, alias: `victor`, balance: 50000,  transactions: [] },
  { name: `Martin`, alias: `martin`, balance: 120000, transactions: [] },
  { name: `Alicia`, alias: `alicia`, balance: 35000,  transactions: [] },
  { name: `Ruben`,  alias: `ruben`,  balance: 85000,  transactions: [] }
];
// Si ya hay clientes en localStorage los uso si no hay uso los por defecto
let CLIENTES = JSON.parse(localStorage.getItem(`CLIENTES`)) ?? DEFAULT_CLIENTES;
if (!localStorage.getItem(`CLIENTES`)) {
  localStorage.setItem(`CLIENTES`, JSON.stringify(CLIENTES));
}

//Obtengo el usuario logueado del localStorage
const user = localStorage.getItem(`user`);
//A partir del usuario logueado obtengo su name y alias
const name = JSON.parse(user).name;
const alias = JSON.parse(user).alias;

const generalDiv = document.createElement(`div`);
generalDiv.className = `container py-4`;
generalDiv.innerHTML = `<h1 class="bienvenida">Bienvenido: <strong>${name}</strong></h1>`;
document.body.appendChild(generalDiv);

const radiosDiv = document.getElementById(`radios`); 
generalDiv.appendChild(radiosDiv)

let descDiv = document.getElementById(`actionDesc`);
if (!descDiv) {
  descDiv = document.createElement(`div`);
  descDiv.id = `actionDesc`;
  descDiv.className = `container py-3`;
  radiosDiv.insertAdjacentElement(`afterend`, descDiv);
}

function renderDesc(html) {
  descDiv.innerHTML = html;
}

const selected = document.querySelector(`input[name="radioDefault"]:checked`);
if (selected) {
  const labelText = document.querySelector(`label[for="${selected.id}"]`)?.textContent.trim();
}

/**
 * @description Dependiendo del tipo de transaccion sumo los depositos, resto los retiros, guardo los transactions, actualizo el local storage y limpio los inputs
 * @param {number} value - Monto ingresado por el usuario.
 * @param {'Deposito' | 'Retiro' | 'Transferencia'} type - Tipo de operación.
 * @param {string} alias - Alias del usuario logueado.
 * @param {string} [recipientAlias] - Alias del destinatario (solo para transferencias).
 */
function updateAccount(value, type, alias, recipientAlias = null) {
  const user = CLIENTES.find(c => c.alias === alias);
  const amount = parseFloat(value);
  if (isNaN(amount) || amount <= 0) 
    return Swal.fire({
      title: 'Error',
      text: 'Debe ingresar una cantidad valida.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  switch (type) {
    case `Deposito`:
      user.balance += amount;
      user.transactions.push({ type: `Deposito`, amount, actualBalance: user.balance});
      localStorage.setItem(`CLIENTES`, JSON.stringify(CLIENTES));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Deposito exitoso.',
        text: `Nuevo saldo: $${user.balance.toFixed(2)}`,
        confirmButtonText: 'Aceptar'
      });
      const inputAmount = document.getElementById('depositAmount');
      if (inputAmount) inputAmount.value = '';
      break;
    case `Retiro`:
      if (user.balance < amount)  
        return Swal.fire({
          title: 'Error',
          text: 'Saldo insuficiente.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      user.balance -= amount;
      user.transactions.push({ type: `Retiro`, amount, actualBalance: user.balance});
      localStorage.setItem(`CLIENTES`, JSON.stringify(CLIENTES));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Retiro exitoso.',
        text: `Nuevo saldo: $${user.balance.toFixed(2)}`,
        confirmButtonText: 'Aceptar'
      });
      const inputWithdraw = document.getElementById(`withdrawAmount`);
      if (inputWithdraw) inputWithdraw.value = '';
      break;
    case `Transferencia`:
      if (user.alias === recipientAlias) 
        return Swal.fire({
          title: 'Error',
          text: 'No puedes transferirte a ti mismo.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      const recipient = CLIENTES.find(c => c.alias === recipientAlias);
      if (!recipient) 
        return Swal.fire({
          title: 'Error',
          text: 'Destinatario no encontrado.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      if (user.balance < amount) 
        return Swal.fire({
          title: 'Error',
          text: 'Saldo insuficiente.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      user.balance -= amount;
      recipient.balance += amount;
      user.transactions.push({ type: `Transferencia Enviada a ${recipient.name}`, amount, actualBalance: user.balance});
      recipient.transactions.push({ type: `Transferencia Recibida de ${user.name}`, amount, actualBalance: recipient.balance});
      localStorage.setItem(`CLIENTES`, JSON.stringify(CLIENTES));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Transferencia exitosa a ${recipient.name} de $${amount}.`,
        text: `Nuevo saldo: $${user.balance.toFixed(2)}`,
        confirmButtonText: 'Aceptar'
      });
        const inputTransferAmount = document.getElementById(`transferAmount`);
      if (inputTransferAmount) inputTransferAmount.value = '';
      break;
    default:
      return Swal.fire({
          title: 'Error',
          text: 'Error.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
  }
}
/**
 * @description Funcion para agregar el boton de logout y borrar el usuario del localStorage
 * @returns {void}
 */
function addLogoutButton() {
  const logoutDiv = document.createElement(`div`);
  logoutDiv.className = `text-center mt-3`;
  logoutDiv.innerHTML = `
    <button class="btn btn-danger" id="btnLogout">Cerrar sesion</button>
  `;
  descDiv.appendChild(logoutDiv);

  document.getElementById(`btnLogout`).addEventListener(`click`, () => {
    localStorage.removeItem(`user`);
    Swal.fire({
      title: '¿Seguro que querés cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(`user`);
        Swal.fire({
          position: 'top-end',
          title: 'Sesión cerrada',
          icon: 'success',
          timer: 1200,
          showConfirmButton: false
        }).then(() => {
          window.location.href = `index.html`;
        });
      }
    });

  });
}

//Evento para cargar la opcion seleccionada en los radio buttons al cargar la pagina
window.addEventListener(`DOMContentLoaded`, () => {
  const selected = document.querySelector(`input[name="radioDefault"]:checked`);
  if (selected) {
    switch (selected.id) {
      case `Balance`:   showBalance(renderDesc, addLogoutButton, CLIENTES, alias);  break;
      case `Deposit`:   showDeposit(renderDesc, updateAccount, addLogoutButton, CLIENTES, alias);  break;
      case `Withdraw`:  showWithdraw(renderDesc, updateAccount, addLogoutButton, CLIENTES, alias); break;
      case `Transfer`:  showTransfer(renderDesc, updateAccount, addLogoutButton, CLIENTES, alias); break;
      case `History`:   showHistory(renderDesc, addLogoutButton, CLIENTES, alias);  break;
    }
  }
});

//Evento para detectar el cambio de opcion en los radio buttons y llamar a la funcion correspondiente
document.addEventListener(`change`, (e) => {
  if (e.target.name === `radioDefault`) {
    const { id, value } = e.target;
    //console.log(`Seleccionado:`, { id, value });
    switch (id) {
      case `Balance`:   showBalance(renderDesc, addLogoutButton, CLIENTES, alias);  break;
      case `Deposit`:   showDeposit(renderDesc, updateAccount, addLogoutButton, CLIENTES, alias);  break;
      case `Withdraw`:  showWithdraw(renderDesc, updateAccount, addLogoutButton, CLIENTES, alias); break;
      case `Transfer`:  showTransfer(renderDesc, updateAccount, addLogoutButton, CLIENTES, alias); break;
      case `History`:   showHistory(renderDesc, addLogoutButton, CLIENTES, alias);  break;
    }
  }
});