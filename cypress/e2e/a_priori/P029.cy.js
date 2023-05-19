import PageSection from "../../support/elements/pagesSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import jsonData from "./data/P029.json";

const pageSection = new PageSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición únicamente del título de una página con 255 caracteres normales.", () => {
  it("Edición únicamente del título de una página con 255 caracteres normales.", () => {
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

    // Verifica que la página aparezca visible en el sitio con el nuevo contenido
    pageSection.editorSettingsButton.click();
    pageSection.editorViewPage.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    site.pageTitle.contains(newTitle);
  });
});
