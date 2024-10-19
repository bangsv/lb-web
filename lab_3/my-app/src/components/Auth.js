import React, { useState } from 'react';
import '../styles/auth.css';

const Auth = () => {
    const [activeTab, setActiveTab] = useState('login');

    const openTab = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div>
            <header className="auth-header">
                <a href="content">
                    <img src="images/youbube.png" alt="Логотип" width="170" height="70" />
                </a>
            </header>


            <main>
                <div className="auth-container">
                    <div className="auth-tabs">
                        <button
                            className={`auth-tab-button ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => openTab('login')}
                        >
                            Вход
                        </button>
                        <div className="auth-divider"></div>
                        <button
                            className={`auth-tab-button ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => openTab('register')}
                        >
                            Регистрация
                        </button>
                    </div>


                    <div id="login" className={`auth-tab-content ${activeTab === 'login' ? 'active' : ''}`}>
                        <h2>Вход</h2>
                        <form className="auth-form" action="login.php" method="POST">
                            <input type="text" name="username" placeholder="Логин" required />
                            <input type="password" name="password" placeholder="Пароль" required />
                            <button type="submit" className="auth-transparent-button">Войти</button>
                        </form>
                    </div>


                    <div id="register" className={`auth-tab-content ${activeTab === 'register' ? 'active' : ''}`}>
                        <h2>Регистрация</h2>
                        <form className="auth-form" action="register.php" method="POST">
                            <input type="text" name="username" placeholder="Логин" required />
                            <input type="password" name="password" placeholder="Пароль" required />
                            <input type="password" name="confirm_password" placeholder="Подтверждение пароля" required />
                            <button type="submit" className="auth-transparent-button">Регистрация</button>
                        </form>
                    </div>
                </div>
            </main>


            <footer className="auth-footer">
                <p>&copy; 2024 Видеохостинг</p>
            </footer>
        </div>
    );
};

export default Auth;
