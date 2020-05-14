import React from 'react';
import './MemeGenerator.scss';

function MemeGenerator () {
    return (
        <div>
            <form>
                <label>Top Text:
                    <input type='text' placeholder='Top Text' name='topText'/>
                </label>
                <label>Bottom Text:
                    <input type='text' placeholder='Bottom Text' name='bottomText'/>
                </label>
                <button>Generate!</button>
            </form>
        </div>
    )
}

export default MemeGenerator;