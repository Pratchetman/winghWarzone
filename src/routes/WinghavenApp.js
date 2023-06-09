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

        </Routes>
        <Footer />
        </BrowserRouter>
    </div>
  )
}
