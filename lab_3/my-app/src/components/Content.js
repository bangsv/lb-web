import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Header from './Header';
import VideoContainer from './VideoContainer';
import '../styles/content.css';

const Content = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/videos')  // Измените 'localhost' на 'flask-app'
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setVideos(data))
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    return (
        <div className="content">
            <Nav />
            <Header />
            <main>
                <div className="video-grid">
                    {videos.map((video, index) => (
                        <VideoContainer
                            key={video.id}  // Используйте уникальный идентификатор видео
                            videoSrc={video.video_src}  // Исправлено
                            title={video.title}
                            channelName={video.channel_name}  // Исправлено
                            channelIcon={video.channel_icon}  // Исправлено
                            description={video.description}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Content;
