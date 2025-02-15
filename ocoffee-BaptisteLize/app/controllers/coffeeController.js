import dataMapper from "../data/dataMapper.js";

const coffeeController = {

  async renderCataloguePage(req, res) {
    try {
      const coffees = await dataMapper.getAllCoffeesOrderedByCategory();
      if(!coffees){
        res.status(404).render("404");
      }
      res.render("catalogue", { coffees });
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },
  
  async renderOneCoffeePage(req,res) {
    try {
      const coffeeId = req.params.id;
      const coffee = await dataMapper.getOneCoffee(coffeeId);
      if(!coffee){
        res.status(404).render("404");
      }
      res.render("coffee", { coffee });
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },

  async renderCategoryPage(req,res) {
    try {
      const category = req.params.name;
      const coffees = await dataMapper.getCoffeesByCategory(category);
      if(coffees.length === 0) {
        res.status(404).render("404");
      }
      res.render("category", { coffees, category });
    } catch (error) {
      console.error(error);
      res.status(500).render("500");     
    }
  }
};

export default coffeeController;