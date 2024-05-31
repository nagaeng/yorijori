
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

btnNo2.addEventListener("click" , ()=>{comm.style.display="flex"; 
                    h.style.display="flex";
                    alt.style.display="none";});


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



