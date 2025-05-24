let images =[];
let index = 0;
  let interval;
  const divx = document.querySelector(".backgroundDiv");
  let btnNext=document.querySelector(".btnNext");
    btnNext.addEventListener("click",function(){nextImage()});

const navx = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navx.classList.add("scrolled");
    } else {
      navx.classList.remove("scrolled");
    }
  });



(function AllFn() {
    var xhr = new XMLHttpRequest();
    var response = [];
    var url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;

    var token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQxMGQyYjhmNTJiYzBhNTMyMGQ1YzlkODhiZDFmZiIsIm5iZiI6MTU5Mjc1NTkwMS44MjgsInN1YiI6IjVlZWY4NmJkZWQyYWMyMDAzNTlkNGM4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NT77KLEZLjsgTMnyjJQBWADPa_t_7ydLLbvEABTxbwM";

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Authorization", token);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            response = JSON.parse(xhr.responseText);
            console.log(response);
            Display(response.results);
        }
    };
    xhr.send();
})();

function Display(objAr) {
    var TitleOrName, PosterOrProfile ,trailer;

    for (var i = 0; i < objAr.length; i++) {

        if (objAr[i].title === undefined) {
            TitleOrName = objAr[i].name
        } else {
            TitleOrName = objAr[i].title
        }
        if (objAr[i].profile_path === undefined) {
            PosterOrProfile = objAr[i].poster_path
        }
        else {
            PosterOrProfile = objAr[i].profile_path
        }
        trailer = objAr[i].backdrop_path

        images.push(trailer);
    }
      setBackground();
  startSlider();

}


  function setBackground() {
    divx.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${images[index]}')`;
  }

  function nextImage() {
    index = (index + 1) % images.length;
    setBackground();
  }

  function prevImage() {
    index = (index - 1 + images.length) % images.length;
    setBackground();
  }

  function startSlider() {
    interval = setInterval(nextImage, 5000);
  }

  function stopSlider() {
    clearInterval(interval);
  }
  divx.addEventListener("mouseenter", stopSlider);
  divx.addEventListener("mouseleave", startSlider);

