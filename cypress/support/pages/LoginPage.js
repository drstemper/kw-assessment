const LoginPage = {
    // Elements
    usernameInput: '#username',
    passwordInput: '#password',
    loginButton: 'button[type=submit]',
    messageBanner: '#flash-messages',

    // Actions
    loginWithValidCredentials() {
        cy.visit('/login');
        cy.get(this.usernameInput).type(Cypress.env('username'));
        cy.get(this.passwordInput).type(Cypress.env('password'));
        cy.get(this.loginButton).click();
        cy.url().should('include', '/secure');
    }
}

export default LoginPage;