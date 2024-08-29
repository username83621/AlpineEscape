
import '../styles/navbar.css'
import {useContext, useState, useEffect, useReducer, useRef} from 'react'
import {Link} from 'react-router-dom'
import {RefContext} from '../App'
import '../pages/Home'

import {useSelector, useDispatch} from 'react-redux'
import { set_attractionsText } from '../redux/global'


export const NavbarButton = ({name, targetRef, animation, mainPanelRef, navbarRef}) => {
	const buttonRef = useRef(null)

	const onClick = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
			mainPanelRef.current.scrollTop -= navbarRef.current.offsetHeight + 50

			animation()
    }
		else {
			console.log('targetRef undefined')
		}
  };


	const handleMouseEnterPanel = () => {
    buttonRef.current.style.backgroundColor = 'rgba(214, 217, 216, 0.8)'
  };

  const handleMouseLeavePanel = () => {
    buttonRef.current.style.backgroundColor = 'rgba(214, 217, 216, 0.0)'
  };

	return (
		<div style={{marginRight: '3vw'}}>
			<button
				ref={buttonRef}
				onClick={onClick}
				onMouseEnter={handleMouseEnterPanel}
				onMouseLeave={handleMouseLeavePanel}
				style={{
					display: 'flex', alignItems: 'center', justifyContent: 'center',
					borderRadius: '100vw', border: '0px solid #000',
					padding: 10, paddingTop: 5, paddingBottom: 5,
					backgroundColor: 'rgba(214, 217, 216, 0.0)',
				}}
			>
				<span style={{alignSelf: 'center', fontSize: 15, fontWeight: 600, fontFamily: 'Trebuchet MS'}}>
					{name}
				</span>
			</button>
		</div>
	)
}


const Navbar = () => {
	const {navbarRef, mainPanelRef, attractionsRef, featuresRef, mapRef, faqRef} = useContext(RefContext)
	const {animateAttractions, animateFeatures, animateMap, animateFaq} = useContext(RefContext)


	const onClick = () => {
		window.location.reload();
	}

	return (
		<header>
			<div ref={navbarRef} className="navbar">
				<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '2vh'}}>
					<span
						onClick={onClick}
						style={{fontSize: '30px', marginLeft: '12vw', cursor: 'pointer'}}
					>
						Alpine Escape Studio
					</span>

					<a href={'https://cazare-silvermountain.ro/'} target="_blank" rel="noopener noreferrer">
						<span style={{fontSize: '30px', marginRight: '15vw'}}>Silver Mountain Resort</span>
					</a>
				</div>

				<div style={{display: 'flex', flexDirection: 'row', marginLeft: '11.5vw'}}>
					<NavbarButton name={'Atractii Turistice'} targetRef={attractionsRef} animation={animateAttractions} mainPanelRef={mainPanelRef} navbarRef={navbarRef} />
					<NavbarButton name={'Facilitati'} targetRef={featuresRef} animation={animateFeatures} mainPanelRef={mainPanelRef} navbarRef={navbarRef} />
					<NavbarButton name={'Harta'} targetRef={mapRef} animation={animateMap} mainPanelRef={mainPanelRef} navbarRef={navbarRef} />
					<NavbarButton name={'Intrebari frecvente'} targetRef={faqRef} animation={animateFaq} mainPanelRef={mainPanelRef} navbarRef={navbarRef} />
				</div>
			</div>
		</header>
	)
}


export default Navbar
