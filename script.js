var base_url = "https://youtubedownloaderapi.jjtv.repl.co/"

function download(){
    youtube_video = document.getElementById("yt-link").value
    if (youtube_video == ""){
        alert("Please enter a youtube link")
        return
    }
    console.log(youtube_video)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", base_url + "yt?id=" + youtube_video, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText)
                list = document.getElementById("formats")
                out = ""
                for(i = 0; i < response.length; i++){
                    if(response[i].type == "audio"){
                        out += "<li><a href='" + response[i].dl_link + "'><i class='fas fa-volume-up'></i> "+response[i].ext+"</a></li>"
                    }
                    else{
                        out += "<li><a href='" + response[i].dl_link + "'><i class='fas fa-video'></i> "+response[i].quality+", "+response[i].fps+"fps, "+response[i].ext+"</a></li>"
                    }
                }
                list.innerHTML = out
            } else {
                alert("Error: " + xhr.status.toString());
            }
        }
    };
    xhr.send(null);
}