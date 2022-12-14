const router = require("express").Router();
const routes = require("./src/routes");
const api = require("./src/api");

// -- middleware -- //

const redirect = (req, res, next) => {
    if (req.session.user) return res.redirect("/")
    next()
}

const auth = (req, res, next) => {
    if (!req.session.user) return res.redirect("/auth")
    next()
}

/* pages */

// -- START -- //

router.get("/", auth, routes.index);

router.get("/auth", redirect, routes.auth);

router.get(`/global`, auth, routes.global);

router.get("/:chatter", auth, routes.chat);

// -- redirect -- //

router.get("/login", redirect, (req, res) => res.redirect("/auth"));

router.get("/register", redirect, (req, res) => res.redirect("/auth"));

// -- END -- //

router.use("/api", api); // -- api -- //
router.get("*", routes.error); // -- 404 -- //

module.exports = router;
