import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "./AuthContext";

const { createContext, useState, useContext } = require("react");

function noop() {}

export const BusketContext = createContext({
    busket: null,
    commission: null,
    updateCommission: noop,
    updateBusket: noop,
    getCommissionFromDb: noop
})

export const BusketState = ({children}) => {
    const [busket, setBusket] = useState([]) // [{name, weight, price}]
    const {request} = useHttp()
    const [commission, setCommission] = useState([])


    const getCommissionFromDb = async(userId) => {
        if (userId!=null) {
            const res = await request('/api/commission/get', 'GET', null, {idUser: userId})
            setCommission([...res.commission])
        } else {
            setCommission([])
        }
    }

    const updateCommission = (newCommission) => {
        setCommission(newCommission)
    }

    const updateBusket = (newBusket) => {
        setBusket(newBusket)
    }
    return (
        <BusketContext.Provider value={{busket, commission,updateCommission,getCommissionFromDb, updateBusket}}>
            {children}
        </BusketContext.Provider>
    )
}