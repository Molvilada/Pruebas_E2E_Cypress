export const mockarooService = (route) => {
  const apiKey = "e7649c20";
  const URL = `https://my.api.mockaroo.com/${route}.json?key=${apiKey}`;

  return cy.request(URL);
};
