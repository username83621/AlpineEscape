
import './styles/styles.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

import Home from './pages/Home'
import Navbar from './components/Navbar'


export const RefContext = createContext(null);


const RefProvider = ({ children }) => {
  const mainPanelRef = useRef(null)
  const navbarRef = useRef(null)
  const welcomeRef = useRef(null)
  const attractionsRef = useRef(null);
  const featuresRef = useRef(null);
  const mapRef = useRef(null)
  const faqRef = useRef(null);
  const attractionsAnimationFinished = useRef(false)
  const disableScrolling = useRef(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const featureModalName = useRef(null)
  const attractionsFirstView = useRef(false)
  const featuresFirstView = useRef(false)
  const questionsFirstView = useRef(false)


  const animateWelcome = () => {
    mainPanelRef.current.style.overflow = 'hidden'
		setTimeout(() => mainPanelRef.current.style.overflow = 'auto', 500)

    //welcomeRef.current.scrollIntoView({ behavior: 'smooth' });
		mainPanelRef.current.scrollTop = 0

    welcomeRef.current.style.transition = 'none';
    welcomeRef.current.style.transform = "translateY(20px)"
    welcomeRef.current.style.opacity = 0;

    // Force reflow to restart the animation
    const _ = welcomeRef.current.offsetHeight // Reading this property forces a reflow

		welcomeRef.current.style.transition = 'transform 1.0s ease, opacity 1.0s ease-out';
    welcomeRef.current.style.transform = "translateY(-20px)"
    welcomeRef.current.style.opacity = 1;
  }

  const animateAttractions = () => {
    mainPanelRef.current.style.overflow = 'hidden'
		setTimeout(() => mainPanelRef.current.style.overflow = 'auto', 500)

    attractionsRef.current.scrollIntoView({ behavior: 'smooth' });
		mainPanelRef.current.scrollTop -= navbarRef.current.offsetHeight + 50

    attractionsRef.current.style.transition = 'none';
    attractionsRef.current.style.transform = "translateY(20px)"
    attractionsRef.current.style.opacity = 0;

    // Force reflow to restart the animation
    const _ = attractionsRef.current.offsetHeight // Reading this property forces a reflow

		attractionsRef.current.style.transition = 'transform 1.0s ease, opacity 1.0s ease-out';
    attractionsRef.current.style.transform = "translateY(-20px)"
    attractionsRef.current.style.opacity = 1;
	}

  const animateFeatures = () => {
    mainPanelRef.current.style.overflow = 'hidden'
		setTimeout(() => mainPanelRef.current.style.overflow = 'auto', 500)

    featuresRef.current.scrollIntoView({ behavior: 'smooth' });
		mainPanelRef.current.scrollTop -= navbarRef.current.offsetHeight + 50

    featuresRef.current.style.transition = 'none';
    featuresRef.current.style.transform = "translateY(20px)"
    featuresRef.current.style.opacity = 0;

    // Force reflow to restart the animation
    const _ = featuresRef.current.offsetHeight // Reading this property forces a reflow

		featuresRef.current.style.transition = 'transform 1.0s ease, opacity 1.0s ease-out';
    featuresRef.current.style.transform = "translateY(-20px)"
    featuresRef.current.style.opacity = 1;
	}

  const animateMap = () => {
    mainPanelRef.current.style.overflow = 'hidden'
		setTimeout(() => mainPanelRef.current.style.overflow = 'auto', 500)

    mapRef.current.scrollIntoView({ behavior: 'smooth' });
		mainPanelRef.current.scrollTop -= navbarRef.current.offsetHeight + 50

    mapRef.current.style.transition = 'none';
    mapRef.current.style.transform = "translateY(20px)"
    mapRef.current.style.opacity = 0;

    // Force reflow to restart the animation
    const _ = mapRef.current.offsetHeight // Reading this property forces a reflow

		mapRef.current.style.transition = 'transform 1.0s ease, opacity 1.0s ease-out';
    mapRef.current.style.transform = "translateY(-20px)"
    mapRef.current.style.opacity = 1;
	}

  const animateFaq = () => {
    mainPanelRef.current.style.overflow = 'hidden'
		setTimeout(() => mainPanelRef.current.style.overflow = 'auto', 500)

    faqRef.current.scrollIntoView({ behavior: 'smooth' });
		mainPanelRef.current.scrollTop -= navbarRef.current.offsetHeight + 50

    faqRef.current.style.transition = 'none';
    faqRef.current.style.transform = "translateY(20px)"
    faqRef.current.style.opacity = 0;

    // Force reflow to restart the animation
    const _ = faqRef.current.offsetHeight // Reading this property forces a reflow

		faqRef.current.style.transition = 'transform 1.0s ease, opacity 1.0s ease-out';
    faqRef.current.style.transform = "translateY(-20px)"
    faqRef.current.style.opacity = 1;
	}
 
  const contextValue = {
    mainPanelRef,
    navbarRef,
    welcomeRef,
    attractionsRef,
    featuresRef,
    mapRef,
    faqRef,
    animateWelcome,
    animateAttractions,
    animateFeatures,
    animateMap,
    animateFaq,
    attractionsAnimationFinished,
    disableScrolling,
    isModalOpen,
    setIsModalOpen,
    featureModalName,
    attractionsFirstView,
    featuresFirstView,
    questionsFirstView
  };

  return (
    <RefContext.Provider value={contextValue}>
      {children}
    </RefContext.Provider>
  );
};


function App() {

  return (
    <div className="App">
      <RefProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>
        </BrowserRouter>
      </RefProvider>
    </div>
  );
}

export default App;
