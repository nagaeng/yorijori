exports.renderSearchResult = async (req, res) => {
    try {
        // 검색 페이지를 렌더링
        res.render('recipe/searchResult'); // 검색 결과를 표시할 페이지로 이동
    } catch (err) {
        console.error("Error rendering search page:", err);
        res.status(500).send({
            message: "Error rendering search page"
        });
    }
};