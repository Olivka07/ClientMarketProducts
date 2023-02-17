import { useContext, useEffect, useRef, useState } from "react"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { LeftNavbar } from "../components/LeftNavbar"
import { RightNavbar } from "../components/RightNavbar"
import { CatalogContext } from "../context/CatalogContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const CreatingProductPage = () => {
    const message = useMessage()
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [weight, setWeight] = useState(0)
    const [price, setPrice] = useState(0)
    const [categ, setCateg] = useState(0)
    const [src, setSrc] = useState('')
    const fileInput = useRef('')
    const {categories, updateProducts} = useContext(CatalogContext)


    useEffect(() => {
        resetProperties()
    }, [])
        
    const resetProperties = () => {
        setName('')
        setDesc('')
        setWeight(0)
        setPrice(0)
        setCateg(0)
        setSrc('')
        if (fileInput && fileInput.current) {
            fileInput.current.value = null
        }
    }
        
    const fileHandler = () => {
        // const file = fileInput.current.files[0]
        // if (file) {
        //     const reader = new FileReader()
        //     reader.addEventListener("load", () => {
        //         let path = reader.result // path - то, что хранится в БД
        //         setSrc(path)
        //     })
        //     reader.readAsDataURL(file)
        // } else {
        //     setSrc('')
        // }
        const file = fileInput.current.files[0]
        if (file) {
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                let path = reader.result // path - то, что хранится в БД
                const image = new Image()
                image.src = path

                image.onload = function() {
                    setSrc(path)
                }
                image.onerror = function() {
                    setSrc('')
                    fileInput.current.value = null
                    alert('Некорректное содержимое файла картинки')
                }
            })
            reader.readAsDataURL(file)
        }
    }
        
    const clickAddNewItem = () => {
        if (name.split(' ').join('').length===0) {
            message('Наименование товара не заполнено')
        } else if (categ===0) {
            message('Категория товара не выбрана')
        } else if (weight === 0 || weight < 0) {
            message('Вес товара не задан')
        } else if (price === 0 || price < 0) {
            message('Цена товара не задана')
        } else if (src.length===0) {
            message('Изображение продукта не задано')
        } else {
            const newProduct = {}
            newProduct.name = name
            if (desc.split(' ').join('').length === 0) {
                newProduct.description = null
            } else {
                newProduct.description = desc
            }
            newProduct.idCategory = categ
            newProduct.weight = weight
            newProduct.price = price
            newProduct.src = src
            resetProperties()
            updateProducts(newProduct)
        }
    }
    
    
    return (
        <>
            <Header/>
            <main className="window">
                <div className="full_content">
                    <LeftNavbar/>
                    <div className="container">
                        <p>Добавить новый продукт</p>
                        <div className="main_container">
                            <div className="form-group">
                                <label htmlFor="name">Название продукта: </label>
                                <input 
                                    id="name" 
                                    name="name" 
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="select_categ">Выберите категорию товара</label>
                                <select 
                                    id="select" 
                                    name="select_categ"
                                    value={categ}
                                    onChange={e => setCateg(Number(e.target.value))}
                                >
                                    <option value={0}>
                                        ...
                                    </option>
                                    {categories && categories.map((d) => {
                                        return (
                                            <option key={d.id+new Date()} value={d.id}>
                                                {d.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="weight">Вес продукта: </label>
                                <input 
                                    id="weight" 
                                    name="weight" 
                                    type="number"
                                    value={weight}
                                    onChange={e => setWeight(Number(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Цена продукта: </label>
                                <input 
                                    id="price" 
                                    name="price" 
                                    type="number" 
                                    value={price}
                                    onChange={e => setPrice(Number(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="desc">Описание продукта</label>
                                <textarea 
                                    id="desc" 
                                    name="desc" 
                                    cols="30" 
                                    rows="10"
                                    value={desc}
                                    onChange={e => setDesc(e.target.value)}
                                >
                                </textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="input_image">Выберите изображение</label>
                                <input 
                                    name="input_image" 
                                    id="input_image" 
                                    type="file" 
                                    accept=".jpg, .jpeg, .png"
                                    ref={fileInput}
                                    onChange={e => fileHandler(e)}
                                />
                            </div>
                            <button id="butt_add" onClick={clickAddNewItem}>Добавить</button>
                        </div>
                    </div>
                    <RightNavbar/>
                </div>
            </main>
            <Footer/>
        </>
    )
}