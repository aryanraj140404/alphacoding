const songs = [
    {
        name: "song1.mp3",
        title: "Dreams",
        artist: "Alex"
    },
    {
        name: "song2.mp3",
        title: "Night Vibes",
        artist: "Ryan"
    },
    {
        name: "song3.mp3",
        title: "Peaceful",
        artist: "John"
    }
];

let songIndex = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

loadSong(songIndex);
createPlaylist();

function loadSong(index){
    title.innerText = songs[index].title;
    artist.innerText = songs[index].artist;
    audio.src = songs[index].name;
}

function playPause(){
    if(audio.paused){
        audio.play();
    } else {
        audio.pause();
    }
}

function nextSong(){
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
}

function prevSong(){
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audio.play();
}

audio.addEventListener("timeupdate", updateProgress);

function updateProgress(){
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";

    let currentMin = Math.floor(audio.currentTime / 60);
    let currentSec = Math.floor(audio.currentTime % 60);
    let durationMin = Math.floor(audio.duration / 60);
    let durationSec = Math.floor(audio.duration % 60);

    if(currentSec < 10) currentSec = "0" + currentSec;
    if(durationSec < 10) durationSec = "0" + durationSec;

    currentTimeEl.innerText = currentMin + ":" + currentSec;
    durationEl.innerText = durationMin + ":" + durationSec;
}

function setProgress(e){
    const width = e.target.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
}

function setVolume(){
    audio.volume = volume.value;
}

audio.addEventListener("ended", nextSong); // Autoplay

function createPlaylist(){
    songs.forEach((song, index)=>{
        const li = document.createElement("li");
        li.innerText = song.title + " - " + song.artist;
        li.onclick = () => {
            songIndex = index;
            loadSong(songIndex);
            audio.play();
        };
        playlist.appendChild(li);
    });
}
