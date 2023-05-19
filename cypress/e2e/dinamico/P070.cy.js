import { faker } from "@faker-js/faker";

import PostSection from "../../support/elements/postsSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";

const postSection = new PostSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Publicación de un post nueva con cuerpo que tiene caracteres especiales", () => {
  it("Publicación de un post nueva con cuerpo que tiene caracteres especiales", () => {
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
    const testMockaroo = "/P070.json";
    postSection.createPostMockaroo(testMockaroo);

    // Publica el post
    postSection.publishPost();

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
