import PageSection from "../../support/elements/pagesSection";
import AdminMenu from "../../support/elements/adminMenu";
import jsonData from "./data/P022.json";

const pageSection = new PageSection();
const adminMenu = new AdminMenu();

describe("Publicación de una página nueva con título de 256 caracteres normales.", () => {
  it("Publicación de una página nueva con título de 256 caracteres normales.", () => {
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

    /* 
    -------------
      WHEN
    -------------
    */

    const title = jsonData.title;
    const body = jsonData.body;
    // Crea la página
    pageSection.createPage(title, body);
    // Publica la página
    pageSection.publishPage();

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que salga el error
    pageSection.errorAlert
      .should("be.visible")
      .contains("Saving failed: Title cannot be longer than 255 characters.");
    pageSection.errorAlertCloseButton.click();
  });
});
