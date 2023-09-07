let interval

onmessage = function(e) {
    if (e.data == "start") {
        interval = setInterval(() => {
            this.postMessage("tick");
        }, 60000);
    } else {
        this.clearInterval(interval)
    }
}