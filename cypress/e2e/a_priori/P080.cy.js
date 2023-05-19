import { faker } from "@faker-js/faker";

import PostSection from "../../support/elements/postsSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import {generateRandomNum} from "../../support/utilities";
import jsonData from "./data/post_settings.json";

const postSection = new PostSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición del campo Excerpt con 301 caracteres", () => {
  it("Edición del campo Excerpt con 301 caracteres", () => {
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
    const exerpt = jsonData[randomNum].exerpt301;

    postSection.settingsExerpt.clear().type(exerpt);
    postSection.contentCover.click()
    postSection.editorUpdateDropdown.click();
    postSection.editorUpdateButton.click();
    cy.wait(3000);

    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que aparezca mensaje de error
    postSection.buscarError("Excerpt cannot be longer than 300 characters")
  });
});
