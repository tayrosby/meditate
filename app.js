const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid video");

    //sounds
    const sounds = document.querySelectorAll(".sound button");

    //time
    const time = document.querySelector(".time-display");

    //length of outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);

    //duration
    const timeSelect = document.querySelectorAll(".time button");
    let duration = 600;

    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;

    //pick sound
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        });
    });

    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //select sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            duration = this.getAttribute("data-time");
            time.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
        })
    });

    //stop and play sound
    const checkPlaying = song => {
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }
        else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg'
        }
    }

    //animation
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //circle animation
        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //text animation
        time.textContent = `${minutes}:${seconds}`;

        if(currentTime >= duration){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
};

app();