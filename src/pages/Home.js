

// Google Maps API_KEY: AIzaSyB3tqmfd9RAwWAkYBLz1kNjasmPwJs-ApY

import React, {useContext, useEffect, useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {RefContext} from '../App'
import { TouristAttractions } from '../components/Attractions';
import { Features } from '../components/Features';
import { FAQ } from '../components/FAQ'
import { Map } from '../components/Map'
import '../styles/scrollbar.css'
import '../styles/modal.css'

import * as Modals from '../components/FeatureModals'
import AnimatedText from '../components/AnimatedText'

import {useSelector, useDispatch} from 'react-redux'
import { set_welcomeText } from '../redux/global'



const WelcomeMessage = ({message}) => {
	const {welcomeText} = useSelector((state) => state.global)
  const dispatch = useDispatch()

	const {welcomeRef, animateWelcome} = useContext(RefContext);


	useEffect(() => {
    const handleAnimation = (entries) => {
			const entry = entries[0];

      if (entry.isIntersecting) {
				dispatch(set_welcomeText(true))

        animateWelcome()

        observer.disconnect(); // Stop observing after the first time
      }
    };

    const observer = new IntersectionObserver(handleAnimation, { threshold: 0.2 });

    if (welcomeRef.current) {
      observer.observe(welcomeRef.current);
    }

    return () => observer.disconnect();
  }, []);


	return (
		<div
			ref={welcomeRef}
			style={{
				display: 'flex', flexDirection: 'column',
				alignItems: 'center',
				width: '80%', opacity: 0.0,
				paddingTop: '20vh', marginBottom: '50vh'
			}}
		>
			<h2>
				Bine ati venit la Alpine Escape Studio
			</h2>

			<AnimatedText text={'va dorim sa aveti un sejur placut'} trigger={welcomeText} />
		</div>
	)
}


const Home = () => {
	const {mainPanelRef} = useContext(RefContext)


	return (
		<div
			style={{
				display: 'flex', position: 'fixed', width: '100vw', height: '100vh',
				justifyContent: 'center', backgroundImage: 'url(images/bg.jpg)',
				backgroundSize: "cover", backgroundRepeat: "no-repeat",
			}}
		>
			<div
				ref={mainPanelRef}
				className="custom-scrollbar"
				style={{
					display: 'flex', flexDirection: 'column',
					width: '75vw', borderLeft: '1px solid #000', borderRight: '1px solid #000',
					boxShadow: '0px 0px 3px 3px rgba(0, 0, 0, 0.2)',
					backgroundColor: 'rgba(137, 163, 155, 0.8)', overflowY: 'scroll', paddingTop: '25vh',
					alignItems: 'center'
				}}
			>
				<WelcomeMessage />
				<TouristAttractions />
				<Features />
				<Map />
				<FAQ />

				<Modals.ModalLayout />
			</div>
		</div>
	)
}


export default Home
