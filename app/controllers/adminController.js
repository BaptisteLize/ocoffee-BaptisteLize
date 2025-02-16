import dataMapper from "../data/dataMapper.js";

const adminController = {

  async renderAdminManagePage(req,res) {
    try {
      const coffees = await dataMapper.getAllCoffees();
      const categories = await dataMapper.getAllCategories();
      const isAdded = req.query.add === "true";
      const isRemoved = req.query.remove === "true";
      res.render("admin-manage", { categories, coffees, isAdded, isRemoved });
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },

  async handleCoffeeForm(req,res) {
    try {
      const action = req.body.action;
      const reference = parseInt(req.body.reference);
      const {...coffeeData } = req.body;
      if(action === "add") {
        await dataMapper.addCoffee(coffeeData);
        res.redirect("/admin/manage/?add=true");
      } else if (action === "remove") {
        await dataMapper.removeCoffee(reference);
        res.redirect("/admin/manage/?remove=true");
      }  
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  }
};

export default adminController;