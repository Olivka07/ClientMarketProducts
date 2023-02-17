import { createContext, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const CatalogContext = createContext({
    catalog: null,
    products: null,
    categories: null,
    minPrice: 0,
    maxPrice: 100,
    search: null,
    sort: 0,
    updateSearch: () => {},
    updateSort: () => {},
    deleteProduct: () => {},
    updateMaxPrice: () => {},
    updateMinPrice:() => {},
    getProductsFromDB: () => {},
    getCategoriesFromDB: () => {},
    updateCatalog: () => {},
    updateProducts: () => {},
    updateCategories: () => {}
})

export const CatalogState = ({children}) => {
    const {request} = useHttp()
    const message = useMessage()

    const [products, setProducts] = useState(null)
    const [categories, setCategories] = useState(null)
    const [catalog, setCatalog] = useState(null)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(100)
    const [sort, setSort] = useState(0)
    const [search, setSearch] = useState('')

    const updateSort = (e) => {
        setSort(Number(e.target.value))
    }

    const updateSearch = (newSearch) => {
        setSearch(newSearch)
    }

    const updateCategories = async(newNameCategory) => {
        try {
            if (newNameCategory.length<=15 && newNameCategory.length>0) {
                if (categories.find((elem) => {
                    if (elem.name === newNameCategory) {
                        return elem
                    }
                })) {
                    message("Такая категория уже есть")
                } else {
                    const res = await request('/api/categories/add', 'POST', {newNameCategory: newNameCategory})
                    setCategories([...res.categories])
                    message(res.message)
                }
            } else {
                message('Заполните название категории (от 1 до 15 символов)')
            }
        } catch (e) {
            message(e.message)
        }
    }

    const getCategoriesFromDB = async() => {
        try {
            const res = await request('/api/categories/get')
            setCategories(res.categories)
        } catch (e) {
            message(e.message)
        }
    }

    const updateCatalog = (newCatalog) => {
        setCatalog([...newCatalog])
    }

    const updateMinPrice = (value) => {
        setMinPrice(value)
    }

    const updateMaxPrice = (value) => {
        setMaxPrice(value)
    }

    const updateProducts = async(newProduct) => {
        try {
            const res = await request('/api/products/add', 'POST', {newProduct: newProduct})
            setProducts([...res.products])
            setCatalog([...res.products])
            message(res.message)
        } catch (e) {
            message(e.message)
        }
    }

    const deleteProduct = async(idProduct) => {
        try {
            const res = await request('/api/products/delete', 'DELETE', {idProduct: idProduct})
            setProducts([...res.products])
            setCatalog([...res.products])
            message(res.message)
        } catch (e) {
            message(e.message)
        }
    }

    const getProductsFromDB = async() => {
        try {
            const res = await request('/api/products/get')
            setProducts(res.products)
            setCatalog(res.products)

        } catch (e) {
            message(e.message)
        }
    }

    return (
        <CatalogContext.Provider value={{products, categories, catalog, minPrice, maxPrice, sort, search, updateSearch, deleteProduct, updateSort, updateMaxPrice, updateMinPrice, updateCategories, updateProducts, getCategoriesFromDB, getProductsFromDB, updateCatalog}}>
            {children}
        </CatalogContext.Provider>
    )
}