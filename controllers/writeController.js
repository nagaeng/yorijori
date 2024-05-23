const db = require("../models");
const Ingredient = db.ingredient;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
session = require('express-session'),

exports.getWritePage = async (req, res) => {
    try {
        res.render('write'); // 검색 결과와 검색어를 뷰에 전달
    } catch (err) {
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
        });
    }
};

exports.getIngredients = async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery || ''; //url로 받아오기
        console.log("Search Query:", searchQuery); //검색어 확인

        //db에서 받아올 재료 배열
        let ingredients = []; 
        
        if (searchQuery) { 
            ingredients = await Ingredient.findAll({
                where: {
                    ingredientName: {
                        [Op.like]: `%${searchQuery}%`
                    }
                }
            });    
        }
       
        res.send({ingredients}); //재료배열 전달
        console.log("Ingredients Found:", ingredients); // 검색 결과 확인

    } catch (err) {
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
        });
    }
};

exports.getMenu = async (req, res) => {
    try {
        const searchQuery = req.query.menu || ''; //url로 받아오기
        console.log("Search Query:", searchQuery); //검색어 확인

        //db에서 받아올 재료 배열
        let ingredients = []; 
        
        if (searchQuery) { 
            ingredients = await Ingredient.findAll({
                where: {
                    ingredientName: {
                        [Op.like]: `%${searchQuery}%`
                    }
                }
            });    
        }
       
        res.render('write',{ingredients});
        console.log("Ingredients Found:", ingredients); // 검색 결과 확인

    } catch (err) {
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
        });
    }
};

exports.getMainCategory = async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery || ''; //url로 받아오기
        console.log("Search Query:", searchQuery); //검색어 확인

        //db에서 받아올 재료 배열
        let ingredients = []; 
        
        if (searchQuery) { 
            ingredients = await Ingredient.findAll({
                where: {
                    ingredientName: {
                        [Op.like]: `%${searchQuery}%`
                    }
                }
            });    
        }
       
        res.render('write',{ingredients});
        console.log("Ingredients Found:", ingredients); // 검색 결과 확인

    } catch (err) {
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
        });
    }
};
