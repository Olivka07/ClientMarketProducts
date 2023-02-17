import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { LeftNavbar } from "../components/LeftNavbar"
import { RightNavbar } from "../components/RightNavbar"
import { AuthContext } from "../context/AuthContext"
import { BusketContext } from "../context/BusketContext"
import { CatalogContext } from "../context/CatalogContext"
import { useMessage } from "../hooks/message.hook"

export const ProductPage = () => {

    const message = useMessage()
    const id = Number(useParams().id)
    const {products, categories, deleteProduct} = useContext(CatalogContext)
    const {busket, updateBusket} = useContext(BusketContext)
    const {isAuthenticatedAdmin, isAuthenticatedClient} = useContext(AuthContext)
    const [product, setProduct] = useState(null)
    const [category, setCategory] = useState(null)
    const [modal, setModal] = useState(false)
    const [weight, setWeight] = useState(0)
    useEffect(() => {
        if (id) {
            setProduct(products.find((prod) => {
                if (prod.id === id) {
                    return prod
                }
            }))
        }
    }, [id])

    useEffect(() => {
        if (product) {
            setCategory((categories.find((cat) => {
                if (cat.id === product.idCategory) {
                    return cat
                }
            })).name)
        }
    }, [product])

    const openModal = () => {
        setModal(true)
    }

    const hideModal = () => {
        setModal(false)
    }

    const addInBusket = () => {
        if (weight>0) {
            if (busket) {
                const prod = busket.find((el) => {
                    if (el.id === product.id) {
                        return el
                    }
                })
                if (prod) {
                    updateBusket(busket.map((el) => {
                        if (el.id === prod.id) {
                            el.weightCommission += weight
                        }
                        return el
                    }))
                } else {
                    updateBusket([...busket, {...product, weightCommission: weight}])
                }
                message("Товар успешно добавлен")
            }
        } else {
            message("Укажите вес или количество товара")
        }
    }

    const deleteFromProducts = () => {
        deleteProduct(product.id)
    }


    return (
        <>
        {product && 
            <>
                <Header/>
                    <main className="window">
                        <div className="full_content">
                            <LeftNavbar/>
                            <div className="container">
                                <p>
                                    {product.name}           
                                </p>
                                <div className="info">
                                    <img onClick={openModal} src={product.src} className="image_product" alt={product.name} id={product.name}/>
                                    {modal && 
                                        <div>
                                            <div className="myModal" onClick={hideModal}></div>
                                            <div className="modal-content" onClick={hideModal}>
                                                <button className="close-modal" onClick={hideModal}>X</button>
                                                <img src={product.src}/>
                                            </div>
                                        </div>
                                    }
                                    <div className="info-text">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        Категория
                                                    </td>
                                                    <td className="col-right">
                                                        {category}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Вес
                                                    </td>
                                                    <td className="col-right">
                                                        {product.weight}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Цена
                                                    </td>
                                                    <td className="col-right">
                                                        {product.price}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {(isAuthenticatedAdmin || isAuthenticatedClient) && 
                                            <>
                                                <div className="weight-for-commission">
                                                    <input
                                                        type="number"
                                                        value={weight}
                                                        onChange={e => setWeight(Number(e.target.value))}
                                                        name="weight"
                                                        id="weight"
                                                        placeholder="количество"
                                                    />
                                                    <button onClick={e => addInBusket()}>Добавить в корзину</button>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className="description">
                                    <p>Описание:</p>
                                    <p>
                                        {product.description}
                                    </p>
                                </div>
                                {isAuthenticatedAdmin && 
                                    <Link to="/catalog">
                                        <button 
                                            onClick={deleteFromProducts} 
                                            className="btn-delete"
                                        >
                                            Удалить продукт
                                        </button>
                                    </Link>
                                }
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