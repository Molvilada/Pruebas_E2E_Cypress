import TagSection from "../../support/elements/tagSection";
//import AdminMenu from "../support/elements/adminMenu";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Crear Tag con titulo vacio.", () => {
  it("Crear Tag con titulo vacio.", () => {
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
    const testMockarooData = 'P046.json';
    const testData =  tagSection.getDataTagMockaroo(testMockarooData);
    
    // Puedes acceder a los valores individualmente    
    const slug = (testData.slug).toLowerCase();
    const description = testData.Description;
    // intenta publicar el tag
    tagSection.createTagMockarooDataTitle(slug, description) ;
    tagSection.saveTag.click();
    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que aparezca el mensaje de error
    cy.wait(1000);
    tagSection.msgErrorTitleEmpty;
    cy.wait(2000);
  });
});
