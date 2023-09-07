let interval

onmessage = function(e) {
    if (e.data == "start") {
        interval = setInterval(() => {
            this.postMessage("tick");
        }, 1000)
    } else {
        this.clearInterval(interval)
    }
}