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
import  {Error}  from '../components/Error';
import { CompleteCountdown } from '../components/countdown/CompleteCountdown';

import './winghavenApp.scss';

export const WinghavenApp = () => {

  const DATE_TARGET = new Date('11/11/2023 0:01 AM');
  const now = new Date();
  return (
    <div className="app-container">
    <BrowserRouter>
      {DATE_TARGET < now ? <NavB /> : null}
      {/* Video de fondo */}
      
      <video className="background-video" autoPlay loop muted>
        <source src="videos/video_small.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
      

      <Routes>
        {DATE_TARGET < now ? (
          <>
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
          </>
        ) : (
          <>
            <Route path="/" element={<CompleteCountdown DATE_TARGET={DATE_TARGET} />} />
            <Route path="/*" element={<CompleteCountdown DATE_TARGET={DATE_TARGET} />} />
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
  )
}
