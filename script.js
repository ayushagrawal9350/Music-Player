console.log("Welcome To Spotify")

//Initalize the Variable
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('ProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let NameDisplay = document.getElementById('SongInfo');

let songs = [
    {songName : "Warriyo - Mortals [NCS Release]" , filePath :"songs/1.mp3" , coverPath : 'cover/1.jpg'},
    {songName : "Cielo - Huma-Huma" , filePath :"songs/2.mp3" , coverPath : 'cover/2.jpg'},
    {songName : "DEAF KEV - Invincible [NCS Release]-320k" , filePath :"songs/3.mp3" , coverPath : 'cover/3.jpg'},
    {songName : "Different Heaven & EH!DE - My Heart" , filePath :"songs/4.mp3" , coverPath : 'cover/4.jpg'},
    {songName : "Janji-Heroes-Tonight-feat-Johnning" , filePath :"songs/5.mp3" , coverPath : 'cover/5.jpg'},
    {songName : "Awwaz Do - PagalNew" , filePath :"songs/6.mp3" , coverPath : 'cover/6.jpg'},
    {songName : "Fake A Smile - PagalNew" , filePath :"songs/7.mp3" , coverPath : 'cover/7.jpg'},
    {songName : "Lehra Do" , filePath :"songs/8.mp3" , coverPath : 'cover/8.jpg'},
    {songName : "Welcome To HollyWood" , filePath :"songs/9.mp3" , coverPath : 'cover/9.jpg'},
    {songName : "Your power - PagalNew" , filePath :"songs/10.mp3" , coverPath : 'cover/10.jpg'}
]
//Update SongName and CoverPhoto
songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})


//Handle play/pause click
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime <= 0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementsByClassName('songItemPlay')[0].classList.remove('fa-play-circle');
        document.getElementsByClassName('songItemPlay')[0].classList.add('fa-pause-circle');
        document.getElementById('gif').style.opacity = 1;
        songs.forEach((element,i)=>{
            if(i == songIndex)
            {
                document.getElementById('cover_photo').src = element.coverPath;
                NameDisplay.innerText = element.songName;
            }
        })
        NameDisplay.style.opacity = 1;
        document.getElementById('cover_photo').style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        document.getElementById('gif').style.opacity = 0;
        makeAllPlays();
        NameDisplay.style.opacity = 0;
        document.getElementById('cover_photo').style.opacity = 0;
    }
})

//Listen to the events
audioElement.addEventListener("timeupdate",()=>{
    //Update the seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    if(audioElement.currentTime == audioElement.duration)
    {
        if(songIndex >= 9)
        {
            songIndex =0;
        }
        else
        {
            songIndex += 1;
        }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            if(element.id == songIndex)
            {
                makeAllPlays();
                element.classList.remove('fa-play-circle');
                element.classList.add('fa-pause-circle');
            }
        })
        audioElement.play();
    }
})

//Song is also update with the change in the seekbar.
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

//Update All songlist

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{ //e is a pointer in which e.target gives id, class of pointed element.
        // console.log(e);
        let prev = songIndex;
        songIndex = parseInt(e.target.id);
        if(prev == songIndex)
        {
            makeAllPlays();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            document.getElementById('gif').style.opacity = 0;
            audioElement.pause();
            NameDisplay.style.opacity = 0;
            document.getElementById('cover_photo').style.opacity = 0;
        }
        else
        {
            makeAllPlays();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            document.getElementById('gif').style.opacity = 1;
            songs.forEach((element,i)=>{
                if(i == songIndex)
                {
                    document.getElementById('cover_photo').src = element.coverPath;
                    NameDisplay.innerText = element.songName;
                }
            })
            NameDisplay.style.opacity = 1;
            document.getElementById('cover_photo').style.opacity = 1;
        }
    })
})

//Handle previous and next keys
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 9)
    {
        songIndex =0;
    }
    else
    {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime =0;
    document.getElementById('gif').style.opacity = 1;
    audioElement.play();
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        if(element.id == songIndex)
        {
            makeAllPlays();
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
    })
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    songs.forEach((element,i)=>{
        if(i == songIndex)
        {
            document.getElementById('cover_photo').src = element.coverPath;
            NameDisplay.innerText = element.songName;
        }
    })
    NameDisplay.style.opacity = 1;
    document.getElementById('cover_photo').style.opacity = 1;
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0)
    {
        songIndex =9;
    }
    else
    {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime =0;
    document.getElementById('gif').style.opacity = 1;
    audioElement.play();
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        if(element.id == songIndex)
        {
            makeAllPlays();
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
    })
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    songs.forEach((element,i)=>{
        if(i == songIndex)
        {
            document.getElementById('cover_photo').src = element.coverPath;
            NameDisplay.innerText = element.songName;
        }
    })
    NameDisplay.style.opacity = 1;
    document.getElementById('cover_photo').style.opacity = 1;
})

//Handle Reset button
document.getElementById('reset').addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <= 0)
    {
        audioElement.currentTime = 0;
        document.getElementById('gif').style.opacity = 0;
        audioElement.pause();
    }
    else
    {
        audioElement.currentTime = 0;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById('gif').style.opacity = 1;
        audioElement.play();
    }
})

