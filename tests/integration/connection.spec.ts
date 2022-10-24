describe("Connection", () => {
  test("Should create a connection with database", async () => {
    const connection = new Connection();
    const itemsData = connection.query("SELECT * FROM ccca.item", []);

    expect(itemsData).toHaveLength(6);
  });
});
