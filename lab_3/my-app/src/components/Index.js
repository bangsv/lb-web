import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Index = () => {
    return (
        <div>

            <header className="index-header">
                <Link to="/content">
                    <img src="images/youbube.png" alt="Логотип" width="190" height="70" />
                </Link>
            </header>


            <main className="index-main">
                <div className="index-circle">
                    <div>
                        <h1>Youbube</h1>
                        <p>​Передовой видеохостинг России и всего мира, присоединяйся к нам и познай, что такое качество</p>
                        <Link to="/content" className="index-transparent-button">​Присоединиться​</Link>
                    </div>
                </div>
            </main>


            <footer className="index-footer">
                <p>&copy; 2024 Видеохостинг</p>
            </footer>
        </div>
    );
};

export default Index;
