exports.getWritePage = async (req, res) => {
    try {
        res.render('write'); 
    } catch (err) {
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
        });
    }
};
