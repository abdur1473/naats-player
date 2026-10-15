const hideplaylist = document.querySelector("#hideplaylist")
const naatList = document.querySelector("#naatlist")

hideplaylist.addEventListener("click", function () {
    if(naatList.style.display  === "block"){
        naatList.style.display = "none"
    }else{
        naatList.style.display = "block"
    }

    
});

const handle = document.querySelector(".ply")

handle.addEventListener("click", function () {
    handle.classList.toggle("ply")
})

const naats = document.querySelectorAll(".naats .naat");

const mainPoster = document.querySelector("#mainPoster");
const mainTitle = document.querySelector("#mainTitle");
const mainArtist = document.querySelector("#mainArtist");
const mainAudio = document.querySelector("#mainAudio");

const progress = document.querySelector("#progress")
const currentTime = document.querySelector("#curenttime")
const duration = document.querySelector("#duration")

const playIcon = document.querySelector("#playicon");
const previous = document.querySelector("#previous")
const play = document.querySelector("#play")
const next = document.querySelector("#next")

const volume = document.querySelector("#volume")



// currentnaat
let currentNaat = 0


function loadNaat(index) {

    currentNaat = index

    const naat = naats[index]

        const title = naat.getAttribute("data-title");
        const artist = naat.getAttribute("data-artist");
        const audio = naat.getAttribute("data-audio");
        const image = naat.getAttribute("data-image");

        mainTitle.textContent = title;
        mainArtist.textContent = artist
        mainPoster.src = image;
        mainAudio.src = audio;

         progress.value = 0;

        currentTime.textContent = "0:00";

        duration.textContent = "0:00";

}

naats.forEach(function (naat,index) {

    naat.addEventListener("click", function () {

         loadNaat(index)
         mainAudio.play()
       

    });

});

mainAudio.addEventListener("loadedmetadata", function () {
    duration.textContent = timeformat(mainAudio.duration)
})

function timeformat(seconds) {
    let minutes = Math.floor(seconds / 60)
    let secondsleft = Math.floor(seconds % 60)
    
    if(secondsleft < 10) {
        secondsleft = "0" + secondsleft
    }

    return `${minutes} : ${secondsleft}`
}

mainAudio.addEventListener("timeupdate", function () {
    if (!mainAudio.duration) return;
    
    progress.value = (mainAudio.currentTime / mainAudio.duration) * 100;
    currentTime.textContent = timeformat(mainAudio.currentTime);
    
});

 progress.addEventListener("input", function() {
    if(!mainAudio.duration) return;

    mainAudio.currentTime = (progress.value / 100) * mainAudio.duration
 })

next.addEventListener("click", function() {
    currentNaat++

    if(currentNaat >= naats.length){
        currentNaat = 0;
    }

    loadNaat(currentNaat)

    mainAudio.play()
    play.textContent = "Ⅱ"
})

play.addEventListener("click" , function() {
    if(mainAudio.paused) {
        mainAudio.play()
        playIcon.classList.remove("fa-play")
        playIcon.classList.add("fa-pause")
    }else{
        mainAudio.pause()
        playIcon.classList.remove("fa-pause")
        playIcon.classList.add("fa-play")
    }
})

previous.addEventListener("click", function() {
    currentNaat--

    if(currentNaat < 0){
       currentNaat = naats.length - 1;
    }

    loadNaat(currentNaat)

    mainAudio.play()
    play.textContent = "Ⅱ"
})

volume.addEventListener("input", function() {
    mainAudio.volume = volume.value / 100;
})

mainAudio.volume = 0.7