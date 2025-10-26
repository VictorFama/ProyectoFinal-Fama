/**
 * @description Muestra el balance actual del usuario logueado.
 * @param {Function} renderDesc - Renderiza la vista del saldo en pantalla.
 * @param {Function} addLogoutButton - Agrega el botón de cerrar sesión en la vista.
 * @param {Array} CLIENTES - Lista completa de usuarios del sistema.
 * @param {string} alias - Alias del usuario logueado para obtener su balance.
 */function showBalance(renderDesc, addLogoutButton, CLIENTES, alias) {
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
}

export { showBalance };