import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { LeftNavbar } from "../components/LeftNavbar"
import { RightNavbar } from "../components/RightNavbar"
import { AuthContext } from "../context/AuthContext"
import { BusketContext } from "../context/BusketContext"

export const CommissionPage = () => {
    const {commission, getCommissionFromDb} = useContext(BusketContext)
    const {userId} = useContext(AuthContext)

    useEffect(() => {
        getCommissionFromDb(userId)
    }, [userId])



    return (
        <>
            <Header/>
                <main className="window">
                    <div className="full_content">
                        <LeftNavbar/>
                        <div className="container">
                            <h1>
                                Заказы
                            </h1>
                            <div className="commissions-div">
                                {(commission.length!==0 && commission.map((prod, index)=> {
                                    return (
                                        <Link to={`/commission/${prod.id}`} key={index}>
                                            <div className="item-in-list" >
                                                <h1>{"Заказ №" +prod.id}</h1>
                                                <div className="flexing">
                                                    <div>
                                                        <p>{"Стоимость " + prod.commonPrice}</p>
                                                        <p>{"Время заказа: " + new Date(prod.date).toUTCString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })) || <h1>Заказов нет</h1>
                                
                                }
                            </div>
                        </div>
                        <RightNavbar/>
                    </div>
                </main>
            <Footer/>
        </>
    )
}