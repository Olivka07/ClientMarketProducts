import { useContext } from "react"
import {Link} from 'react-router-dom'
import { CatalogContext } from "../context/CatalogContext"

export const ProductInCategoryLeft = ({idCategory}) => {
    const {products} = useContext(CatalogContext)
    return (
        <>
            {products && products.map(element => {
                if(element.idCategory === idCategory) {
                    return (
                        <li key={element.idCategory+element.name}>
                            <Link to="/" element={element}>
                                <button>
                                    {element.name}
                                </button>
                            </Link>
                        </li>
                    )
                }
            })}
        </>
    )
}