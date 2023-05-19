import PageSection from "../../support/elements/pagesSection";
import AdminMenu from "../../support/elements/adminMenu";
import jsonData from "./data/P030.json";

const pageSection = new PageSection();
const adminMenu = new AdminMenu();

describe("Edición únicamente del título de una página con 256 caracteres normales.", () => {
  it("Edición únicamente del título de una página con 256 caracteres normales.", () => {
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
    const title = "Página a editar";
    const content = jsonData.body;

    pageSection.createPage(title, content);

    // Publica la página
    pageSection.publishPage();
    pageSection.goBackToPagesSection.click();

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona la página a editar
    pageSection.pageInList(title).click();

    // Edita el título de una página con caracteres especiales
    const newTitle = jsonData.title;

    pageSection.editorContainerTitle.clear().type(newTitle);
    pageSection.editorUpdateDropdown.click();
    pageSection.editorUpdateButton.click();
    cy.wait(3000);

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que salga el error
    pageSection.errorAlert
      .should("be.visible")
      .contains("Update failed: Title cannot be longer than 255 characters.");
    pageSection.errorAlertCloseButton.click();
  });
});
