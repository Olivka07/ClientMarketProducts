import { useContext } from "react"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { LeftNavbar } from "../components/LeftNavbar"
import { RightNavbar } from "../components/RightNavbar"
import { AuthContext } from "../context/AuthContext"
import { BusketContext } from "../context/BusketContext"
import { useHttp } from "../hooks/http.hook"

export const BusketPage = () => {
    const {busket, updateBusket, commission, updateCommission} = useContext(BusketContext)
    const {userId} = useContext(AuthContext)
    const {request} = useHttp()


    const deleteFromBusketHandler = (id) => {
        updateBusket(busket.filter((el) => {
            if (el.id !== id) {
                return el
            }
        }))
    }

    const clickAddCommission = async() => {
        const newCommission = {}
        newCommission.idUser = userId
        newCommission.busket = [...busket]
        updateBusket([])
        const res = await request('/api/commission/add', 'POST', {newCommission: newCommission})
        updateCommission([...commission, res.newComm])
    }

    return (
        <>
            <Header/>
                <main className="window">
                    <div className="full_content">
                        <LeftNavbar/>
                        <div className="container">
                            <h1>
                                Корзина
                            </h1>
                            {busket && busket.map((prod)=> {
                                return (
                                    <div className="item-in-list" key={prod.id}>
                                        <h1>{prod.name}</h1>
                                        <div className="flexing">
                                            <img src={prod.src}/>
                                            <div>
                                                <p>{"Количество " + prod.weightCommission}</p>
                                                <p>{"Цена " + (prod.weightCommission/prod.weight * prod.price)}</p>
                                                <button onClick={e => deleteFromBusketHandler(prod.id)}>Удалить</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {(busket.length!==0 && <button className="btn-create-com" onClick={clickAddCommission}>Сделать заказ</button>) || <h1>Корзина пустая</h1>}
                        </div>
                        <RightNavbar/>
                    </div>
                </main>
            <Footer/>
        </>
    )
}