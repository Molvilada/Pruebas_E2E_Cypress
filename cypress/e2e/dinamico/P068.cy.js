import { faker } from "@faker-js/faker";

import PostSection from "../../support/elements/postsSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import {generateRandomNum} from "../../support/utilities";
import jsonData from "../a_priori/data/P068.json";

const postSection = new PostSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Publicación de un post nueva con título de 256 caracteres normales.", () => {
  it("Publicación de un post nueva con título de 256 caracteres normales.", () => {
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
    const randomNum = generateRandomNum(999);
    const title = jsonData[randomNum].title;
    let content = jsonData[randomNum].content;
    postSection.createPost(title, content);

    // Publica el post
    postSection.publishPost();

    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que el mensaje de error esté visible
    postSection.buscarError("Title cannot be longer than 255 characters");
  });
});
