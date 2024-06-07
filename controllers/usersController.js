const db = require("../models/index");
const User = db.user;
const passport = require("passport");
// const path = require("path");
// const upload = require("../config/multerConfig"); // Import the multer config


const getUserParams = body => ({
    name: body.name,
    email: body.email,
    password: body.password,
    nickname: body.nickname,
    phoneNumber: body.phoneNumber,
    city: body.city,
    district: body.district,
    town: body.town,
    detail: body.detail,
    imageUrl: body.imageUrl
});

module.exports = {

    //로그인 페이지 이동 
    login: (req, res) => {
        res.render("auth/login");
    },

    //회원가입 페이지 이동 
    new:(req, res) => {
        res.render("auth/newuser");
    },

    //로그인 진행 
    authenticate: passport.authenticate("local", {
        successRedirect: "/",
        successFlash: "Logged in!",
        failureRedirect: "/auth/login",
        failureFlash: "Failed to login"
    }),

    //로그아웃 진행 
    logout: (req, res, next) => {
        req.logout((err) => {
            req.flash("success", "You have been logged out!");
            res.redirect("/");
        });
    },

    //다시 할게 무엇인지 
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    },

    //회원가입 진행 
    create: (req, res, next) => {
        const { password, PwdCheck } = req.body;

        if (password !== PwdCheck) {
            req.flash("error", "입력한 비밀번호가 다릅니다."); // Passwords do not match
            return res.redirect("/auth/newuser");
        }

        if (req.skip) next();
        let userParams = getUserParams(req.body);
        
        User.register(new User(userParams), req.body.password, (error, user) => {
            if (user) {
                req.flash("success", `${user.name} account created successfully`);
                res.redirect("/auth/login");
            } else {
                console.log(`Error saving user: ${error.message}`);
                req.flash("error", `Failed to create user account because: ${error.message}`);
                res.redirect("/auth/newuser");
            }
        });
    },

    //비밀변경 페이지 이동 
    editpwd:(req, res) => {
        res.render("auth/editpwd");
    },

    //비밀번호 변경 
    updatepwd: async (req, res, next) => {
        const { email, newPwd, newPwdCheck } = req.body;
    
        if (newPwd !== newPwdCheck) {
            req.flash("error", "Error different password"); // Passwords do not match
            return res.redirect("/auth/editpwd");
        }
    
        try {
            let user = await User.findOne({ where: { email } });
            if (user) {
                user.setPassword(newPwd, async (err) => {
                    if (err) {
                        console.log(`Error updating password: ${err.message}`);
                        req.flash("error", "Error updating password.");
                        res.redirect("/auth/editpwd");
                    } else {
                        await user.save();
                        req.flash("success", "Password updated successfully!");
                        res.redirect("/auth/login");
                    }
                });
            } else {
                req.flash("error", "User not found.");
                res.redirect("/auth/editpwd");
            }
        } catch (error) {
            console.log(`Error updating password: ${error.message}`);
            req.flash("error", "Error updating password.");
            res.redirect("/auth/editpwd");
        }
    },    

    //정보 수정 
    edit: async(req, res, next) => {
        let userId = req.params.id;
        try{
            let user = await User.findByPk(userId);
            res.render("auth/edit", {
                user: user
            });
        }
        catch(error){
            console.log(`Error fetching user by ID: ${error.message}`);
            req.flash("error", "Error fetching user.");
            res.redirect("/");
        }
    },

    //정보 수정 진행(닉네임, 상세주소, 프로필)
    update: async (req, res, next) => {
        let userId = req.params.id;
        let userParams = getUserParams(req.body);

        if (req.file) {
            userParams.imageUrl = '/uploadprofile/' + req.file.filename; // 파일 경로를 imageUrl에 저장
        }

        try {
            let user = await User.findByPk(userId);

            if (user) {
                await user.update(userParams);
                req.flash("success", "User updated successfully!");
                res.redirect(`/auth/mypage`);
            } else {
                req.flash("error", "User not found.");
                res.redirect("/");
            }
        } catch (error) {
            console.log(`Error updating user by ID: ${error.message}`);
            req.flash("error", "Error updating user.");
            res.redirect("/");
        }
    }
};
