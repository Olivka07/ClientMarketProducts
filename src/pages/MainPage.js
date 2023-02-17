import { useContext, useEffect, useState } from "react"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { LeftNavbar } from "../components/LeftNavbar"
import { RightNavbar } from "../components/RightNavbar"
import { AuthContext } from "../context/AuthContext"
import { CatalogContext } from "../context/CatalogContext"
import {Link} from 'react-router-dom'

export const MainPage = () => {
    const {catalog, updateCatalog} = useContext(CatalogContext)
    const {isAuthenticatedAdmin} = useContext(AuthContext)
    const [sort, setSort] = useState(0)

    

    useEffect(() => {
        if (sort === 1) {
            updateCatalog(catalog.sort((a, b) => {
                if (a.price > b.price) {
                    return 1
                }
                if (a.price < b.price) {
                    return -1
                } 
                return 0
            }))
        } else if (sort === 2) {
            updateCatalog(catalog.sort((a, b) => {
                if (a.price > b.price) {
                    return -1
                }
                if (a.price < b.price) {
                    return 1
                } 
                return 0
            }))
        } 
    }, [sort])

    const sortHandler = (e) => {
        setSort(Number(e.target.value))
    }


    return (
        <>
            <Header/>
                <main className="window">
                    <div className="full_content">
                        <LeftNavbar/>
                        <div className="container">
                            <p>Каталог</p>
                            <div className="select-button">
                                <div>
                                    <p>Сортировка</p>
                                    <select id="sel"
                                        onChange={e => sortHandler(e)}
                                        value={sort}
                                    >
                                        <option 
                                            value={0}
                                        >
                                            ...
                                        </option>
                                        <option 
                                            value={1}
                                        >
                                            По возрастанию цены
                                        </option>
                                        <option 
                                            value={2}
                                        >
                                            По убыванию цены
                                        </option>
                                    </select>
                                </div>
                                {isAuthenticatedAdmin && 
                                    <div>
                                        <Link to="/create-product">
                                            <div className="btn-add-element">
                                                +
                                            </div>
                                        </Link>
                                    </div>
                                } 
                            </div>
                            <div className="catalog">
                                {catalog && catalog.map((product) => {
                                    return (
                                        <Link key={product.id+new Date()} to={`/catalog/${product.id}`}>
                                            <div className="product">
                                                <button>
                                                    <img className="image" alt={product.name} src={product.src}/>
                                                    <p>{product.name}</p>
                                                    <p>Цена - {product.price}р.</p>
                                                </button>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                        <RightNavbar/>
                    </div>
                </main>
            <Footer/>
        </>
    )
}