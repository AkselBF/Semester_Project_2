describe('User Login Functionality', () => {
  it('should log in successfully', () => {
    cy.visit('index.html');

    cy.wait(1000);

    cy.get('#login_button').click();

    // Fill out the login form
    cy.get('#login_email').type('ten@stud.noroff.no');
    cy.get('#login_password').type('UserTen10');

    cy.wait(500);
    
    cy.get('#log_form').submit();

    cy.get('#user_profile').contains('userTen');
  });
});