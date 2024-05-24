let clickbtNum = 0; 

$(document).ready(function() {  //브라우저 파싱, dom트리 생성전 시작방지
    $('.search-button').on('click', function(event) { //검색버튼 클릭시 이벤트 헨들러 작동
        let searchIngredient = $('#search-input').val();
            $.ajax({ //ajax 통한 서버통신
                url: '/write/getIngredients',
                type: 'GET',
                data: {searchIngredient: searchIngredient },
                success: function(data) { //success 시 데이터 받아옴
                    var resultsDiv = $('#results');
                    if (data.ingredients && data.ingredients.length > 0) {
                            var ingredientElement = $('<div class="result-item"></div>')
                                .text(data.ingredients[0].ingredientName)
                            resultsDiv.append(ingredientElement);
 
                    } else {
                        alert('No ingredients found for "' + searchIngredient + '".');
                    }
                },
                error: function(error) {
                    console.error('Error:', error);
                }
            });
        }
    );

 $('.search-Menu-button').on('click',function(event) {
        if(clickbtNum==0){
            clickbtNum++;
        let searchMenu = $('#search-menu').val();
        $.ajax({
            url:'write/getMenu',
            type:'GET',
            data:{searchMenu : searchMenu},
            success:function(data){
               console.log(data);
              $('.result-menu').empty();
                if(data.selectMenu[0].menuName == searchMenu){
                    $('#search-menu').css("display","none");
                   let resultMenu = $('.result-menu');
                   resultMenu.css("display","block");
                   resultMenu.append(data.selectMenu[0].menuName);
                }
                else{
                   alert("해당 메뉴가 없습니다.")
                }
            },
            error: function(error){
                console.log('error:',error);
            }
         });
        }
        else {
            clickbtNum--;
            $('#search-menu').css("display","block");
            $('.result-menu').css("display","none");
        }
      }
    )
    
});

 