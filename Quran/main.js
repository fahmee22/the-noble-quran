//Explore button
let exploreBtn = document.querySelector('.title .btn'),
    HadithSection = document.querySelector('.hadith');
    exploreBtn.addEventListener('click',()=>{
    HadithSection.scrollIntoView({
        behavior : "smooth"
    })
})


let fixedNav = document.querySelector('.header');
     scrollBtn = document.querySelector('.scrollBtn');
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
    window.scrollY > 500 ? scrollBtn.classList.add('active') : scrollBtn.classList.remove('active');
})
scrollBtn.addEventListener('click',()=>{
    window.scrollTo({
        top : 0,
        behavior : "smooth"
    })
})
//Hadith Chapter
let hadithContainer = document.querySelector('.hadithContainer'),
    next = document.querySelector('.buttons .next'),
    prev = document.querySelector('.buttons .prev'),
    number = document.querySelector('.buttons .number');
    let hadithIndex = 0;
HadithChanger();
function HadithChanger()
{
    fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
    .then(response => response.json())
    .then(data =>{

        let Hadiths = data.data.hadiths;
        changeHadith();
        next.addEventListener('click',()=>{
            hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;
            changeHadith()
        })
        prev.addEventListener('click',()=>{
            hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;
            changeHadith()
        })
        function changeHadith()
        {
           hadithContainer.innerText = Hadiths[hadithIndex].arab;
           number.innerText = `300 - ${hadithIndex + 1}`
        }
    })
}

// Link Sections
let sections = document.querySelectorAll("section");
    links = document.querySelectorAll('.header ul li');
links.forEach(link => {
    link.addEventListener('click',()=>{
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target = link.dataset.filter;
        sections.forEach(section=>{
            if(section.classList.contains(target))
            {
                section.scrollIntoView({
                    behavior : "smooth"
                })
            }
        })
    })  
})
//PrayTime Api
let cards = document.querySelector('.cards');
getPrayTimes();
function getPrayTimes()
{
    fetch("http://api.aladhan.com/v1/timingsByCity?city=Thailand&country=bangkok&method=8")
    .then(response => response.json())
    .then(data =>{
        let times = data.data.timings;
        cards.innerHTML = "";
        for (let time in times)
        {
            cards.innerHTML+=
            `
            <div class="card">
                <div class="circle">
                    <svg>
                        <Circle cx="100" cy="100" r="100"></Circle>
                    </svg>
                    <div class="praytime">${times[time]}</div>
                  </div>
                  <p>${time}</p>
                </div>
            `
        }
    })
  
}
//Active SideBar
let bars = document.querySelector('.bars'),
    SideBar = document.querySelector('.header ul');
    bars.addEventListener('click',()=>{
        SideBar.classList.toggle("active")
    })