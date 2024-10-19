import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <img src="images/youbube.png" alt="Icon" width="170" height="70" />
            </div>

            <form className="search-form" action="" method="get">
                <input type="text" id="search_content" placeholder="Введите запрос" />
                <button type="submit">Поиск</button>
            </form>

            <div className="right_icons">
                <a href="http://localhost:3000/">
                    <img src="https://www.svgrepo.com/show/9399/home.svg" width="45" height="45" alt="Home" />
                </a>
                <a href="auth">
                    <img src="images/log.png" width="45" height="45" alt="Profile" />
                </a>
            </div>
        </header>
    );
};

export default Header;
