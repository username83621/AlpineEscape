
import React, {useContext, useEffect, useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {RefContext} from '../App'
import * as Modals from './FeatureModals'
import '../styles/scrollbar.css'
import '../styles/modal.css'

import AnimatedText from './AnimatedText';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaWifi } from 'react-icons/fa'
import { LuParkingCircle } from 'react-icons/lu'
import { MdElectricCar } from "react-icons/md";
import { FaQuestion } from "react-icons/fa6";

import {useSelector, useDispatch} from 'react-redux'
import { set_featuresText, set_featuresAnimation } from '../redux/global'


const iconSize = '50px'

const featuresData = [
	[
		{name: 'WiFi', icon: <FaWifi size={iconSize} color="black" />, num: 1, modalName: 'wifi'},
		{name: 'Parcare', icon: <LuParkingCircle size={iconSize} color="black" />, num: 2, modalName: 'parking'},
		{name: 'Incarcare EV', icon: <MdElectricCar  size={iconSize} color="black" />, num: 3, modalName: 'ev charging'},

		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 4, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 5, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 6, modalName: ''},

		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 7, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 8, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 9, modalName: ''},
	],
	[
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},

		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},

		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
	],
	[
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},

		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},

		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
		{name: '', icon: <FaQuestion size={iconSize} color="black" />, num: 1, modalName: ''},
	],
]



const Feature = ({panelRef, name, icon, num, modalName}) => {
	const {featuresAnimation} = useSelector((state) => state.global)

	const {setIsModalOpen, featureModalName} = useContext(RefContext)

	useEffect(() => {
		if (!featuresAnimation) return;

    animatePanel()
  }, [featuresAnimation]);


	const animatePanel = () => {
		setTimeout(() => {
			panelRef.current.style.transition = 'none';
			panelRef.current.style.opacity = 0;

			// Force reflow to restart the animation
			const _ = panelRef.current.offsetHeight // Reading this property forces a reflow

			panelRef.current.style.transition = 'opacity 1.0s ease-out';
    	panelRef.current.style.opacity = 1;
		}, 200 * num)
	}


	const handleOnClick = () => {
		featureModalName.current = modalName
		setIsModalOpen(true)
	}

	const handleMouseEnterPanel = () => {
    panelRef.current.style.boxShadow = '0px 0px 3px 3px rgba(0, 0, 0, 0.2)'
    panelRef.current.style.filter = 'brightness(1.0)'
  };

  const handleMouseLeavePanel = () => {
    panelRef.current.style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0.1)'
    panelRef.current.style.filter = 'brightness(0.95)'
  };

	return (
		<div
			ref={panelRef}
			onMouseEnter={handleMouseEnterPanel}
			onMouseLeave={handleMouseLeavePanel}
			onClick={handleOnClick}
			style={{
				display: 'flex', flexDirection: 'column',
				width: 200, height: 200, opacity: 0.0,
				border: '1px solid rgba(0, 0, 0, 0.4)', borderRadius: 10,
				backgroundColor: 'rgb(214, 217, 216)',
				boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.2)',
				alignItems: 'center', justifyContent: 'space-between',
				transition: 'box-shadow 0.3s ease', filter: 'brightness(0.95)'
			}}
		>
			<div style={{marginTop: 50}}>
				{icon}
			</div>

			<h4 style={{fontSize: 20, fontWeight: 600}}>{name}</h4>
		</div>
	)
}


