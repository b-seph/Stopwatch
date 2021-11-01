//Object orientented approach
function Stopwatch() {
    this.startTime = new Date();
    this.finishTime = new Date();
    this.currentTime = (this.finishTime - this.startTime);
    this.isRunning = false;

    this.start = function() {
        if (this.isRunning == true) return false;
        this.isRunning = true;
        this.startTime = new Date();
        return true;
    };
    this.stop = function() {
        if (this.isRunning == false) return false;
        this.isRunning = false;
        this.finishTime = new Date();
        this.currentTime = (this.finishTime - this.startTime)
        return true;
    };
    this.reset = function () {
        if (this.isRunning == true) this.stop();
        this.currentTime = 0;
    }
    this.updateCurrentTime = function () {
        this.currentTime = ((new Date()) - this.startTime);
        return this.currentTime;
    };
    this.getCurrentTime = function () {
        return this.currentTime;
    };
    this.currentTimeToString = function () {
        milliseconds = this.currentTime % 1000;
        seconds = Math.floor(this.currentTime / 1000);
        minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);

        return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ":" + (milliseconds < 10 ? '00' : (milliseconds < 100 ? '0' : '')) + milliseconds;
    }

};

const stopwatch = new Stopwatch();

const value = document.getElementById("value");

const hand = document.getElementById("hand");

var switch_anim = false; //used to switch between animations

function startStopwatch() {
    if(stopwatch.start()) {
        startAnimation();
        cycle();
    }
}

function startAnimation() {
    const anim_1 = "hand-anim-1 60s linear infinite";
    const anim_2 = "hand-anim-2 60s linear infinite";
    //the usage of two animations was the best I could come up to in order to be able to start the animation from the start
    //when I tried to set it to "" or to remove the animation property altogether before setting it to the actual animation it didn't reset it
    //this way it forces the reset since it's basically changing it's animation
    if(!switch_anim) hand.style.animation = anim_1;
    else hand.style.animation = anim_2;
    switch_anim = !switch_anim;
    hand.style.animationPlayState = "running";
}

function stopStopwatch() {
    stopwatch.stop();
    hand.style.animationPlayState = "paused";
}
function resetStopwatch() {
    stopwatch.reset();
    value.innerHTML = stopwatch.currentTimeToString();
    hand.style.animation = "";
    hand.style.animationPlayState = "running";
}

function cycle() {
    if (stopwatch.isRunning) {
        stopwatch.updateCurrentTime();
        value.innerHTML = stopwatch.currentTimeToString();
        setTimeout("cycle()", 1);
    }
}