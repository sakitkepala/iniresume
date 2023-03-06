describe('iniresume', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.get('a').click();

    cy.get('[aria-label="Line 5"]').click();
    cy.get('[aria-label="Line 5"] input').type('Andika Priyotama{enter}');

    cy.get('[aria-label="Line 6"] input').type('Frontend Developer{enter}');
    cy.findByText(/laki-laki/i).click();

    cy.findByLabelText(/tahun lahir/i)
      .should('be.focused')
      .type('1991');
    cy.findByLabelText(/bulan lahir/i).type('08');
    cy.findByLabelText(/tanggal lahir/i).type('27{enter}');

    cy.get('[aria-label="Line 9"] input').type('Salatiga{enter}');

    cy.get('[aria-label="Line 10"] input').type('Jawa Tengah{enter}');

    cy.visit('/');

    cy.findByText(/klik untuk edit/i).click();
  });
});
