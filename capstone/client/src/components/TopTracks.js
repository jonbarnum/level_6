import React, { useEffect, useState } from "react";
import axios from "axios";

function TopTracks(){
    const [topTracks, setTopTracks] = useState([])

    function getTopTracks(){
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=cb41d576aa71567c76b75feab99d7dcd&format=json`)
        .then(response => {
            setTopTracks(response.data.tracks.track)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getTopTracks()
    }, [])

    return(
        <div>
            <h1 className="topTrackHeader">
                Top Tracks
            </h1>
            {topTracks.map(track => {
                return(
                    <div className="topTracksDiv">
                        <div key={track.name} className="trackDiv">
                            <div className="topTrackDiv">
                                <a
                                    href={track.url}
                                    rel="noreferrer"
                                    target='_blank'
                                    className="bandName"
                                >
                                    {track.name}
                                </a> 
                                <h1 className="artist">
                                    by {track.artist.name} 
                                </h1>
                            
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TopTracks