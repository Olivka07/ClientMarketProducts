import { useContext, useEffect, useState } from "react"
import {CatalogContext} from '../context/CatalogContext'
import { useHttp } from "../hooks/http.hook"
import { ProductInCategoryLeft } from "./ProductInCategoryLeft"

export const LeftNavbar = () => {

    const {
        categories, 
        products,
        catalog,
        search,
        minPrice, 
        maxPrice, 
        sort,
        updateCatalog,
        getCategoriesFromDB, 
        getProductsFromDB, 
        updateMaxPrice,
        updateMinPrice,
    } = useContext(CatalogContext)

    const {request} = useHttp()

    const [checkboxes, setCheckboxes] = useState(null)

    useEffect(() => {
        const funcDB = async() => {
            getCategoriesFromDB()
            getProductsFromDB()
        }
        funcDB()
    }, [])

    useEffect(() => {
        if (products && products.length>0) {
            let min = products[0].price
            let max = products[0].price
            products.forEach(element => {
                if(element.price < min) {
                    min = element.price
                }
                if (element.price > max) {
                    max = element.price
                }
            })
            updateMinPrice(min)
            updateMaxPrice(max)
        }
    }, [products])

    useEffect(() => {
        if (categories) {
            setCheckboxes(categories.map((elem) => {
                const checkBox = {}
                checkBox.id = elem.id
                checkBox.key = true
                return checkBox
            }))
        }
    }, [categories])

    useEffect(() => {
        // if (products) {
        //     if (sort === 1) {
        //         updateCatalog((products.filter((elem) => {
        //             if (Number(elem.price)<=Number(maxPrice) && Number(elem.price)>=Number(minPrice)&& checkboxes && checkboxes.find((data)=>{
        //                 if (Number(elem.idCategory) === data.id) {
        //                     return data
        //                 }
        //             }).key && (elem.name.toLowerCase()).indexOf(search.toLowerCase()) === 0) {
        //                 return elem
        //             }
        //         })).sort((a, b) => {
        //             if (a.price > b.price) {
        //                 return 1
        //             }
        //             if (a.price < b.price) {
        //                 return -1
        //             } 
        //             return 0
        //         }))
        //     } else if (sort === 2) {
        //         updateCatalog((products.filter((elem) => {
        //             if (Number(elem.price)<=Number(maxPrice) && Number(elem.price)>=Number(minPrice)&& checkboxes && checkboxes.find((data)=>{
        //                 if (Number(elem.idCategory) === data.id) {
        //                     return data
        //                 }
        //             }).key && (elem.name.toLowerCase()).indexOf(search.toLowerCase()) === 0) {
        //                 return elem
        //             }
        //         })).sort((a, b) => {
        //             if (a.price > b.price) {
        //                 return -1
        //             }
        //             if (a.price < b.price) {
        //                 return 1
        //             } 
        //             return 0
        //         }))
        //     } else {
        //         updateCatalog(products.filter((elem) => {
        //             if (Number(elem.price)<=Number(maxPrice) && Number(elem.price)>=Number(minPrice) && checkboxes && checkboxes.find((data)=>{
        //                 if (Number(elem.idCategory) === data.id) {
        //                     return data
        //                 }
        //             }).key && (elem.name.toLowerCase()).indexOf(search.toLowerCase()) === 0) {
        //                 return elem
        //             }
        //         }))
        //     }
            
        // }
    }, [minPrice, maxPrice, checkboxes, search])

    const setFilter = async(minprice, maxprice, idcategorys) => {
        try {
            const res = await request('/api/products/filter', 'POST', {minprice, maxprice, idcategorys})
            return res.cat
        }
        catch (e) {
            return []
        }
    }

    const acceptFliter = async() => {
        const sorting = Number(document.getElementById('sel').value)
        console.log(sorting)
        if (products) {
            console.log(products)
            if (sorting === 1) {
                // updateCatalog((products.filter((elem) => {
                //     if (Number(elem.price)<=Number(maxPrice) && Number(elem.price)>=Number(minPrice)&& checkboxes && checkboxes.find((data)=>{
                //         if (Number(elem.idCategory) === data.id) {
                //             return data
                //         }
                //     }).key && (elem.name.toLowerCase()).indexOf(search.toLowerCase()) === 0) {
                //         return elem
                //     }
                // })).sort((a, b) => {
                //     if (a.price > b.price) {
                //         return 1
                //     }
                //     if (a.price < b.price) {
                //         return -1
                //     } 
                //     return 0
                // }))
                const d = await setFilter(minPrice, maxPrice, checkboxes)
                console.log(d)
                updateCatalog(d.sort((a, b) => {
                    if (a.price > b.price) {
                        return 1
                    }
                    if (a.price < b.price) {
                        return -1
                    } 
                    return 0
                }))
            } else if (sorting === 2) {
                // updateCatalog((products.filter((elem) => {
                //     if (Number(elem.price)<=Number(maxPrice) && Number(elem.price)>=Number(minPrice)&& checkboxes && checkboxes.find((data)=>{
                //         if (Number(elem.idCategory) === data.id) {
                //             return data
                //         }
                //     }).key && (elem.name.toLowerCase()).indexOf(search.toLowerCase()) === 0) {
                //         return elem
                //     }
                // })).sort((a, b) => {
                //     if (a.price > b.price) {
                //         return -1
                //     }
                //     if (a.price < b.price) {
                //         return 1
                //     } 
                //     return 0
                // }))
                const d = await setFilter(minPrice, maxPrice, checkboxes)
                console.log(d)
                updateCatalog(d.sort((a, b) => {
                    if (a.price > b.price) {
                        return -1
                    }
                    if (a.price < b.price) {
                        return 1
                    } 
                    return 0
                }))
            } else {
                // updateCatalog(products.filter((elem) => {
                //     if (Number(elem.price)<=Number(maxPrice) && Number(elem.price)>=Number(minPrice) && checkboxes && checkboxes.find((data)=>{
                //         if (Number(elem.idCategory) === data.id) {
                //             return data
                //         }
                //     }).key && (elem.name.toLowerCase()).indexOf(search.toLowerCase()) === 0) {
                //         return elem
                //     }
                // }))
                const d = await setFilter(minPrice, maxPrice, checkboxes)
                console.log(d)
                updateCatalog(d)
            }
            
        }
    }

    const changeCheckBox = (event, categ) => {
        if (event.target.checked) {
            setCheckboxes(checkboxes.map((data) => {
                if (data.id === categ.id) {
                    data.key = true
                }
                return data
            }))
        } else {
            setCheckboxes(checkboxes.map((data) => {
                if (data.id === categ.id) {
                    data.key = false
                }
                return data
            }))
        }
    }

    

    return (
        <div className="leftNavbar">

            {categories && categories.map((element) => {
                    return (
                        <div key={new Date()+element.name} className="main_category" >
                            <div className="category" >
                                <div className="category_href">
                                    <p>{element.name}</p>
                                </div>
                            </div>
                            <ul className="list_undercategory">
                                <ProductInCategoryLeft idCategory={element.id}/>
                            </ul>
                        </div>
                    )
                })
            }

            <div className="range_input">
                <p>Цена: </p>
                <label htmlFor="min">От: </label>
                <input 
                    name="min" 
                    id="min" 
                    type="number" 
                    value={minPrice}
                    min={0}
                    onChange={e => updateMinPrice(e.target.value)}
                />
                <label htmlFor="max">До: </label>
                <input 
                    name="max" 
                    id="max" 
                    type="number" 
                    value={maxPrice}
                    onChange={e => updateMaxPrice(e.target.value)}
                />
            </div>

            <div className="checkboxes">
                {categories && checkboxes && categories.map((elem) => {
                    return (
                        <div key={elem.id+elem.name}>
                            <label htmlFor={elem.name}>{elem.name+':'}</label>
                            <input 
                                checked={checkboxes.find((d) => {
                                    if (d.id === elem.id) {
                                        return d
                                    }
                                }).key} 
                                name={elem.name}
                                type="checkbox"
                                onChange={e => changeCheckBox(e, elem)}
                            />
                        </div>
                    )
                })}
            </div>

            <button 
                className="btn-filtr"
                onClick={e => acceptFliter()}
            >
                Применить
            </button>
        </div>
    )
}