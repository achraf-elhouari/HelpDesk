const menuBtn = document.getElementById('icon-btn');
const navMenu = document.getElementById('menu-nav');
menuBtn.addEventListener('click', function(){
    navMenu.classList.toggle('display');
})