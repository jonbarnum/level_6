import React, { useContext } from "react";
import { AppContext } from "../appContext";
import Bands from "./Bands";

function BandSearch(){
    const {handleSearch, inputData, handleChange} = useContext(AppContext)


    return(
        <div>
            <div className="bandSearchDiv">
                <form 
                    className="bandSearchForm"
                    onSubmit={handleSearch}
                >
                    <label
                        className="bandSearchLabel"
                    >
                        Search for your: 
                    </label>
                    
                    <input
                        type='text'
                        name='artist'
                        placeholder=' Favorite Band'
                        className="bandSearchInput"
                        value={inputData.artist}
                        onChange={handleChange}
                    />
                    <button
                        className="searchButton"
                    >
                        Search
                    </button>
                </form>
            </div>
            <Bands />
        </div>
    )
}

export default BandSearch