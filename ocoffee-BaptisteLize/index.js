import "dotenv/config";
import express from "express";
import path from "path";
import router from "./app/router.js";
import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import db from "./app/data/data-client.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "/app/views"));
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const pgSession = connectPgSimple(session);
const store = new pgSession({
  pool: db,
  tableName: "user_sessions",
  createTableIfMissing: true
});

app.use(session({
  store,
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000 // Conservé 30 jour
  } 
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Server started at http://localhost:${port}`);});