import React from 'react';

const VideoContainer = ({ videoSrc, title, channelName, channelIcon, description }) => {
    return (
        <div className="video-container">
            <iframe
                src={videoSrc}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <div className="video-details">
                <img
                    src={channelIcon}
                    alt="Channel Icon"
                    className="channel-icon"
                    width="40"
                    height="40"
                />
                <div className="details-text">
                    <h3>{channelName}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoContainer;
