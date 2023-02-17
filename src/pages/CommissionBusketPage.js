import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { LeftNavbar } from "../components/LeftNavbar"
import { RightNavbar } from "../components/RightNavbar"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

export const CommissionBusketPage = () => {
    const id = useParams().id
    const {userId} = useContext(AuthContext)
    const {request} = useHttp()
    const [com, setCom] = useState(null)

    const ftchBusket = async() => {
        try {
            const res = await request('/api/commission/getone', 'GET',null, {id, id_client: userId})
            setCom(res.commission)
        } catch (e) {}
    }

    useEffect(() => {
        ftchBusket()
        
    }, [])
    return (
 
        <>
            {com && 
                <>
                    <Header/>
                        <main className="window">
                            <div className="full_content">
                                <LeftNavbar/>
                                <div className="container">
                                    <h1 className="header-comm">
                                        {"Заказ номер " + com.id}
                                    </h1>
                                    <div className="flexing-comm">
                                        <span>
                                            {"Стоимость заказа: " + com.commonPrice}
                                        </span>
                                        <span>
                                            {"Время заказа: " + new Date(com.date).toUTCString()}
                                        </span>
                                    </div>
                                    {com.busket && com.busket.map((prod, index)=> {
                                        return (
                                            <div className="item-in-list" key={index}>
                                                <h1>{prod.name}</h1>
                                                <div className="flexing">
                                                    <img src={prod.src}/>
                                                    <div>
                                                        <p>{"Количество " + prod.weight}</p>
                                                        <p>{"Цена " + prod.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <RightNavbar/>
                            </div>
                        </main>
                    <Footer/>
                </>
            }
        </>
    )
}