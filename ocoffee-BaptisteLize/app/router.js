import { Router } from "express";
import mainController from "./controllers/mainController.js";
import coffeeController from "./controllers/coffeeController.js";
import adminController from "./controllers/adminController.js";
import access from "./controllers/accessController.js";

const router = Router();

router.get("/", mainController.renderHomePage);
router.get("/about", mainController.renderAboutPage);
router.get("/find-us", mainController.renderFindUsPage);
router.get("/catalogue", coffeeController.renderCataloguePage);
router.get("/coffee/:id", coffeeController.renderOneCoffeePage);
router.get("/category/:name", coffeeController.renderCategoryPage);

router.get("/admin/manage", access.isAdmin, adminController.renderAdminManagePage);
router.post("/admin/manage", access.isAdmin, adminController.handleCoffeeForm);

router.get("/login", mainController.renderLoginPage);
router.post("/login", mainController.handleLoginForm);
router.get("/logout", mainController.logOut);

router.use((req,res) => {
  res.render("404");
});

export default router;