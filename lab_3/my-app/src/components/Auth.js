import React, { useState } from 'react';
import '../styles/auth.css';

const Auth = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Функция для смены вкладки (вход или регистрация)
    const openTab = (tabName) => {
        setActiveTab(tabName);
        setErrorMessage('');
        setSuccessMessage('');
    };

    // Функция для обработки входа
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            setSuccessMessage(data.message);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    // Функция для обработки регистрации
    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Пароли не совпадают');
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            setSuccessMessage(data.message);
        } catch (error) {
            setErrorMessage(error.message);
        }
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

                    {/* Сообщение об ошибке */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {/* Сообщение об успехе */}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    {/* Вкладка входа */}
                    <div id="login" className={`auth-tab-content ${activeTab === 'login' ? 'active' : ''}`}>
                        <h2>Вход</h2>
                        <form className="auth-form" onSubmit={handleLogin}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Логин"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="auth-transparent-button">Войти</button>
                        </form>
                    </div>

                    {/* Вкладка регистрации */}
                    <div id="register" className={`auth-tab-content ${activeTab === 'register' ? 'active' : ''}`}>
                        <h2>Регистрация</h2>
                        <form className="auth-form" onSubmit={handleRegister}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Логин"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                name="confirm_password"
                                placeholder="Подтверждение пароля"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
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
