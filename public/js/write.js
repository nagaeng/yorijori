let clickbtNum = 0; 
//재료검색 get 요청 client
$(document).ready(function() {  //브라우저 파싱, dom트리 생성전 시작방지 function({})로 축약가능
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
//메뉴검색 get 요청 client
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
    $('#summernote').summernote({ 
      placeholder: '내용',
      tabsize: 2,
      focus: true,
      height: 400,
      callbacks:{
        // onImageUpload를 통해 이미지 업로드시 동작 개조 가능
        // 개조하지 않으면 Base64로 이미지가 전환돼서 img태그로 바뀐뒤 본문에 추가된다.
        onImageUpload: function(files){
          sendFile(files[0], this);
        }
      }
    }); 
});


  function sendFile(file, editor){
    data = new FormData()
    data.append("img", file)
    // id 'img'로 file form 데이터 추가
    $.ajax({
      data: data,
      type: "POST",
      // 이미지 처리를 할 url
      url: "/insertImage",
      cache: false,
      contentType: false,
      // multer-s3를 활용하므로 multipart/form-data형태로 넘겨줘야 한다.
      enctype: "multipart/form-data",
      processData: false,
      success: function (response) {
        var imgurl = $('<img>').attr({
          'src': response,
          // json형태로 반환되는 주소.
          'crossorigin': 'anonymous',
          // crossorigin attr을 삽입하지 않으면 CORS에러가 난다!
      });
        $("#summernote").summernote("insertNode", imgurl[0]);
        // insertNode는 html tag를 summernote 내부에 삽입해주는 기능.
      },
    })
  }
 
