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
    const testMockaroo = '/p043.json';

    tagSection.getDinamicTagMockaroo(testMockaroo).then((tagData) => {
      const title = tagData.title;
      const slug = tagData.slug;
      const description = tagData.description;

      myOtherFunction(title, slug, description);
    });
    
    function myOtherFunction(title, slug, description) {
      tagSection.createTag(title, slug, description);      
    }

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
