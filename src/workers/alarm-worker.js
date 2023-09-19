onmessage = function(e) {
    if(e.data == "ring") {
        this.postMessage("ring")
    }
}