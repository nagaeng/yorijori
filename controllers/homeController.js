exports.getHomePage = async (req, res) => {
    try {
        res.send('Welcome to Yorijori');
    } catch (err) {
        console.error("Error loading the home page:", err);
        res.status(500).send({
            message: "Error loading the home page"
        });
    }
};