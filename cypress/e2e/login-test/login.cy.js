describe('User Login Functionality', () => {
  it('should log in successfully', () => {
    cy.visit('http://127.0.0.1:5500/');

    cy.wait(1000);

    cy.get('#login_button').click();

    cy.wait(1000);

    // Fill out the login form
    cy.get('#login_email').type('ten@stud.noroff.no');
    cy.get('#login_password').type('UserTen10');
    cy.wait(1000);
    
    cy.get('#log_form').submit();

    cy.wait(1000);
  });
});