import dataMapper from "../data/dataMapper.js";

const mainController = {

  async renderHomePage(req,res) {
    try {
      const coffees = await dataMapper.getLastCoffees();
      if(!coffees) {
        res.status(404).render("404");
      }
      res.render("home", { coffees });
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },
  
  renderAboutPage(req,res) {
    res.render("about");
  },

  renderFindUsPage(req,res) {
    res.render("find-us");
  },
 
  async renderLoginPage(req,res) {
    try {
      const users = await dataMapper.getAllUsers();
      if(!users) {
        res.status(404).render("404");
      }
      const isDenied = req.query.denied === "true";
      const isAllowed = req.query.allowed === "true";
      const isValid = req.query.valid === "true";
      const isTaken = req.query.taken === "true";
      res.render("login", { users, isDenied, isAllowed, isValid, isTaken });
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
    
  },

  async handleLoginForm(req,res) {
    try {
      const action = req.body.action;
      const { username, password } = req.body;
      if(action === "connect") {
        const authenticatedUser = await dataMapper.checkLogin(username, password);
        if(!authenticatedUser) {
          return res.redirect("/login/?denied=true");
        }
        req.session.user = {
          id: authenticatedUser.id,
          username: authenticatedUser.username,
          role: authenticatedUser.role
        };
        return res.redirect("/login/?allowed=true");
      } else if (action === "register") {
        try {
          const { username, password } = req.body;
          const newUser = await dataMapper.registerUser(username, password);
          req.session.user = {
            id: newUser.id,
            username: newUser.username,
            role: newUser.role
          };
          return res.redirect("/login/?valid=true");
        } catch (error) {
          console.error(error);
          return res.redirect("/login/?taken=true");
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },

  logOut(req,res) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  },

  renderProfilePage(req,res) {
    try {
      const user = req.session.user;      
      if(!user) {
        res.status(403).send("Accès Interdit");
      }
      const isDenied = req.query.denied === "true";
      const isValid = req.query.valid === "true";
      res.render("profile", { user, isValid, isDenied });
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },

  async handleProfileForm(req,res) {
    try {
      const userId = req.session.user.id;
      const { password, newPassword } = req.body;
      if(password === newPassword) {
        return res.redirect("/profile/?denied=true");
      }
      await dataMapper.modifyPassword(newPassword, userId);
      return res.redirect("/profile/?valid=true");
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },

};

export default mainController;