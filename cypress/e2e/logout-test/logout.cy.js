describe('User Logout', () => {
  it('logs the user out when clicking the logout button', () => {
    cy.visit('index.html');

    cy.wait(1000);

    cy.get('#login_button').click();

    // Fill out the login form
    cy.get('#login_email').type('ten@stud.noroff.no');
    cy.get('#login_password').type('UserTen10');
    cy.wait(500);

    cy.get('#log_form').submit();

    cy.get('#user_profile').contains('userTen');

    cy.wait(500);

    // Clicks on the logout button
    cy.get('#logout').click();
  });
});