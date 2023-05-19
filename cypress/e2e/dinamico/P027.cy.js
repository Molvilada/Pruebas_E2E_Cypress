import PageSection from "../../support/elements/pagesSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import { mockarooService } from "../../support/services";

const pageSection = new PageSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Publicación de una página con un título existente.", () => {
  it("Publicación de una página con un título existente.", () => {
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

    mockarooService("p027").then((res) => {
      // Crea la página con el título a repetir
      const title = res.body.title;
      const body = res.body.body;

      // Crea la página
      pageSection.createPage(title, body);

      // Publica la página
      pageSection.publishPage();

      let urlFirstPage;

      // Se obtiene la url de esa página
      pageSection.editorSettingsButton.click();
      pageSection.editorViewPage.invoke("attr", "href").then((href) => {
        urlFirstPage = href;
      });

      // Se devuelve a la lista de páginas
      pageSection.goBackToPagesSection.click({ force: true });

      /* 
      -------------
        WHEN
      -------------
      */

      // Crea la página con título repetido
      pageSection.createPage(title, body);

      // Publica la página
      pageSection.publishPage();

      /* 
      -------------
        THEN
      -------------
      */

      // Verifica que la url creada sea diferente a la de la primera página creada
      pageSection.editorSettingsButton.click();
      pageSection.editorViewPage.invoke("attr", "href").then((href) => {
        if (href === urlFirstPage) {
          throw new Error("Las dos URL son iguales");
        } else {
          // Verifica que la página aparezca visible en el sitio
          cy.visit(href);
          cy.wait(1000);
          site.pageTitle.contains(title);
        }
      });
    });
  });
});
