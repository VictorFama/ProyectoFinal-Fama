/**
 * @description Muestra la vista de depósito y vincula el botón de confirmación. Cuando se hace clic en Confirm, llama a updateAccount para actualizar el balance.
 * @param {Function} renderDesc - Renderiza la sección de depósito en pantalla.
 * @param {Function} updateAccount - Aplica el depósito al usuario logueado.
 * @param {Function} addLogoutButton - Agrega el botón de cerrar sesión a la vista.
 */
function showDeposit(renderDesc, updateAccount, addLogoutButton, CLIENTES, alias) {
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
  btnDeposit.onclick = () => updateAccount(inputDeposit.value, `Deposito`, alias);
  addLogoutButton();
}

export { showDeposit };