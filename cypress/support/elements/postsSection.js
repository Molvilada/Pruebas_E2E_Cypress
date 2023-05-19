export default class PostSection {
  get newPostButton() {
    return cy.get("a").contains("New post");
  }

  get editorContainerTitle() {
    return cy.get("textarea[placeholder='Post Title']");
  }

  get editorContainerBody() {
    return cy.get("div[data-placeholder='Begin writing your post...']");
  }

  get editorPublishDropdown() {
    return cy.get("div[role='button']").contains("Publish");
  }

  get editorPublishButton() {
    return cy.get("button").contains("Publish");
  }

  get editorUpdateDropdown() {
    return cy.get("div[role='button']").contains("Update");
  }

  get editorUpdateButton() {
    return cy.get("button").contains("Update");
  }

  get editorSettingsButton() {
    return cy.get("button[title='Settings']");
  }

  get editorDeletePostButton() {
    return cy.get("button").contains("Delete post");
  }

  get modalDeleteButton() {
    return cy.get("button.gh-btn-red").contains("Delete");
  }

  get editorViewPost() {
    return cy.get("a.post-view-link");
  }

  get goBackToPostsSection() {
    return cy.get("a").contains("Posts");
  }

  postInList(title) {
    return cy
      .get("li.gh-list-row.gh-posts-list-item")
      .filter(`:contains(${title})`)
      .first().children('.gh-post-list-featured');
  }

  postsInList(title) {
    return cy
        .get("li.gh-list-row.gh-posts-list-item")
        .filter(`:contains(${title})`);
  }

  notPostInList(title) {
    return cy
      .get("li.gh-list-row.gh-posts-list-item")
      .filter(`:contains(${title})`)
      .should("not.exist");
  }

  publishPost() {
    this.editorPublishDropdown.click();
    this.editorPublishButton.click();
    cy.wait(3000);
  }

  createPost(title, content) {
    this.newPostButton.click();
    cy.wait(1000);
    if (title) this.editorContainerTitle.type(title);
    this.editorContainerBody.click();
    if (content) this.editorContainerBody.type(content);
  }

  urlMockaroo (testMockaroo)
  {
    const apiKey = 'e7649c20';
    const URL = `https://my.api.mockaroo.com/${testMockaroo}?key=${apiKey}`
    return (URL)
  }

  createPostMockaroo(testMockaroo) {
    this.newPostButton.click();
    cy.wait(1000);

    cy.request(this.urlMockaroo(testMockaroo)).then((response) => {
      const title = response.body[0].title;
      const content = response.body[0].content;

      this.editorContainerTitle.type(title, {parseSpecialCharSequences: false});
      this.editorContainerBody.type(content, {parseSpecialCharSequences: false});
    });
  }

  editPostMockaroo(testMockaroo) {

    cy.request(this.urlMockaroo(testMockaroo)).then((response) => {
      const title = response.body[0].title;
      const content = response.body[0].content;

      this.editorContainerTitle.type(title, {parseSpecialCharSequences: false});
      this.editorContainerBody.type(content, {parseSpecialCharSequences: false});
    });
  }

  buscarError(mensaje) {
    cy.get('.gh-alert-red').contains(mensaje)
  }
}
