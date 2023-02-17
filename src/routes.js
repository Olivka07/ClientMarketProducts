import React from "react"
import {Routes, Route, Navigate} from 'react-router-dom'
import { CreatingProductPage } from "./pages/CreatingProductPage"
import { MainPage } from "./pages/MainPage"
import { ProductPage } from "./pages/ProductPage"
import { AboutCompanyPage } from "./pages/AboutCompanyPage"
import { BusketPage } from "./pages/BusketPage"
import { CommissionPage } from "./pages/CommissionPage"
import { CommissionBusketPage } from "./pages/CommissionBusketPage"

export const useRoutes = (isAuthenticatedAdmin, isAuthenticatedClient) => {
    if (isAuthenticatedClient) {
        return (
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/catalog" element={<MainPage/>}/>
                <Route path="/catalog/:id" element={<ProductPage/>}/>
                <Route path="/about" element={<AboutCompanyPage/>}/>
                <Route path="/busket" element={<BusketPage/>}/>
                <Route path="/commission" element={<CommissionPage/>}/>
                <Route path="/commission/:id" element={<CommissionBusketPage/>}/>
            </Routes>
        )
    }

    if (isAuthenticatedAdmin) {
        return (
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/catalog" element={<MainPage/>}/>
                <Route path="/create-product" element={<CreatingProductPage/>}/>
                <Route path="/catalog/:id" element={<ProductPage/>}/>
                <Route path="/about" element={<AboutCompanyPage/>}/>
                <Route path="/busket" element={<BusketPage/>}/>
                <Route path="/commission" element={<CommissionPage/>}/>
                <Route path="/commission/:id" element={<CommissionBusketPage/>}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/catalog" element={<MainPage/>}/>
            <Route path="/catalog/:id" element={<ProductPage/>}/>
            <Route path="/about" element={<AboutCompanyPage/>}/>
            <Route path="/busket" element={<BusketPage/>}/>
            <Route path="/commission" element={<CommissionPage/>}/>
            <Route path="*"  element={<Navigate to="/"/>}/>
        </Routes>
    )
}