const searchSong = async () => {
    const searchText = document.getElementById("searchInput").value
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayData(data.data);
    } catch {
        displayError("somthing went to wrong")
    }

}

const displayData = songs => {
    const totalSong = document.getElementById("song-container");
    totalSong.innerHTML = ""

    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                 <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
               <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio> 
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        totalSong.appendChild(songDiv)
    });
}

// get song lyric

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyric(data.lyrics)
    }
    catch {
        displayError("display loaded data faild!!")
    }
}

const displayLyric = lyric => {
    const songLyrics = document.getElementById("song-lyrics");
    songLyrics.innerText = lyric;
}

// error message

const displayError = error => {
    const ErrorMessage = document.getElementById("error-message")
    ErrorMessage.innerText = error
}