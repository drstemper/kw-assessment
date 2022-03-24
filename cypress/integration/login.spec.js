import LoginPage from "../support/pages/LoginPage";

describe('Test the login page', () => {
    it('Valid Login', () => {
        cy.visit('/login');
        cy.get(LoginPage.usernameInput).type(Cypress.env('username'));
        cy.get(LoginPage.passwordInput).type(Cypress.env('password'));
        cy.get(LoginPage.loginButton).click();
        cy.url().should('include', '/secure');
        cy.get(LoginPage.messageBanner).should('contain', 'You logged into a secure area!')
    });
    it('Invalid Username', () => {
        cy.visit('/login');
        cy.get(LoginPage.usernameInput).type('invalid username');
        cy.get(LoginPage.passwordInput).type('password123');
        cy.get(LoginPage.loginButton).click();
        cy.url().should('include', '/login');
        cy.get(LoginPage.messageBanner).should('contain','Your username is invalid!');
    });
    it('Invalid Password', () => {
        cy.visit('/login');
        cy.get(LoginPage.usernameInput).type(Cypress.env('username'));
        cy.get(LoginPage.passwordInput).type('password123');
        cy.get(LoginPage.loginButton).click();
        cy.url().should('include', '/login');
        cy.get(LoginPage.messageBanner).should('contain','Your password is invalid!');
    });
});

describe('Test the secure page', () => {
    beforeEach(() => {
        LoginPage.loginWithValidCredentials();
    });
    it('Logs out succesfully', () => {
        cy.contains('Logout').click();
        cy.url().should('include', '/login');
        cy.get(LoginPage.messageBanner).should('contain','You logged out of the secure area!');
    });
});