describe("Books test", () => {
  it("Успешная авторизация", () => {
    cy.visit("/");
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
    cy.contains("Log out").should("be.visible");
  });

  it("Нельзя авторизоваться с пустым полем почты", () => {
    cy.visit("/");
    cy.login(" ", "123");
    cy.get("#mail")
      .then((el) => {
        return el[0].checkValidity();
      })
      .should("be.false");
  });

  it("Нельзя авторизоваться с пустым полем пароля", () => {
    cy.visit("/");
    cy.contains("Log in").click();
    cy.get("#mail").type("bropet@mail.ru");
    cy.contains("Submit").click();
    cy.get("#pass")
      .then((el) => {
        return el[0].checkValidity();
      })
      .should("be.false");
  });

  it("Книга добавляется и просматривается на залогиненном аккаунте", () => {
    cy.createNameBook(10).then((bookName) => {
      console.log("bookName:", bookName);

      cy.visit("/");
      cy.login("bropet@mail.ru", "123");
      cy.contains("Add new").click();
      cy.get("#title").type(bookName);
      cy.contains("Submit").click();

      cy.contains(bookName)
        .should("be.visible")

        .within(() => {
          cy.contains("Add to favorite").click();
        });

      cy.contains("Favorites").click();
      cy.contains(bookName)
        .should("be.visible")
        .within(() => {
          cy.contains("Delete from favorite").should("be.visible").click();
        });
    });
  });

  it("Книги есть на не залогиненном аккаунте", () => {
    cy.visit("/");
    cy.get(".mt-3").its("length").should("be.gt", 1);
  });

  it("На залогиненном аккаунте можно скачать книги", () => {
    cy.visit("/");
    cy.login("bropet@mail.ru", "123");
    cy.get(".mt-3").click();
    cy.contains("Dowload book").should("be.visible");
  });
});
