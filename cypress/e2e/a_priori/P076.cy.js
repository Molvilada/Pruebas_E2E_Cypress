import { faker } from "@faker-js/faker";

import PostSection from "../../support/elements/postsSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import {generateRandomNum} from "../../support/utilities";
import jsonData from "./data/P068.json";

const postSection = new PostSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición únicamente del título de un post con 256 caracteres normales.", () => {
  it("Edición únicamente del título de un post con 256 caracteres normales.", () => {
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
    const randomNum = generateRandomNum(19);
    const newTitle = jsonData[randomNum].title;

    postSection.editorContainerTitle.clear().type(newTitle);
    postSection.editorUpdateDropdown.click();
    postSection.editorUpdateButton.click();
    cy.wait(3000);

    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que el mensaje de error esté visible
    postSection.buscarError("Title cannot be longer than 255 characters");
  });
});
