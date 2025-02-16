import "dotenv/config";
import express from "express";
import path from "path";
import router from "./app/router.js";
import connectPgSimple from "connect-pg-simple";
import pg from "pg";
import session from "express-session";


const app = express();
app.set("trust proxy", 1);

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const pool = new pg.Pool({
  connectionString: process.env.PG_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

const pgSession = connectPgSimple(session);
const store = new pgSession({
  pool: pool,
  tableName: "user_sessions",
  createTableIfMissing: true
});

app.use(session({
  store,
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
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
