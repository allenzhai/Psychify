/* sonar.cpd.exclusions */
/* eslint-disable */
const cryptoRandomString = require('crypto-random-string');

describe('test running empty search', () => {
  it('submits an empty searchbar', () => {
    cy.visit('localhost:3000');
    cy.get('.home-content').within(() => {
      cy.get('.form-large').submit();
    });
    cy.url().should('include', '/results?terms=')
  })
})

describe('test homepage button', () => {
  it('goes to homepage', () => {
    cy.visit('localhost:3000/forum');
    cy.get('.homepage').click();
    cy.url().should('include', '/');
  })
});

describe('test running search terms', () => {
  it('submits an empty searchbar', () => {
    cy.visit('localhost:3000');
    cy.get('.home-content').within(() => {
      cy.get('.form-large').within(() => {
        cy.get('input').type('insomnia');
      })
      cy.get('.form-large').submit();
    });
    cy.url().should('include', '/results?terms=insomnia')
  })
})

describe('test login', () => {
  it('logs into test', () => {
    cy.visit('localhost:3000');
    cy.get('a[href="/login"]').click();
    cy.get('#inputUsername').type('test');
    cy.get('#inputPassword').type('test');
    cy.get('.login-content').within(() => {
      cy.get('button').click();
    });
    cy.get('a[href="/profile"]');
  })
})

describe('test incorrect login', () => {
  it('logs in with wrong password', () => {
    cy.visit('localhost:3000');
    cy.get('a[href="/login"]').click();
    cy.get('#inputUsername').type('test');
    cy.get('#inputPassword').type('wrongpassword');
    cy.get('.login-content').within(() => {
      cy.get('button').click();
    });
    cy.get('.error');
  })
})

describe('test registration failure', () => {
  it('register existing user and fails', () => {
    cy.visit('localhost:3000');
    const username = 'test';
    const email = 'test@test.com';
    const password = username;
    cy.get('a[href="/registration"]').click();
    cy.get('#inputUsername').type(username);
    cy.get('#inputEmail').type(email);
    cy.get('#inputPassword').type(password);
    cy.get('.btn-block').click();
    cy.get('.error')
  })
})

describe('test registration', () => {
  it('register a new user', () => {
    cy.visit('localhost:3000');
    const username = cryptoRandomString({ length: 6 });
    const email = `${cryptoRandomString({ length: 8 })}@test.com`;
    const password = username;
    cy.get('a[href="/registration"]').click();
    cy.get('#inputUsername').type(username);
    cy.get('#inputEmail').type(email);
    cy.get('#inputPassword').type(password);
    cy.get('.btn-block').click();
    cy.get('a[href="/profile"]');
  })
})

describe('test going to forum', () => {
  it('logs in and navigates to forum page to browse', () => {
    cy.visit('localhost:3000');
    cy.get('a[href="/login"]').click();
    cy.get('#inputUsername').type('test');
    cy.get('#inputPassword').type('test');
    cy.get('.login-content').within(() => {
      cy.get('button').click();
    });
    cy.get('a[href="/profile"]');
    cy.get('a[href="/forum"]').click();
  })
})

describe('test profile', () => {
  it('logs into test and navigates to profile page', () => {
    cy.visit('localhost:3000');
    cy.get('a[href="/login"]').click();
    cy.get('#inputUsername').type('test');
    cy.get('#inputPassword').type('test');
    cy.get('.login-content').within(() => {
      cy.get('button').click();
    });
    cy.get('a[href="/profile"]').click();
    cy.get('.profile-card');
    cy.url().should('include', '/profile');
  })
})

describe('test login and then log out', () => {
  it('logs into test and clicks log out', () => {
    cy.visit('localhost:3000');
    cy.get('a[href="/login"]').click();
    cy.get('#inputUsername').type('test');
    cy.get('#inputPassword').type('test');
    cy.get('.login-content').within(() => {
      cy.get('button').click();
    });
    cy.get('a[href="#logout"]').click();
    cy.get('a[href="/login"]')
  })
})