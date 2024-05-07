exports.getHomePage = async (req, res) => {
    try {
        res.render('home'); // home.ejs 파일 렌더링(메인페이지 화면)
    } catch (err) {
        console.error("Error loading the home page:", err);
        res.status(500).send({
            message: "Error loading the home page"
        });
    }
};
