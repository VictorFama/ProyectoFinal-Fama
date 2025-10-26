/**
 * Muestra la pantalla de transferencia y gestiona el envío de datos al actualizar la cuenta del usuario.
 *
 * @param {Function} renderDesc - Función para renderizar la UI de la sección.
 * @param {Function} updateAccount - Función que ejecuta la transferencia en la cuenta.
 * @param {Function} addLogoutButton - Función que agrega el botón de logout.
 */
function showTransfer(renderDesc, updateAccount, addLogoutButton, CLIENTES, alias) {
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
  btnTransfer.onclick = () => updateAccount(inputTransferAmount.value, 'Transferencia', alias, inputAlias.value.trim());
  addLogoutButton();
}

export { showTransfer };