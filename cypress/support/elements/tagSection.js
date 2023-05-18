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
        .get("li.gh-list-row.gh-tags-list-item")
        .filter(`:contains(${title})`)
        .first();
    }

  createTag(title, slug , content) {
    this.newTagButton.click();
    cy.wait(1000);
    this.editorContainerTitle.type(title);
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

  createTagMockaroo(testMockaroo) {
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

  
}

