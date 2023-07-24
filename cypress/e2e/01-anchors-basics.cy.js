import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Block Tests: Anchors', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Add Block: Links', () => {
    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Volto Anchors');
    cy.getSlate().click();

    // Add TOC block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get(".blocks-chooser .ui.form .field.searchbox input[type='text']").type(
      'table of contents',
    );
    cy.get('.button.toc').click();

    // Save page
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');
  });

  it('Add Block: add content to TOC', () => {
    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Volto Anchors');
    cy.getSlate().click();

    // Add TOC block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get(".blocks-chooser .ui.form .field.searchbox input[type='text']").type(
      'table of contents',
    );
    cy.get('.button.toc').click();

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

    // Check if the page contains the TOC and the headings
    cy.contains('Volto Anchors');
    cy.contains('Title 1');
    cy.contains('Title 2');
    cy.get('a[href="#title-1"]').click();
    cy.get('a[href="#title-2"]').click();
    cy.get('h2[id="title-1"]').contains('Title 1');
    cy.get('h2[id="title-2"]').contains('Title 2');
  });
});