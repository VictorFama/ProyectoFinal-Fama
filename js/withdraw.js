/**
 * @description Muestra la vista de retiro y vincula el botón de confirmación. Cuando se hace clic en Confirm, llama a updateAccount para actualizar el balance.
 * @param {Function} renderDesc - Renderiza la sección de retiro en pantalla.
 * @param {Function} updateAccount - Aplica el retiro al usuario logueado.
 * @param {Function} addLogoutButton - Agrega el botón de cerrar sesión a la vista.
 */
function showWithdraw(renderDesc, updateAccount, addLogoutButton, CLIENTES, alias) {
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
  btnWithdraw.onclick = () => updateAccount(inputWithdraw.value, `Retiro`, alias);
  addLogoutButton();
}

export { showWithdraw };