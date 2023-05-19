import PageSection from "../../support/elements/pagesSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import jsonData from "./data/P021.json";

const pageSection = new PageSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Publicación de una página nueva con título de 255 caracteres normales.", () => {
  it("Publicación de una página nueva con título de 255 caracteres normales.", () => {
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

    // Verifica que la página aparezca en la lista de páginas
    pageSection.goBackToPagesSection.click();
    pageSection.pageInList(title).click();

    // Verifica que la página aparezca visible en el sitio
    pageSection.editorSettingsButton.click();
    pageSection.editorViewPage.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    site.pageTitle.contains(title);
  });
});
