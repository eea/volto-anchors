import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Block Tests: Anchors', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Add Block: add headings and verify that the headings have id', () => {
    cy.waitForOverlayToDisappear(); // Wait for any potential overlay to disappear

    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Volto Anchors');
    cy.getSlate().click();

    // Add headings
    cy.get('.ui.drag.block.inner.slate').click().type('Title 1').click();
    cy.get('.ui.drag.block.inner.slate span span span').setSelection('Title 1');
    cy.get('.slate-inline-toolbar .button-wrapper a[title="Title"]').click({
      force: true,
    });
    cy.get('.ui.drag.block.inner.slate').click().type('{enter}');

    cy.get('.ui.drag.block.inner.slate').eq(1).click().type('Title 2').click();
    cy.get('.ui.drag.block.inner.slate span span span')
      .eq(1)
      .setSelection('Title 2');
    cy.get('.slate-inline-toolbar .button-wrapper a[title="Title"]').click({
      force: true,
    });
    cy.get('.ui.drag.block.inner.slate').eq(1).click().type('{enter}');

    // Save page
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    cy.contains('Volto Anchors');

    cy.contains('Title 1')
      .invoke('attr', 'id')
      .then((id) => {
        cy.get(`h2#${id}`).contains('Title 1');
        cy.get(`h2#${id} a`).should('have.class', 'anchor');
        cy.get(`h2#${id} a`)
          .should('have.attr', 'href')
          .and('include', `/cypress/my-page#${id}`);
        cy.get(`h2#${id} a`).click();
        cy.url().should(
          'eq',
          Cypress.config().baseUrl + `/cypress/my-page#${id}`,
        );
      });

    cy.contains('Title 2')
      .invoke('attr', 'id')
      .then((id) => {
        cy.get(`h2#${id}`).contains('Title 2');
        cy.get(`h2#${id} a`).should('have.class', 'anchor');
        cy.get(`h2#${id} a`)
          .should('have.attr', 'href')
          .and('include', `/cypress/my-page#${id}`);
        cy.get(`h2#${id} a`).click();
        cy.url().should(
          'eq',
          Cypress.config().baseUrl + `/cypress/my-page#${id}`,
        );
      });
  });
});
