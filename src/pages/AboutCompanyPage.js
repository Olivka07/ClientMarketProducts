import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { LeftNavbar } from "../components/LeftNavbar"
import { RightNavbar } from "../components/RightNavbar"

export const AboutCompanyPage = () => {
    return (
        <>
            <Header/>
                <main className="window">
                    <div className="full_content">
                        <LeftNavbar/>
                        <div className="container">
                            <h1>
                                О компании Магазин
                            </h1>
                            <div className="info_comp">
                                <h2>
                                    История Магазина
                                </h2>
                                <p>
                                    Магазин — это величайшая история успеха в мире современной торговли. 
                                    Вот уже более 57 лет компания предлагает профессиональным клиентам широчайший 
                                    ассортимент высококачественных товаров, подобранный с учетом их требований.
                                </p>
                                <p>
                                    Компания была основана в Германии в 1964 году. 
                                    Уже в 1968 году революционная для того времени концепция cash&carry вышла 
                                    за пределы страны: Магазин подписал соглашение с голландской сетью Dutch Steenkolen 
                                    Hendelsvereniging N.V. (SHV) о создании совместной компании Makro Zelfbedienigsgroothandel C.V., 
                                    в которой партнерам-основателям принадлежало 40% акций. В последующие десятилетия Магазин и Makro 
                                    динамично развивались, занимая лидирующие позиции на международном рынке мелкооптовой торговли.
                                </p>
                                <p>
                                    В начале 21 века ключевыми для развития стали рынки Восточной Европы и Азии. 
                                    Компания существенно расширила сеть оптовых центров Магазин и значительно увеличила 
                                    общую торговую площадь за счет динамичного роста в России и Китае.
                                </p>
                                <p>
                                    Сегодня Магазин — крупнейшая управляющая компания международного 
                                    бизнес-формата cash&carry (мелкооптовая торговля) в составе холдинга Магазин 
                                    AG — глобального оператора розничной и мелкооптовой торговли.
                                </p>
                                <p>
                                    Более 750 торговых центров Магазин успешно работают в 25 странах мира. 
                                    Объем продаж компании за 2019–2020 финансовый год составил 27,1 млрд евро. 
                                    Количество сотрудников — около 100 000 человек.
                                </p>
                                <p>
                                    В основе развития Магазина лежит стратегия интернационализации. 
                                    Компания способствует созданию оптимальной инфраструктуры торгового 
                                    сектора, создает новые стабильные рабочие места, а также вносит существенный 
                                    вклад в образование на рынках своего присутствия.
                                </p>
                                <p>
                                    В России история Магазина началась в 2000 году, когда был зарегистрирован 
                                    первый офис компании в Москве. Уже год спустя, в ноябре 2001 года, там были 
                                    открыты два торговых центра мелкооптовой торговли Магазин. На сегодняшний день российское 
                                    подразделение компании Магазин открыло 93 торговых центра в 51 регионе России, 
                                    включая гипермаркет  Магазин СИТИ» в г. Котельники.
                                    Количество сотрудников насчитывает около 12 000 человек.
                                </p>
                                <p>
                                    Почти 5 миллионов лояльных клиентов высоко оценивают возможность покупки необходимых 
                                    товаров быстро, удобно и в одном месте.
                                </p>
                                <p>
                                    В Магазине действуют корпоративные нормы, обязательные для всех сотрудников компании. 
                                </p>
                                <p>
                                    В Магазине мы уверены, что основа успешного устойчивого развития в постоянно меняющемся 
                                    мире — ответственное отношение к ведению бизнеса, сотрудникам, окружающей среде и социальным вопросам. 
                                </p>
                                <h2>
                                    Преимущество Магазина
                                </h2>
                                <ol>
                                    <li>Удобные часы работы, без праздников и выходных;</li>
                                    <li>Профессиональные консультации;</li> 
                                    <li>Предварительный заказ товаров и удобная доставка;</li> 
                                    <li>Возможность получения кредита прямо в торговом зале.</li> 
                                </ol>
                            </div>
                            <div className="about_worker">
                                <a target="blank" href="/about_worker/index.html">
                                    <h2>
                                        О разработчике
                                    </h2>
                                </a>
                            </div>
                        </div>
                        <RightNavbar/>
                    </div>
                </main>
            <Footer/>
        </>
    )
}