export const Features = ({modalRef, isModalOpen, setIsModalOpen}) => {
	const {featuresText} = useSelector((state) => state.global)
  const dispatch = useDispatch()

	const {mainPanelRef, navbarRef, featuresRef, animateFeatures, disableScrolling} = useContext(RefContext);
	const panelRefs = useRef( [...Array(9)].map(() => React.createRef()) )
	const leftButtonRef = useRef(null)
	const rightButtonRef = useRef(null)
	const [listID, setListId] = useState(0)
	var features = featuresData[listID]


	useEffect(() => {
    const handleAnimation = (entries) => {
			const entry = entries[0];

      if (entry.isIntersecting) {
				dispatch(set_featuresText(true))
				dispatch(set_featuresAnimation(true))

        animateFeatures()

        observer.disconnect(); // Stop observing after the first time
      }
    };

    const observer = new IntersectionObserver(handleAnimation, { threshold: 0.1 });

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => observer.disconnect();
  }, []);


	const handleMouseEnterButton = (buttonRef) => {
    buttonRef.current.style.backgroundColor = 'rgb(255, 255, 255, 1.0)'
  };

  const handleMouseLeaveButton = (buttonRef) => {
    buttonRef.current.style.backgroundColor = 'rgb(255, 255, 255, 0.6)'
  };


	const onButtonClick = (dir) => {
		if (dir === 'left') {
			setListId(prev => prev > 0 ? prev - 1 : prev)
		}
		else {
			setListId(prev => prev < 2 ? prev + 1 : prev)
		}
	}


	return (
		<div
			ref={featuresRef}
			style={{
				width: '90%', position: 'relative', left: 0, top: 0,
				marginBottom: '30vh',
				opacity: 0.0
			}}
		>
			<div
				style={{
					display: 'flex', flexDirection: 'column',
					alignItems: 'center',
					marginBottom: '5vh'
				}}
			>
				<h2 style={{fontFamily: 'Georgia'}}>Facilitati</h2>

				<AnimatedText text={'instructiuni sau detalii'} trigger={featuresText} />
			</div>


			<div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
				<button
					ref={leftButtonRef}
					onMouseEnter={() => handleMouseEnterButton(leftButtonRef)}
					onMouseLeave={() => handleMouseLeaveButton(leftButtonRef)}
					onClick={() => onButtonClick('left')}
					className='scroll-button'
					style={{marginRight: '5vw', opacity: listID > 0 ? 1 : 0, cursor: listID > 0 ? 'pointer' : 'default'}}
				>
					<MdKeyboardArrowLeft size='26px' color='black' />
				</button>
				
				<div style={{width: '100%'}}>
					<div
						style={{
							display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
							backgroundColor: 'rgba(194, 194, 187, 0.0)', marginBottom: '5vw'
						}}
					>
						<Feature panelRef={panelRefs.current[0]} name={features[0].name} icon={features[0].icon} num={features[0].num} modalName={features[0].modalName} />
						<Feature panelRef={panelRefs.current[1]} name={features[1].name} icon={features[1].icon} num={features[1].num} modalName={features[1].modalName} />
						<Feature panelRef={panelRefs.current[2]} name={features[2].name} icon={features[2].icon} num={features[2].num} modalName={features[2].modalName} />
					</div>

					<div
						style={{
							display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
							backgroundColor: 'rgba(194, 194, 187, 0.0)', marginBottom: '5vw'
						}}
					>
						<Feature panelRef={panelRefs.current[3]} name={features[3].name} icon={features[3].icon} num={features[3].num} modalName={features[3].modalName} />
						<Feature panelRef={panelRefs.current[4]} name={features[4].name} icon={features[4].icon} num={features[4].num} modalName={features[4].modalName} />
						<Feature panelRef={panelRefs.current[5]} name={features[5].name} icon={features[5].icon} num={features[5].num} modalName={features[5].modalName} />
					</div>

					<div
						style={{
							display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
							backgroundColor: 'rgba(194, 194, 187, 0.0)', marginBottom: '5vw'
						}}
					>
						<Feature panelRef={panelRefs.current[6]} name={features[6].name} icon={features[6].icon} num={features[6].num} modalName={features[6].modalName} />
						<Feature panelRef={panelRefs.current[7]} name={features[7].name} icon={features[7].icon} num={features[7].num} modalName={features[7].modalName} />
						<Feature panelRef={panelRefs.current[8]} name={features[8].name} icon={features[8].icon} num={features[8].num} modalName={features[8].modalName} />
					</div>
				</div>

				<button
					ref={rightButtonRef}
					onMouseEnter={() => handleMouseEnterButton(rightButtonRef)}
					onMouseLeave={() => handleMouseLeaveButton(rightButtonRef)}
					onClick={() => onButtonClick('right')}
					className='scroll-button'
					style={{marginLeft: '5vw', opacity: listID < 2 ? 1 : 0, cursor: listID < 2 ? 'pointer' : 'default'}}
				>
					<MdKeyboardArrowRight size='26px' color='black' />
				</button>
			</div>
		</div>
	)
}