import PageSection from "../../support/elements/pagesSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import jsonData from "./data/P033.json";

const pageSection = new PageSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición del campo Excerpt con 300 caracteres.", () => {
  it("Edición del campo Excerpt con 300 caracteres.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear páginas
    cy.login();

    // Va a la pestaña Pages
    adminMenu.pageTab.click();
    cy.wait(1000);

    // Crea la página a editar
    const title = jsonData.title;
    const content = jsonData.body;

    pageSection.createPage(title, content);

    // Publica la página
    pageSection.publishPage();

    /* 
    -------------
      WHEN
    -------------
    */

    const excerpt = jsonData.excerpt;

    // Edita el campo Excerpt
    pageSection.editorSettingsButton.click();
    pageSection.getExcerptField.scrollIntoView().type(excerpt);
    pageSection.editorSettingsCloseButton.click();
    cy.wait(1000);
    pageSection.editorUpdateDropdown.click();
    pageSection.editorUpdateButton.click();

    /* 
    -------------
      THEN
    -------------
    */
    cy.reload();
    pageSection.editorSettingsButton.click();
    pageSection.getExcerptField.scrollIntoView().should("have.value", excerpt);
  });
});
