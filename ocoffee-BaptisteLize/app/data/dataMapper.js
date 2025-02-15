import db from "./data-client.js";

const dataMapper = {

  async getAllCoffees() {
    const result = await db.query(`
      SELECT coffee.*, category.name AS category_name 
      FROM coffee
      JOIN category
      ON coffee.category_id = category.id
      `);
    const coffees = result.rows;
    return coffees;
  },

  async getAllCoffeesOrderedByCategory() {
    const result = await db.query(`
      SELECT coffee.*, category.name AS category_name 
      FROM coffee
      JOIN category
      ON coffee.category_id = category.id
      ORDER BY category.id
      `);
    const coffees = result.rows;
    return coffees;
  },

  async getCoffeesByCategory(category) {
    const result = await db.query(`
      SELECT coffee.*, category.name AS category_name 
      FROM coffee
      JOIN category
      ON coffee.category_id = category.id
      WHERE category.name ILIKE $1
      `, [`${category}`]);
    const coffees = result.rows;
    return coffees;
  },

  async getLastCoffees() {
    const result = await db.query(`
      SELECT coffee.*, category.name AS category_name 
      FROM coffee
      JOIN category
      ON coffee.category_id = category.id
      ORDER BY id DESC LIMIT 3
      `);
    const coffees = result.rows;
    return coffees;
  },

  async getOneCoffee(coffeeId) {
    const result = await db.query(`
      SELECT coffee.*, category.name AS category_name 
      FROM coffee
      JOIN category
      ON coffee.category_id = category.id
      WHERE coffee.id = $1
      `, [coffeeId]);
    const coffee = result.rows[0];
    return coffee;
  },
  
  async getAllCategories() {
    const result = await db.query(`SELECT * FROM category`);
    const categories = result.rows;
    return categories;
  },

  async addCoffee(coffeeData) {
    const { name, description, reference, origin, price, available, category_id } = coffeeData;
    await db.query(`
      INSERT INTO coffee
      ("name", "description", "reference", "origin", "price", "available", "category_id")
      VALUES
      ($1, $2, $3, $4, $5, $6, $7)`, [name, description, reference, origin, price, available, category_id]);
  },

  async removeCoffee(reference) {
    await db.query(`
      DELETE FROM coffee
      WHERE
      coffee.reference = $1
      `, [reference]);
  },

  async getAllUsers() {
    const result = await db.query(`SELECT * FROM users`);
    const users = result.rows;
    return users;
  },

  async checkLogin(username, password) {
    const result = await db.query(`SELECT * FROM users WHERE username = $1 AND password = $2`, [username, password]);
    const checkedUser = result.rows[0];
    return checkedUser;
  },

  async registerUser(username, password) {
    const result = await db.query(`
      INSERT INTO users ("username", "password", "role")
      VALUES ($1, $2, $3)
      RETURNING "id", "username", "role"`, [username, password, 'customer']);
    const newUser = result.rows[0];    
    return newUser;
  }
  
};

export default dataMapper;