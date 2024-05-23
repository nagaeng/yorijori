$(document).ready(function() {  //브라우저 파싱, dom트리 생성전 시작방지
    $('.search-button').on('click', function(event) { //검색버튼 클릭시 이벤트 헨들러 작동
        var searchQuery = $('#search-input').val();
            $.ajax({ //ajax 통한 서버통신
                url: '/write/getIngredients',
                type: 'GET',
                data: { searchQuery: searchQuery },
                success: function(data) { //success 시 데이터 받아옴
                    var resultsDiv = $('#results');
                    if (data.ingredients && data.ingredients.length > 0) {
                            var ingredientElement = $('<div class="result-item"></div>')
                                .text(data.ingredients[0].ingredientName)
                            resultsDiv.append(ingredientElement);
 
                    } else {
                        alert('No ingredients found for "' + searchQuery + '".');
                    }
                },
                error: function(error) {
                    console.error('Error:', error);
                }
            });
        }
    );
});


