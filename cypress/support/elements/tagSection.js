export default class TagSection {
  get newTagButton() {
    return cy.get("a").contains("New tag");
  }

  get saveTag() {
      return cy.get("button").contains("Save");
  }

  get editorContainerTitle() {
    return cy.get('#tag-name',  {force : true});
  }

  get editorContainerSlug() {
    return cy.get('#tag-slug');
  }

  get editorContainerDescription() {
      return cy.get('#tag-description');
  }

  get editorDeleteTagButton() {
    return cy.get("button").contains("Delete tag");
  }

  get editorDeletePostButton() {
    return cy.get("button").contains("Delete tag");
  }

  get modalDeleteButton() {
    return cy.get('.modal-content button.gh-btn-red', {force : true})
  }

  get msgErrorTitle() {
    this.editorContainerTitle.click();
    return cy.get('span.error p.response').contains("Tag names cannot be longer than 191 characters.");
    }

  tagInList(title) {
      return cy
        .get("li.gh-list-row.gh-tags-list-item", {force: true})
        .filter(`:contains(${title})`)
        .first();
    }

    tagInListLong(title) {
      return cy
        .get("a.ember-view.gh-list-data.middarkgrey.f8.gh-tag-list-slug.gh-list-cellwidth-10 span", {force: true})
        .filter(`:contains(${title})`)
        .first();
    }
    
  createTag(title, slug , content) {
    this.newTagButton.click();
    cy.wait(1000);
    this.editorContainerTitle.type(title);
    cy.wait(5000);
    this.editorContainerSlug.type(slug);
    this.editorContainerDescription.type(content);
  }

  updateTag(title) {
    this.editorContainerTitle.clear().type(title, {force: true});
  }

  urlMockaroo (testMockaroo)
  { 
    const apiKey = 'e7649c20';
    const URL = `https://my.api.mockaroo.com/${testMockaroo}?key=${apiKey}`
    return (URL)
  }

  /*createTagMockaroo(testMockaroo) {
    this.newTagButton.click();
    cy.wait(1000);      
    
    cy.request(this.urlMockaroo(testMockaroo)).then((response) => {
    const title = response.body[0].title;
    const slug = response.body[0].slug;
    const description = response.body[0].Description;

    this.editorContainerTitle.type(title);
    this.editorContainerSlug.type(slug);
    this.editorContainerDescription.type(description);
    });
  }
  */

  getDinamicTagMockaroo(testMockaroo) { 
    return cy.request(this.urlMockaroo(testMockaroo)).then((response) => {
      const title = response.body[0].title;
      const slug = response.body[0].slug;
      const description = response.body[0].Description;
  
      return {
        title,
        slug,
        description
      };
    });
  }

  dataMockaroo (testMockarooData)
  { 
    const dataPrueba = require(`../../e2e/a_priori/data/${testMockarooData}`)
    return (dataPrueba)
  }

  tagInListMockaroo(testMockarooData) {
     return this.dataMockaroo(testMockarooData)[0].title; 
    }


  createTagMockarooData(title, slug , content) {
    this.newTagButton.click();
    this.editorContainerTitle.type(title); 
    cy.wait(2000);   
    this.editorContainerSlug.click();
    this.editorContainerTitle.click();    
    this.editorContainerSlug.clear();    
    this.editorContainerSlug.click();
    this.editorContainerTitle.click();    
    this.editorContainerSlug.type(slug);    
    this.editorContainerDescription.type(content);
  }  

  getDataTagMockaroo(testMockarooData) {
    const tagData = this.dataMockaroo(testMockarooData)[0];
    return tagData;
  }

  
}