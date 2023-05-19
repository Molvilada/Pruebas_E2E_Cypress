import { faker } from "@faker-js/faker";

import PostSection from "../../support/elements/postsSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import {generateRandomNum} from "../../support/utilities";
import jsonData from "./data/post_settings.json";

const postSection = new PostSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición del campo Excerpt con caracteres especiales", () => {
  it("Edición del campo Excerpt con caracteres especiales", () => {
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

    // Edita el exerpt
    postSection.editorSettingsButton.click();
    postSection.settingsExerpt.click();
    const randomNum = generateRandomNum(999);
    const exerpt = jsonData[randomNum].exerptSpecial;

    postSection.settingsExerpt.clear().type(exerpt, {parseSpecialCharSequences:false});
    postSection.contentCover.click()
    postSection.editorUpdateDropdown.click();
    postSection.editorUpdateButton.click();
    cy.wait(3000);

    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que el exerpt aparezca visible en el post en el sitio
    postSection.editorSettingsButton.click();
    postSection.editorViewPost.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    site.postExerpt.contains(exerpt);
  });
});
