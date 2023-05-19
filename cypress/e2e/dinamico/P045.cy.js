import TagSection from "../../support/elements/tagSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Crear Tag con 192 carácteres en el titulo.", () => {
  it("Crear Tag con 192 carácteres en el titulo.", () => {
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
    const testMockaroo = '/p045.json';

    tagSection.getDinamicTagMockaroo(testMockaroo).then((tagData) => {
      const title = tagData.title;
      const slug = tagData.slug;
      const description = tagData.description;      
      
      cy.log(title)

      tagSection.createTagMockarooData(title, slug, description);  
      cy.wait(2000);    
      tagSection.saveTag.click();
      cy.wait(2000);

          /* 
    -------------
      THEN
    -------------
    */   
    // Verifica que aparezca el mensaje de error            
        adminMenu.tagTab.click();
        cy.url().then(basAeUrl => {
        cy.log(basAeUrl);
        cy.visit(basAeUrl + ('/') + slug.toLowerCase());
        });
        cy.wait(2000);
      

    });
  });
});
