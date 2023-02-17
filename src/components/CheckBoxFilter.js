import { useContext, useEffect, useRef, useState } from "react"
import { CatalogContext } from "../context/CatalogContext"

export const CheckBoxFilter = ({categ}) => {
    const value = useRef(true)
    const [check, setCheck] = useState(true)
    const {catalog, updateCatalog, products} = useContext(CatalogContext)

 
   
    const changeCheckBox = () => {
        if (value.current) {
            value.current = false
            setCheck(false)
            const vedProducts = [...products].filter((el) => {
                if (Number(el.idCategory) !== Number(categ.id)) {
                    return el
                }
            })
            updateCatalog(vedProducts)
            console.log('cat',catalog)
        } else {
            setCheck(true)
            value.current = true
            console.log('NO')
        }
    }
    return (
        <div key={categ.id+categ.name}>
            <label htmlFor={categ.name}>{categ.name+':'}</label>
            <input 
                checked={check} 
                name={categ.name}
                type="checkbox"
                onChange={e => changeCheckBox()}
            />
        </div>
    )
}