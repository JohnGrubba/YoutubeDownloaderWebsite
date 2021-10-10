var base_url = "https://youtubedownloaderapi.jjtv.repl.co/"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function onSubmit(token) {
    console.log("Submitted");
    console.log(token);
    var dl_text = document.getElementById("dl-text")
    var dl_bar = document.getElementById("dl-bar")
    var progress = document.getElementById("prog")
    start_button = document.getElementById("start-button")
    youtube_video = document.getElementById("yt-link").value
    if (youtube_video == ""){
        alert("Please enter a youtube link")
        return
    }

    //SET DOWNLOAD BAR
    progress.value = 0;
    dl_text.style.display = "none";
    dl_bar.style.display = "block";

    console.log(youtube_video);

    var xhr = new XMLHttpRequest();

    xhr.open("POST", base_url + "yt?id=" + youtube_video, true);
    stamp = Date.now().toString()
    xhr.setRequestHeader("useragent", navigator.userAgent + "-" + stamp);

    xhr.onreadystatechange = async function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                
                while(progress.value < 100){
                    progress.value += 0.4;
                    await sleep(5);
                }
                var response = JSON.parse(xhr.responseText)
                console.log(response.type)
                if(response.type == "video"){
                    //Video Download Code
                    console.log("Video")
                    list = document.getElementById("vid")
                    out = '<div id="single"><a href="'+response.url+'" target="_blank">'+response.title+'</a><ul id="formats">'
                    for(var i = 0; i < response.formats.length; i++){
                        if(response.formats[i].type == "audio"){
                            out += "<li><a href='" + response.formats[i].dl_link + "' target='_blank'><i class='fas fa-volume-up'></i> "+response.formats[i].ext+"</a></li>"
                        }
                        else if(response.formats[i].type == "video+audio"){
                            out += "<li><a href='" + response.formats[i].dl_link + "' target='_blank'><i class='fas fa-video'></i>&nbsp<i class='fas fa-volume-up'></i> "+response.formats[i].quality+", "+response.formats[i].fps+"fps, "+response.formats[i].ext+"</a></li>"
                        }
                        else if(response.formats[i].type == "video"){
                            out += "<li><a href='" + response.formats[i].dl_link + "' target='_blank'><i class='fas fa-video'></i> "+response.formats[i].quality+", "+response.formats[i].fps+"fps, "+response.formats[i].ext+"</a></li>"
                        }
                    }
                    out += "</ul></div>"
                    list.innerHTML = out
                }
                else{
                    //Playlist Code
                    var out = ""
                    console.log("Playlist")
                    list = document.getElementById("vid")
                    //Video Loop
                    for(var i = 0; i < response.videos.length; i++){
                        r = response.videos[i]
                        //Video
                        out += '<div id="obj"><a href="'+r.url+'" target="_blank">'+r.title+'</a><ul id="formats">'
                        for(var e = 0; e < r.formats.length; e++){
                            if(r.formats[e].type == "audio"){
                                out += "<li><a href='" + r.formats[e].dl_link + "' target='_blank'><i class='fas fa-volume-up'></i> "+r.formats[e].ext+"</a></li>"
                            }
                            else if(r.formats[e].type == "video+audio"){
                                out += "<li><a href='" + r.formats[e].dl_link + "' target='_blank'><i class='fas fa-video'></i>&nbsp<i class='fas fa-volume-up'></i> "+r.formats[e].quality+", "+r.formats[e].fps+"fps, "+r.formats[e].ext+"</a></li>"
                            }
                            else if(r.formats[e].type == "video"){
                                out += "<li><a href='" + r.formats[e].dl_link + "' target='_blank'><i class='fas fa-video'></i> "+r.formats[e].quality+", "+r.formats[e].fps+"fps, "+r.formats[e].ext+"</a></li>"
                            }
                        }
                        out += "</ul></div>"
                    }
                    console.log(out);
                    list.innerHTML = out
                }
                await sleep(500);
                dl_text.style.display = "block";
                dl_bar.style.display = "none";
                start_button.disabled = false;
            }
        else {
            while(progress.value >= 1){
                progress.value -= 0.5;
                await sleep(1);
            }
            progress.value = 0;
            dl_text.style.display = "block";
            dl_bar.style.display = "none";
            start_button.disabled = false;
            await sleep(100);
            alert("Error: " + xhr.status.toString());
            return;
            }
        }
    };
    start_button.disabled = true;
    xhr.send(null);
    if(youtube_video.includes("list") && !youtube_video.includes("index")){
        while(progress.value < 50){
            progress.value += 0.05;
            await sleep(17);
        }
    }
    else{
        while(progress.value < 50){
            progress.value += 0.2;
            await sleep(5);
        }
    }

}