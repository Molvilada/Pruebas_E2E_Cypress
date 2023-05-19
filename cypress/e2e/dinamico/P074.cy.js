import { faker } from "@faker-js/faker";

import PostSection from "../../support/elements/postsSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";

const postSection = new PostSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición únicamente del titulo de un post existente con caracteres especiales", () => {
  it("Edición únicamente del titulo de un post existente con caracteres especiales", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear posts
    cy.login();

    // Va a la pestaña Posts
    adminMenu.postTab.click();
    cy.wait(1000);

    /* 
    -------------
      WHEN
    -------------
    */

    // Crea el post
    const title = faker.lorem.lines(1);
    let content = faker.lorem.paragraphs(1);

    postSection.createPost(title, content);

    // Publica el post
    postSection.publishPost();

    // Salir y volver a entrar al post
    postSection.goBackToPostsSection.click();
    postSection.postInList(title).click();

    // Edita el titulo
    const testMockaroo = "/P069.json";
    postSection.editPostMockaroo(testMockaroo);
    postSection.editorUpdateDropdown.click();
    postSection.editorUpdateButton.click();
    cy.wait(3000);

    /* 
    -------------
      THEN
    -------------
    */
    postSection.editorContainerTitle.invoke('val').then(text => {
      // Verifica que el post aparezca en la lista de posts
      postSection.goBackToPostsSection.click();
      console.log(text)
      postSection.postInList(text).click();

      // Verifica que el post aparezca visible en el sitio
      postSection.editorSettingsButton.click();
      postSection.editorViewPost.invoke("attr", "href").then((href) => {
        cy.visit(href);
      });
      cy.wait(1000);
      site.postTitle.contains(text);
    })
  });
});
