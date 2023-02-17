import { useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom"
import { CatalogContext } from "../context/CatalogContext";

export const Header = () => {
    const runningString = useRef(null)
    const { search, updateSearch} = useContext(CatalogContext)


    // useEffect(() => {
    //     const text_run = "Спасибо за визит! "
    //     runningString.current.innerHTML = text_run;
    //     setInterval(() => {
    //         let text = runningString.current.innerHTML; 
    //         runningString.current.innerHTML = text[text.length-1] + text.substring(0, text.length-1);
    //     }, 3000)
    // }, [])

    


    return (
        <header>
            <div className="head">
                <div className="withlogo">
                    <div className="linf">
                        <Link to="/">
                            <button className="linf_a" >
                                <div className="logoinfo">
                                        <img className="logo" src="/logo.jpg" alt="логотип"/>
                                        <p>Магазин</p>
                                </div>
                            </button>
                        </Link>
                    </div>
                    <div className="rightlogo">
                        <div className="upwithlogo">
                            <div className="address">
                                <p>Адрес: Московское шоссе, 34</p>
                            </div>
                            <div className="phone">
                                <p>Телефон: 88001010010</p>
                            </div>
                            <div className="timeWork">
                                <p>Время работы:8:00-20:00</p>
                            </div>
                        </div>
                        <div className="divsearch">
                            <input 
                                className="search"
                                type="text"
                                value={search}
                                onChange={e => updateSearch(e.target.value)}
                            />
                            <div className="running_string"><p ref={ runningString } id="running_string">Спасибо за визит</p></div>
                        </div>
                    </div>
                </div>
                <hr/>
                <nav className="headNavbar">

                    <Link className="itemMenu" to="/">
                        <div>
                            <p>КАТАЛОГ</p>
                        </div>
                    </Link>
                    <Link to="/commission" className="itemMenu">
                        <div>
                            <p>МОИ ЗАКАЗЫ</p>
                        </div>
                    </Link>
                    <Link to="/busket" className="itemMenu">
                        <div>
                            <p>КОРЗИНА</p>
                        </div>
                    </Link>
                </nav>
            </div>
        </header>
    )
}