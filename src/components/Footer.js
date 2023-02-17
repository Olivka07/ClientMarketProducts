import { Link } from "react-router-dom"

export const Footer = () => {

    const clickOnAboutCompany = () => {
        console.log('Хай')
    }

    // Переход в начало страницы
    function topPage() {
        window.scrollTo(0,0);
    }
    return (
        <footer className="footer">
            <div className="partFooter">
                <div className="footer_logo">
                    <Link to="/catalog">
                        <button className="linf_a">
                            <div className="logoinfo">
                                    <img className="logo" src="/logo.jpg" alt="логотип"/>
                                    <p>Магазин</p>
                            </div>
                        </button>
                    </Link>
                </div>
                <div className="phone_footer">
                    <p>Телефоны:
                        <br/>
                        +7-937-208-00-40
                        <br/>
                        +7-937-208-00-60
                        <br/>
                        +7-937-208-00-80

                    </p>
                </div>
            </div>
            <div className="partFooter">
                <div className="about_comp">
                    <Link to="/about">
                        <button>
                            О компании
                        </button>
                    </Link>
                </div>
            </div>
            <div className="partFooter">
                <p>
                    Социальные сети:
                    <br/>
                    <br/>
                    <a href="https://vk.com/0livka7">ВКонтакте</a> | <a href="instagram.com/piryushoff">Instagram</a> | <a href="https://t.me/Olivka797">Telegram</a>
                </p>
                <button className="top-page" onClick={topPage}>К началу страницы</button>
            </div>
        </footer>
    )
}