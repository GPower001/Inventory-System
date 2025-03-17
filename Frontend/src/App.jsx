import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import SideBar from './components/SideBar'
import Main from './components/Main';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import AddItemPage from './components/AddItemPage';
import MedicationPage from './components/MedicationPage';
import ConsumablePage from './components/ConsumablePage';
import GeneralPage from './components/GeneralPage';

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Header />
      <SideBar/>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path="/Add_Item" element={<AddItemPage />} />  
        <Route path="/medication" element={<MedicationPage />} />
        <Route path="/consumables" element={<ConsumablePage />} />
        <Route path="/Generals" element={<GeneralPage />} />
      </Routes>
      <BackToTop />
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
