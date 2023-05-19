import { faker } from "@faker-js/faker";

import PostSection from "../../support/elements/postsSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";

const postSection = new PostSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Publicación de un post con un título existente", () => {
  it("Publicación de un post con un título existente", () => {
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

    // Crea post con mismo nombre
    content = faker.lorem.paragraphs(1);
    postSection.goBackToPostsSection.click();
    postSection.createPost(title, content);

    // Publica el post
    postSection.publishPost();

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que el post aparezca en la lista de posts
    postSection.goBackToPostsSection.click();
    postSection.postsInList(title).should('have.length', 2);

    // site.postTitle.contains(title);
  });
});
