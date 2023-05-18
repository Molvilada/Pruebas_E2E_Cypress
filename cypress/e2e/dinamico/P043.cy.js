import { faker } from "@faker-js/faker";

import TagSection from "../../support/elements/tagSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Creación de un tag y validación de la creación del tag.", () => {
  it("Creación de un tag y validación de la creación del tag.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear tags
    cy.login();

    // Va a la pestaña Tags
    adminMenu.tagTab.click();
    cy.wait(1000);

    /* 
    -------------
      WHEN
    -------------
    */

    // Información crea la tag
    const testMockaroo = "/tag_con_titulo_de_192_caracteres.json";
    tagSection.createTagMockaroo(testMockaroo);
    // intenta publicar el tag
    tagSection.saveTag.click();
    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que aparezca el mensaje de error
    cy.wait(1000);
    tagSection.msgErrorTitle;
    cy.wait(2000);
  });
});
