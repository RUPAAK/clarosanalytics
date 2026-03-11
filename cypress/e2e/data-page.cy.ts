/// <reference types="cypress" />

describe("Data page", () => {
  it("renders rows from the API (stubbed)", () => {
    cy.intercept("GET", "https://rickandmortyapi.com/api/character*", {
      fixture: "characters-page1.json",
    }).as("getCharacters");

    cy.visit("/data");
    cy.wait("@getCharacters");

    cy.contains("table", "Rick Sanchez").should("be.visible");
    cy.contains("table", "Morty Smith").should("be.visible");
  });

  it("mobile: opens Filters drawer from the right", () => {
    cy.viewport("iphone-x");

    cy.intercept("GET", "https://rickandmortyapi.com/api/character*", (req) => {
      if (req.url.includes("status=alive")) {
        expect(req.url).to.include("status=alive");
      }
      req.reply({ fixture: "characters-page1.json" });
    }).as("getCharacters");

    cy.visit("/data");
    cy.wait("@getCharacters");

    cy.contains("button", "Filters").click();
    cy.get('[role="dialog"][aria-label="Filters"]').should("be.visible");

    cy.get('[role="dialog"][aria-label="Filters"]').within(() => {
      cy.get('select[aria-label="Filter by status"]').select("Alive");
    });
    cy.wait("@getCharacters");

    cy.contains("button", "Done").click();
    cy.get('[role="dialog"][aria-label="Filters"]').should("not.exist");
  });
});
