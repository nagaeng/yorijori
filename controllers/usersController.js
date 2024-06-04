const db = require("../models/index");
const User = db.user;
const bcrypt = require('bcrypt');
const passport = require("passport");

const getUserParams = body => ({
    name: body.name,
    email: body.email,
    password: body.password,
    nickname: body.nickname,
    phoneNumber: body.phoneNumber,
    city: body.city,
    district: body.district,
    town: body.town,
    detail: body.detail
});

module.exports = {

    login: (req, res) => {
        res.render("auth/login");
    },

    new:(req, res) => {
        res.render("auth/newuser");
    },

    // authenticate: async(req, res, next) => {
    //     try{
    //         let user = await User.findOne({where: {email: req.body.email}})
    //         if(user){
    //             console.log("aaaaaaaaa");
    //             console.log(req.body.password);
    //             console.log(user.password);
    //             let passwordMatch = await user.passwordComparison(req.body.password);
    //             console.log(passwordMatch);
    //             console.log("aaaacccccccccc");
    //             if(passwordMatch){
    //                 res.locals.redirect = `/`;
    //                 req.flash("success", `${user.name} logged in successfully`);
    //                 res.locals.user = user;
    //                 next();
    //             }
    //             else{
    //                 req.flash("error", "your account or password is incorrect.");
    //                 res.locals.redirect = "/auth/login";
    //                 next();
    //             }
    //         }      
    //        else{
    //         req.flash("error", "Failed to log in user account: Incorrect Password.");
    //         res.locals.redirect = "/auth/login";
    //         next();
    //     }
    // }
    //     catch(error){
    //         console.log(`error logging in user: ${err.message}`);
    //         next(error);
    //     };
    // },

    authenticate: passport.authenticate("local", {
        successRedirect: "/",
        successFlash: "Logged in!",
        failureRedirect: "/auth/login",
        failureFlash: "Failed to login"
    }),

    logout: (req, res, next) => {
        req.logout((err) => {
            req.flash("success", "You have been logged out!");
            res.locals.redirect = "/";
            next();
        });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    },

    create: async (req, res, next) => {
        if(req.skip) next();
        let userParams = getUserParams(req.body);
        
        try{
            let user = new User(userParams);
            User.register(user, req.body.password, (error, user) => {
                if(user) {
                    req.flash("success", `${user.name} account created successfully`);
                    res.locals.redirect = "/auth/login";
                    res.locals.user = user;
                    next();
                }
                else{
                    console.log(`Error saving user: ${error.message}`);
                    res.locals.redirect = "/auth/newuser";
                    req.flash("error", `Failed to create user account because: ${error.message}`);
                    next(error);
                }
            });
        }
        catch(error){
            console.log(`Error saving user: ${error.message}`);
            res.locals.redirect = "/auth/newuser";
            req.flash("error", `Failed to create user account because: ${error.message}`);
            next(error);
        };
        
    },
    /*
         let userParams = getUserParams(req.body);
         console.log(userParams);
         try{
             let user = await User.create(userParams);
             res.locals.redirect = "/auth/login";
             res.locals.user = user;
             next();
         }
         catch(error){
             console.log('Error saving user: ${error.message}');
             next(error);
         };
     },
     */

    edit:(req, res) => {
        res.render("auth/editpwd");
    },

    edit: async(req, res, next) => {
        let userId = req.params.id;
        try{
            let user = await User.findByPk(userId);
            res.render("/auth/editpwd", {
                user: user
            });
        }
        catch(error){
            console.log('Error fatching user by ID: ${error.message}');
            next(error);
        };
    },

    update: async(req, res, next) => {
        let userId = req.params.id,
        userParams = getUserParams(req.body);
        try{
            let user = await User.findByPkAndUpdate(userId, userParams);
            res.locals.redirect = 'auth/${userId}';
            res.locals.user = user;
            next();
        }
        catch(error){
            console.log('Error updating user by ID: ${error.message}');
            next(error);
        };
    }


};