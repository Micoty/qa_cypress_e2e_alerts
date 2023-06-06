describe('Cypress application', () => {

  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts')
  });

  it('Should have the ability to assert automatically resolved alerts', () => {

    cy.get('#alertButton')
      .click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('You clicked a button');
    });
  });

  it('Should have the ability to assert scheduled alert', () => {

    cy.get('#timerAlertButton')
      .click()
      .wait(5000);
    cy.on('window:alert', (text) => {
      expect(text).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('Should autimatically resolve alerts', () => {

    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?')
    cy.get('#confirmResult')
    .should('contain', 'You selected Ok');
    return true;
    });
  });

  it('Should have the ability to Cancel alerts', () => {

    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?')
    cy.get('#confirmResult')
    .should('contain', 'You selected Cancel');
    return false;
    });
  });

  it('should have the ability to enter text to alert', () => {
    
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Something');
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain.text', 'You entered Something');
    });
  });
});

