import TagSection from "../../support/elements/tagSection";
//import AdminMenu from "../support/elements/adminMenu";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Crear Tag con 191 carácteres en el titulo", () => {
  it("Crear Tag con 191 carácteres en el titulo", () => {
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
    const testMockarooData = 'P044.json';
    const testData =  tagSection.getDataTagMockaroo(testMockarooData);
    
    // Puedes acceder a los valores individualmente
    const title = testData.title;
    const slug = (testData.slug).toLowerCase();
    const description = testData.Description;
    // intenta publicar el tag
    tagSection.createTagMockarooData(title,slug, description) ;
    tagSection.saveTag.click();
    /* 
    -------------
      THEN
    -------------
    */
   
    // Verifica que el tag aparezca en el listado de tags
    adminMenu.tagTab.click();
    cy.url().then(basAeUrl => {
      cy.log(basAeUrl);
      cy.visit(basAeUrl + ('/') + slug);
    });
    cy.wait(2000);
  });
});
