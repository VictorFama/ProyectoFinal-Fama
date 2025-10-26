/**
 * @description Muestra el historial de transacciones del usuario logueado.
 * @param {Function} renderDesc - Renderiza la vista del historial.
 * @param {Function} addLogoutButton - Agrega el botón de cerrar sesión a la vista.
 * @param {Array} CLIENTES - Lista de clientes del sistema con sus transacciones.
 * @param {string} alias - Alias del usuario logueado para mostrar su historial.
 */
 function showHistory(renderDesc, addLogoutButton, CLIENTES, alias) {
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
}

export { showHistory };