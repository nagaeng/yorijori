const db = require("../models/index");
const User = db.user;
const bcrypt = require('bcrypt');

const getUserParams = body => ({
    name: body.name,
    email: body.email,
    password: body.password
});

module.exports = {

    login: (req, res) => {
        res.render("auth/login");
    },

    authenticate: async (req, res, next) => {
        try {
            let user = await User.findOne({ where: { email: req.body.email } });
            if (user){
                let passwordMatch = await user.passwordComparison(req.body.password);
                if(passwordMatch) {
                    res.locals.redirect = `/auth/${user.getDataValue('id')}`;
                    req.flash("success", `${user.name} logged in successfully`);
                    res.locals.user = user;
                    next();
                }   
                else {
                    req.flash("error", "Your account or password is incorrect. Please try again.");
                    res.locals.redirect = "/auth/login";
                    next();
                }            
            } 
            else{
                req.flash("error", "Failed to log in user account: User account not found.");
                res.locals.redirect = "/auth/login";
                next();
            }
        } 
        catch (err) {
            console.log(`Error logging in user: ${err.message}`);
            next(err);
        }
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    },

    // logout: (req, res, next) => {
    //     req.logout(); // Assuming you're using passport.js for authentication
    //     req.flash("success", "You have been logged out.");
    //     res.locals.redirect = "/";
    //     next();
    // },

    /*
    index: async (req, res, next) => {
        try {
            let users = await User.findAll();
            res.locals.users = users;
            next();
        } catch (error) {
            console.log(`Error fetching users: ${error.message}`);
            next(error);
        }
    },

    indexView: (req, res) => {

    },

    new: (req, res) => {
        res.render("auth/newuser");
    },

    create: async (req, res, next) => {
        let userParams = getUserParams(req.body);
        try {
            userParams.password = await bcrypt.hash(userParams.password, 10);
            let user = await User.create(userParams);
            res.locals.redirect = "/auth";
            res.locals.user = user;
            next();
        } catch (error) {
            console.log(`Error saving user: ${error.message}`);
            next(error);
        }
    },

    show: async (req, res, next) => {
        let userId = req.params.id;
        try {
            let user = await User.findByPk(userId);
            res.locals.user = user;
            next();
        } catch (error) {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        }
    },

    showView: (req, res) => {
        res.render("auth/show", { user: res.locals.user });
    },

    edit: async (req, res, next) => {
        let userId = req.params.id;
        try {
            let user = await User.findByPk(userId);
            res.render("auth/editpwd", {
                user: user
            });
        } catch (error) {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        }
    },

    update: async (req, res, next) => {
        let userId = req.params.id,
            userParams = getUserParams(req.body);
        try {
            let user = await User.findByPk(userId);
            if (user) {
                await user.update(userParams);
                res.locals.redirect = `/auth/${userId}`;
                res.locals.user = user;
                next();
            } else {
                next(new Error("User not found"));
            }
        } catch (error) {
            console.log(`Error updating user by ID: ${error.message}`);
            next(error);
        }
    },

    delete: async (req, res, next) => {
        let userId = req.params.id;
        try {
            let user = await User.findByPk(userId);
            if (user) {
                await user.destroy();
                res.locals.redirect = "/auth";
                next();
            } else {
                next(new Error("User not found"));
            }
        } catch (error) {
            console.log(`Error deleting user by ID: ${error.message}`);
            next(error);
        }
    }
    */
};
