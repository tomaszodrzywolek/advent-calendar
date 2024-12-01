import React from 'react';
import './JunctionCross.css';

const junctionCross = () => {
    return (
        <div className="junction-cross-embed">
            <iframe
                height="300"
                style={{ width: '100%' }}
                title="Simple Canvas Game"
                    src="https://codepen.io/1franck/embed/eYZaNL?default-tab=result"
                loading="lazy"
                allowFullScreen={true}>
            </iframe>
        </div>
    );
};

export default junctionCross;
