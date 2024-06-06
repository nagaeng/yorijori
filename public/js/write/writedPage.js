
const modal = document.querySelector('.modal');
const btnOk=document.querySelector('.btn-ok');
const btnNo=document.querySelector('.btn-no');
const btnNo2 = document.querySelector('.bu2')
const erase = document.querySelector('.erase');
const er = document.querySelector('.er');
const comment = document.querySelector('.comment-box')
const comm1 = document.querySelector('.comm-content1')
const hak = document.querySelector('.hak')
const h = document.querySelector('.h');
const alt = document.querySelector('.alt');
const inputElement = document.querySelector('.comment-place');
const commentBt = document.querySelector('.comment-bt');
const comm = document.querySelector('.comm-content');
const comSu = document.querySelector('.com-su');
const dok = document.querySelector('.dok');
const correction = document.querySelector('.co');
const suOrErase = document.querySelector('.alter-box');
let i = 0; 


btnOk.addEventListener("click" , ()=>{window.location.href = "../html/communitypage.html";});
btnNo.addEventListener("click" , ()=>{ modal.style.display="none";} );
erase.addEventListener("click", ()=>{modal.style.display = 'flex';  });
er.addEventListener("click", ()=>{modal.style.display = 'flex';  });


function checkInput() {
    if (inputElement.value == '') {
        alert('입력란이 비어있습니다!');
    }
};

function checkInput2(){
    if(comSu.value == ''){
        alert('입력란이 비어있습니다!');
        return 1; 
    }
    else 
    return 0; 
};

commentBt.addEventListener("click", checkInput);

// btnNo2.querySelectorAll("click" , ()=>{comm.style.display="flex"; 
//                     h.style.display="flex";
//                     alt.style.display="none";});

document.querySelectorAll('.bu2').forEach(function(btnNo2) {
    btnNo2.addEventListener('click', function() {
        const parentDiv = btnNo2.closest('.alt');
        if (parentDiv) {
            const commentId = parentDiv.dataset.commentId;
            // commentId를 사용하여 원하는 작업을 수행할 수 있습니다.
        }
    });
});
hak.addEventListener("click", checkHak);

function checkHak(){
    checkInput2();
    if(checkInput2 == 1){
        comm.style.display ="flex";
       
    }
    else{
        comm.style.display = "none";
        h.style.display = "none";
        alt.style.display = "flex";
        
    }
};

dok.addEventListener("click",()=>{
    if(i==0){
    correction.style.display="block";
    i ++; 
    }
    else{
    correction.style.display="none";
    i=0; 
    }
});

console.log("LoginuserId 값:", LoginuserId);



document.querySelector(".comment-bt").addEventListener("click", function(event) {
    // 로그인 여부 확인
    if ( LoginuserId == -1) {
        // 로그인되지 않은 경우
        alert('로그인이 필요합니다!');
        event.preventDefault(); // 폼 제출 중지
    }
});