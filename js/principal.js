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
  //console.log('id:', selected.id);
  //console.log('value:', selected.value);
  const labelText = document.querySelector(`label[for="${selected.id}"]`)?.textContent.trim();
  //console.log('label:', labelText);
}

/*
//funcion para mostrar el balance actual del usuario logueado
function showBalance() {
    const user = CLIENTES.find(c => c.alias === alias);
    //console.log('usuario', user);
    const balance = user.balance;

    renderDesc(`
        <div class="container text-center mb-4">
            <div class="row justify-content-center">
                <div class="col-8 card">
                    <div class="card-body">
                    <h5 class="card-title mb-2">Saldo Actual.</h5>
                    <p class="mb-0">Tu balance es: <strong>$${(balance.toFixed(2))}</strong>.</p>
                    </div>
                </div>
            </div>
        </div>
    `);
    addLogoutButton();
}*/

/*
//Funcion para mostrar el deposito, cuando se confirma se llama a updateAccount para actualizar el balance
function showDeposit() {
  renderDesc(`
    <div class="container text-center mb-4">
        <div class="row justify-content-center">
            <div class="col-8 card">
                <div class="card-body">
                    <h5 class="card-title mb-2">Deposito</h5>
                    <p class="mb-2">Ingrese la cantidad que desea depositar.</p>
                    <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input id="depositAmount" type="number" min="1" class="form-control" placeholder="Cantidad">
                    <button class="btn btn-custom" id="btnDeposit">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `);
  const btnDeposit = document.getElementById(`btnDeposit`);
  const inputDeposit = document.getElementById(`depositAmount`);
  btnDeposit.onclick = () => updateAccount(inputDeposit.value, `Deposito`);
  addLogoutButton();
}*/

/*
//Funcion para mostrar el retiro, cuando se confirma se llama a updateAccount para actualizar el balance
function showWithdraw() {
  renderDesc(`
    <div class="container text-center mb-4">
        <div class="row justify-content-center">
            <div class="col-8 card">
                <div class="card-body">
                    <h5 class="card-title mb-2">Retiro</h5>
                    <p class="mb-2">Ingrese la cantidad que desea retirar.</p>
                    <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input id="withdrawAmount" type="number" min="1" class="form-control" placeholder="Cantidad">
                    <button class="btn btn-custom" id="btnWithdraw">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `);
  const btnWithdraw = document.getElementById(`btnWithdraw`);
  const inputWithdraw = document.getElementById(`withdrawAmount`);
  btnWithdraw.onclick = () => updateAccount(inputWithdraw.value, `Retiro`);
  addLogoutButton();
}*/

/*
function showTransfer() {
  renderDesc(`
    <div class="container text-center mb-4">
        <div class="row justify-content-center">
            <div class="col-8 card">
                <div class="card-body">
                    <h5 class="card-title mb-2">Transferencia</h5>
                    <p class="mb-2">Enviar dinero a otro usuario.</p>
                    <div class="row g-2">
                    <div class="col-md-6">
                        <input id="toAlias" type="text" class="form-control" placeholder="Alias del destinatario">
                    </div>
                    <div class="col-md-6">
                        <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input id="transferAmount" type="number" min="1" class="form-control" placeholder="Cantidad">
                        </div>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-custom" id="btnTransfer">Confirm</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `);
  const btnTransfer = document.getElementById('btnTransfer');
  const inputAlias = document.getElementById('toAlias');
  const inputTransferAmount = document.getElementById('transferAmount');
  btnTransfer.onclick = () => updateAccount(inputTransferAmount.value, 'Transferencia', inputAlias.value.trim());
  addLogoutButton();
}
  */
/*
//Funcion para mostrar el historial de transactions del usuario logueado
function showHistory() {
  const user = CLIENTES.find(c => c.alias === alias);
  let transactionsHTML = '';
  if (user.transactions.length === 0) {
    transactionsHTML = '<p>No hay transacciones registradas.</p>';
  } else {
    transactionsHTML = user.transactions
      .map(mov => `<p>${mov.type}: $${mov.amount.toFixed(2)} (Saldo: $${mov.actualBalance.toFixed(2)})</p>`)
      .join('');
  }

  renderDesc(`
    <div class="container text-center mb-4">
        <div class="row justify-content-center">
            <div class="col-8 card">
                <div class="card-body">
                    <h5 class="card-title mb-2">Historial</h5>
                    ${transactionsHTML}
                </div>
            </div>
        </div>
    </div>
  `);
  addLogoutButton();
}*/

//Dependiendo del tipo de transaccion sumo los depositos, resto los retiros, guardo los transactions, actualizo el local storage y limpio los inputs
function updateAccount(value, type, recipientAlias) {
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

//Funcion para agregar el boton de logout y borrar el usuario del localStorage
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
      case `Deposit`:   showDeposit(renderDesc, updateAccount, addLogoutButton);  break;
      case `Withdraw`:  showWithdraw(renderDesc, updateAccount, addLogoutButton); break;
      case `Transfer`:  showTransfer(renderDesc, updateAccount, addLogoutButton); break;
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
      case `Deposit`:   showDeposit(renderDesc, updateAccount, addLogoutButton);  break;
      case `Withdraw`:  showWithdraw(renderDesc, updateAccount, addLogoutButton); break;
      case `Transfer`:  showTransfer(renderDesc, updateAccount, addLogoutButton); break;
      case `History`:   showHistory(renderDesc, addLogoutButton, CLIENTES, alias);  break;
    }
  }
});