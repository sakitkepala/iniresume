describe('iniresume', () => {
  beforeEach(() => cy.visit('/'));

  it('flow buat & edit resume', () => {
    const data = {
      fullName: 'Full Name',
      title: 'Profession Title',
    };

    cy.findByRole('button', { name: /buat resume/i }).click();

    cy.findByRole('heading', { name: /generate/i }).should('exist');
    cy.get('body').type('{downArrow}');

    cy.findByPlaceholderText(/nama lengkap/i).type(`${data.fullName}{Enter}`);
    cy.findByPlaceholderText(/titel profesi/i).type('Profession Title{Enter}');
    cy.findByRole('button', { name: /laki/i }).click();

    cy.findByLabelText(/tahun lahir/i).type('2000');
    cy.findByLabelText(/bulan lahir/i).type('08');
    cy.findByLabelText(/tanggal lahir/i).type('08{Enter}');

    cy.findByPlaceholderText(/kota domisili/i).type('City{Enter}');
    cy.findByPlaceholderText(/provinsi domisili/i).type('Province{Enter}');

    cy.findByPlaceholderText(/tentang diri/i).type(
      'About description...{Enter}'
    );

    cy.findByPlaceholderText(/email/i).type('email@example.com{Enter}');
    cy.findByLabelText(/telepon/i).type('85777777777');
    cy.findByLabelText(/whatsapp/i).click();
    cy.findByLabelText(/telepon/i).type('{Enter}');

    cy.findByPlaceholderText(/teks link/i).type('example.com{Enter}');
    cy.findByPlaceholderText(/url website/i).type('example.com{Enter}');

    cy.findByPlaceholderText(/teks link/i).type('Github Profile{Enter}');
    cy.findByPlaceholderText(/url/i).type('ghprofile{Enter}');

    cy.findByPlaceholderText(/teks link/i).type('Linkedin Profile{Enter}');
    cy.findByPlaceholderText(/url/i).type('inprofile{Enter}');

    cy.findByPlaceholderText(/platform/i).type('instagram{Enter}');
    cy.findByPlaceholderText(/teks link/i).type('Instagram Profile{Enter}');
    cy.findByPlaceholderText(/url/i).type('igprofile{Enter}');

    cy.findByPlaceholderText(/platform/i).type('{downArrow}');

    cy.findByPlaceholderText(/titel pekerjaan/i).type('Job Title{Enter}');
    cy.findByPlaceholderText(/nama perusahaan/i).type('Employer{Enter}');
    cy.findByLabelText(/bulan mulai/i).type('03');
    cy.findByLabelText(/tahun mulai/i).type('2023');
    cy.findByLabelText(/berlangsung/i).click();
    cy.findByLabelText(/bulan selesai/i).type('{Enter}');

    cy.findByPlaceholderText(/deskripsikan pekerjaan/i).type(
      'Job description...{Enter}'
    );

    cy.findByPlaceholderText(/judul projek/i).type('Project Name{Enter}');
    cy.findByPlaceholderText(/deskripsikan projek/i).type(
      'Project description...{Enter}'
    );
    cy.findByPlaceholderText(/link projek/i).type('{End}example.com{Enter}');

    cy.findByText(/isi pendidikan/i).click();

    cy.findByPlaceholderText(/universitas/i).type('My University{Enter}');
    cy.findByPlaceholderText(/jurusan/i).type('My Major{Enter}');
    cy.findByLabelText(/mulai/i).type('2018');
    cy.findByLabelText(/selesai/i).type('2022{Enter}');
    cy.findByPlaceholderText(/deskripsi studi/i).type(
      'Study description...{Enter}'
    );

    cy.findByText(/isi skill/i).click();

    cy.findByPlaceholderText(/punya skill/i).type('primary skill{Enter}');
    cy.findByPlaceholderText(/punya skill/i).type('secondary skill{Enter}');

    cy.findByText(/masukkan beberapa projek/i).click();

    cy.findByPlaceholderText(/judul projek/i).type('Other project Name{Enter}');
    cy.findByPlaceholderText(/deskripsikan projek/i).type(
      'Other project description...{Enter}'
    );
    cy.findByPlaceholderText(/link projek/i).type('{End}example.com{Enter}');

    cy.findByRole('button', { name: /preview/i }).click();
    cy.findByTitle(/pratinjau resume/i).should('exist');

    cy.findByRole('button', { name: /atur ulang/i }).click();

    // Gak accessible menurut Cypress, tapi secara manual working.
    // Jadi sementara diakalin pakai force gini.
    cy.findByLabelText(/bahasa inggris/i).click({ force: true });

    cy.findByRole('button', { name: /preview/i }).click();

    cy.window().then((win) => {
      cy.spy(win, 'open').as('download');
    });

    cy.findByRole('button', { name: /unduh/i }).should('be.enabled').click();

    cy.get('@download').should('be.called');

    cy.findByRole('link', { name: /iniresume/i }).click();

    cy.findByText(/masih punya resume/i)
      .should('exist')
      .within(() => {
        cy.findByRole('button', { name: /edit/i }).click();
      });

    cy.findByRole('heading', { name: /generate/i });
    cy.get('body').type('{downArrow}');

    cy.findByPlaceholderText(/nama lengkap/i)
      .should('contain.value', data.fullName)
      .type('{End} Edited{Enter}');

    cy.findByRole('link', { name: /iniresume/i }).click();

    cy.findByRole('button', { name: /buat resume baru/i }).click();

    cy.findByRole('button', { name: /hapus/i }).click();

    cy.findByRole('heading', { name: /generate/i });
    cy.get('body').type('{downArrow}');

    cy.findByPlaceholderText(/nama lengkap/i)
      .should('not.contain.value', `${data.fullName} Edited`)
      .and('have.value', '');
  });
});
