import React from 'react'
import { NavB } from '../components/nav/NavB'


import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { Main } from '../components/main/Main.js';
import { About } from '../components/about/About.js';
import { Rrss } from '../components/rrss/Rrss.js';
import { Memes } from '../components/memes/Memes.js';
import { Setup } from '../components/setup/Setup.js';
import { Wz1 } from '../components/weapons/wz1/Wz1.js';
import { Wz2 } from '../components/weapons/wz2/Wz2.js';
import { Footer } from '../components/footer/Footer';
import { OneWz2 } from '../components/weapons/wz2/OneWz2';
import { OneWz1 } from '../components/weapons/wz1/OneWz1';
import { Error } from '../components/Error';


export const WinghavenApp = () => {
  return (
    <div>
       
        <BrowserRouter>
        <NavB />
        <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/about" element={<About />} />
        <Route path="/memes" element={<Memes />} />
        <Route path="/rrss" element={<Rrss />} />
        <Route path="/wz1" element={<Wz1 />} />
        <Route path="/wz2" element={<Wz2 />} />
        <Route path="/wz2/:wz2_id" element={<OneWz2 />} />
        <Route path="/wz1/:wz1_id" element={<OneWz1 />} />
        <Route path="/*" element={<Error />} />
       
        </Routes>
        <Footer />
        </BrowserRouter>
    </div>
  )
}
