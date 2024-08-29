
import React, {useContext, useEffect, useState, useRef} from 'react'

import {Link} from 'react-router-dom'
import axios from 'axios';
import {RefContext} from '../App'
import '../styles/scrollbar.css'
import '../styles/modal.css'
import AnimatedText from '../components/AnimatedText'

import {useSelector, useDispatch} from 'react-redux'
import { set_attractionsText } from '../redux/global'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


const WW = 1280
const WH = 700

const urls = [
	'https://www.booking.com/attractions/ro/prcrwwy5kgcb-bran-castle-admission-tickets.ro.html?adplat=www-index-web_shell_header-attraction-missing_creative-3PHJiWw4Kca6CMqg78P647&aid=397594&start_date=2024-08-22&end_date=2024-08-24&source=searchresults-product-card&date=2024-08-22&ufi=900040727&start_time=09%3A00&ticket_type=OFiLFqcMYMoj',
	'https://www.booking.com/attractions/ro/prlltpzfkibk-castles-tours-from-brasov.ro.html?adplat=www-index-web_shell_header-attraction-missing_creative-3PHJiWw4Kca6CMqg78P647&aid=397594&start_date=2024-08-22&end_date=2024-08-24&source=searchresults-product-card&date=2024-08-23&ufi=900040727&start_time=08%3A30',
	'https://www.booking.com/attractions/ro/prsdgle8rpdo-small-group-brown-bear-watching-experience-from-brasov.ro.html?adplat=www-index-web_shell_header-attraction-missing_creative-3PHJiWw4Kca6CMqg78P647&aid=397594&start_date=2024-08-22&end_date=2024-08-24&source=searchresults-product-card&date=2024-08-23&ufi=900040727&start_time=16%3A30&ticket_type=OFWxFVXScjbp',
	'https://www.google.com/',
	'https://www.google.com/',
	'https://www.google.com/'
]



const Attraction = ({name, panelRef, imageSrc, url}) => {
	const {attractionsAnimationFinished} = useContext(RefContext);
	const [isHovered, setIsHovered] = useState(false); // de inlocuit cu useRef
	const imageRef = useRef(null)
	const buttonRef = useRef(null)

	


	useEffect(() => {
    const handleAnimation = (entries) => {
			const entry = entries[0];

      if (entry.isIntersecting) {
				animatePanel()
        //observer.disconnect(); // Stop observing after the first time
      }
			else {
				//panelRef.current.style.transition = 'none';
    		panelRef.current.style.opacity = 0;
			}
    };

    const observer = new IntersectionObserver(
			handleAnimation,
			{
				root: null, // Use the viewport as the container
				rootMargin: '0px', // No margin around the root
				threshold: 0.1, // Trigger when 10% of the div is visible
			}
		);

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    return () => observer.disconnect();
  }, []);


	const animatePanel = () => {
    panelRef.current.style.transition = 'none';
    panelRef.current.style.opacity = 0;

    // Force reflow to restart the animation
    const _ = panelRef.current.offsetHeight // Reading this property forces a reflow

		panelRef.current.style.transition = 'opacity 0.5s ease-out';
    panelRef.current.style.opacity = 1;
	}


  const handleMouseEnterImage = () => {
    imageRef.current.style.transition = 'transform 0.5s ease'
		imageRef.current.style.transform = 'scale(1.2)'
  };

  const handleMouseLeaveImage = () => {
    imageRef.current.style.transition = 'transform 0.5s ease'
		imageRef.current.style.transform = 'scale(1.0)'
  };

	const handleMouseEnterButton = () => {
    buttonRef.current.style.backgroundColor = 'rgb(210, 210, 210)'
  };

  const handleMouseLeaveButton = () => {
    buttonRef.current.style.backgroundColor = 'rgb(194, 194, 187)'
  };

	const handleMouseEnterPanel = () => {
    panelRef.current.style.boxShadow = '0px 0px 3px 3px rgba(0, 0, 0, 0.2)'
		panelRef.current.style.filter = 'brightness(1.0)'
  };

  const handleMouseLeavePanel = () => {
    panelRef.current.style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0.1)'
		panelRef.current.style.filter = 'brightness(0.95)'
  };

	const imageStyle = {
    width: '100%',
    height: '100%',
		paddingBottom: 10,
		objectFit: 'cover',
    //transition: 'transform 0.5s ease',
    //transform: isHovered ? 'scale(1.2)' : 'scale(1)',
  };

	return (
		<div
			id='attraction'
			ref={panelRef}
			onMouseEnter={handleMouseEnterPanel}
			onMouseLeave={handleMouseLeavePanel}
			style={{
				display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
				width: 400, height: 300,
				border: '1px solid rgba(0, 0, 0, 0.4)', borderRadius: 10,
				margin: 10, backgroundColor: 'rgb(214, 217, 216)',
				boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.1)',
				transition: 'box-shadow 0.3s ease', opacity: 0.0, filter: 'brightness(0.95)'
			}}
		>
			<div
				onMouseEnter={handleMouseEnterImage}
				onMouseLeave={handleMouseLeaveImage}
				style={{
					display: 'flex', position: 'relative',
					width: 400, height: 300, overflow: 'hidden', borderRadius: 10,
					borderBottomRightRadius: 0, borderBottomLeftRadius: 0, marginBottom: 10,
					alignItems: 'center', justifyContent: 'center',
				}}
			>
				<div style={{width: '100%', height: '100%',}}>
					<img ref={imageRef} src={imageSrc} style={imageStyle} />
				</div>

				<div style={{display: 'flex', position: 'absolute', alignItems: 'center', justifyContent: 'center'}}>
					<h3 className='attraction-title' style={{whiteSpace: 'pre-line', textAlign: 'center', fontSize: 40, marginBottom: 10, color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'Helvetica'}}>
						{name}
					</h3>
				</div>
			</div>

			<a href={url} target="_blank" rel="noopener noreferrer">
				<button
					ref={buttonRef}
					onMouseEnter={handleMouseEnterButton}
					onMouseLeave={handleMouseLeaveButton}
					style={{
						borderRadius: '100vw', border: '1px solid #000', backgroundColor: 'rgba(194, 194, 187, 0.6)',
						marginBottom: 10, padding: 3, paddingLeft: 10, paddingRight: 10,
						boxShadow: '0px 0px 2px 2px rgba(0, 0, 0, 0.1)'
					}}
				>
					Detalii
				</button>
			</a>
		</div>
	)
}


export const TouristAttractions = () => {
	const {attractionsText} = useSelector((state) => state.global)
  const dispatch = useDispatch()

	const {mainPanelRef, navbarRef, attractionsRef, animateAttractions, attractionsAnimationFinished, disableScrolling} = useContext(RefContext);
	const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const scrollRef = useRef(null);
	const leftButtonRef = useRef(null)
	const rightButtonRef = useRef(null)
	const currentPanelID = useRef(0)
	const panelRefs = useRef( [...Array(6)].map(() => React.createRef()) )
	var scrollPos = []
	

	useEffect(() => {
		console.log(WW, WH)
		attractionsAnimationFinished.current = false

    const handleAnimation = (entries) => {
			const entry = entries[0];

      if (entry.isIntersecting) {
				dispatch(set_attractionsText(true))

        animateAttractions()

        observer.disconnect(); // Stop observing after the first time
				attractionsAnimationFinished.current = true
      }
    };

    const observer = new IntersectionObserver(handleAnimation, { threshold: 0.2 });

    if (attractionsRef.current) {
      observer.observe(attractionsRef.current);
    }

		scrollPos = [200, 600, 1000, 1400, 1800, 2200]
		GetClosestPanel()

		const container = document.querySelector('#attractions-scrollbar');
		container.addEventListener('scroll', onScrollbarMove);

    return () => {
			observer.disconnect();
			container.removeEventListener('scroll', onScrollbarMove)
		}
  }, []);


	function GetClosestPanel() {
		const parentDiv = document.getElementById('attractions-scrollbar');
		const exampleDivs = parentDiv.querySelectorAll('#attraction');

		const positions = [];
		var closest_value = 99999
		var closest_index = 0

		exampleDivs.forEach((div, index) => {
			const rect = div.getBoundingClientRect();
			const pos = rect.left + (400 / 2) /* half width of attraction panel */ + window.scrollX;

			if (Math.abs(WW / 2 - pos) < closest_value) {
				closest_value = Math.abs(WW / 2 - pos)
				currentPanelID.current = index
			}

			if (currentPanelID.current === 1) currentPanelID.current = 0
		});
	}


	function onScrollbarMove() {
		GetClosestPanel()
		console.log(currentPanelID.current)
		console.log(scrollRef.current.scrollLeft)

		if (scrollRef.current.scrollLeft === 0) {
			leftButtonRef.current.style.opacity = 0
			leftButtonRef.current.style.cursor = 'default'
		}
		else {
			leftButtonRef.current.style.opacity = 1
			leftButtonRef.current.style.cursor = 'pointer'
		}
	}


	const onMouseDown = (e) => {
    isDragging.current = true
		scrollRef.current.style.cursor = 'grabbing'

		startX.current = e.pageX
		scrollLeft.current = scrollRef.current.scrollLeft
  };

	const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const walk = (startX.current - e.pageX) * 1.0; // Scroll faster (change multiplier as needed)
    scrollRef.current.scrollLeft = scrollLeft.current + walk

		// Disable pointer events for all images to prevent selection
    scrollRef.current.querySelectorAll('img').forEach(img => {
      img.style.pointerEvents = 'none';
    });
  };

  const onMouseLeave = () => {
    isDragging.current = false
		scrollRef.current.style.cursor = 'grab'

		// Re-enable pointer events for all images
		scrollRef.current.querySelectorAll('img').forEach(img => {
			img.style.pointerEvents = 'auto';
		});
  };

  const onMouseUp = () => {
    isDragging.current = false
		scrollRef.current.style.cursor = 'grab'

		// Re-enable pointer events for all images
		scrollRef.current.querySelectorAll('img').forEach(img => {
			img.style.pointerEvents = 'auto';
		});
  };


	const handleMouseEnterButton = (buttonRef) => {
    buttonRef.current.style.backgroundColor = 'rgb(255, 255, 255, 1.0)'
  };

  const handleMouseLeaveButton = (buttonRef) => {
    buttonRef.current.style.backgroundColor = 'rgb(255, 255, 255, 0.6)'
  };


	const onButtonClick = (dir) => {
		if (dir === 'left') {
			scrollRef.current.scrollLeft -= 600
		}
		else {
			scrollRef.current.scrollLeft += 600
		}
	}


	return (
		<div
			ref={attractionsRef}
			style={{
				width: '90%', opacity: 0.0,
				marginBottom: '20vh',
			}}
		>
			{console.log('Attractions: ', attractionsText)}
			
			<div
				style={{
					display: 'flex', flexDirection: 'column',
					alignItems: 'center',
					marginBottom: '5vh'
				}}
			>
				<h2 style={{fontFamily: 'Georgia'}}>Atractii Turistice</h2>

				<AnimatedText text={'la recomandarea gazdei'} trigger={attractionsText} />
			</div>

		
			<div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
				<button
					ref={leftButtonRef}
					onMouseEnter={() => handleMouseEnterButton(leftButtonRef)}
					onMouseLeave={() => handleMouseLeaveButton(leftButtonRef)}
					onClick={() => onButtonClick('left')}
					className='scroll-button'
					style={{marginRight: '2vw'}}
				>
					<MdKeyboardArrowLeft size='26px' color='black' />
				</button>

				<div
					id='attractions-scrollbar'
					className="custom-scrollbar"
					ref={scrollRef}
					onMouseDown={onMouseDown}
					onMouseLeave={onMouseLeave}
					onMouseUp={onMouseUp}
					onMouseMove={onMouseMove}
					style={{
						display: 'flex', flexDirection: 'row', backgroundColor: 'rgba(194, 194, 187, 0.0)', overflowX: 'scroll',
						cursor: 'grab',
						userSelect: 'none', // Prevent text selection while dragging
					}}
				>
					<Attraction name={'Castelul Bran'} panelRef={panelRefs.current[0]} imageSrc={require('../resources/images/castelul bran.jpg')} url={urls[0]}/>
					<Attraction name={'Turul Castelelor\nBran - Peles'} panelRef={panelRefs.current[1]} imageSrc={require('../resources/images/tur castele.jpg')} url={urls[1]}/>
					<Attraction name={'Brown Bears\nWatching'} panelRef={panelRefs.current[2]} imageSrc={require('../resources/images/brown bears.jpg')} url={urls[2]}/>
					<Attraction name={'titlu'} panelRef={panelRefs.current[3]} imageSrc={require('../resources/images/mountain.jpg')} url={urls[3]}/>
					<Attraction name={'titlu'} panelRef={panelRefs.current[4]} imageSrc={require('../resources/images/mountain.jpg')} url={urls[4]}/>
					<Attraction name={'titlu'} panelRef={panelRefs.current[5]} imageSrc={require('../resources/images/mountain.jpg')} url={urls[5]}/>
				</div>

				<button
					ref={rightButtonRef}
					onMouseEnter={() => handleMouseEnterButton(rightButtonRef)}
					onMouseLeave={() => handleMouseLeaveButton(rightButtonRef)}
					onClick={() => onButtonClick('right')}
					className='scroll-button'
					style={{marginLeft: '2vw'}}
				>
					<MdKeyboardArrowRight size='26px' color='black' />
				</button>
			</div>
		</div>
	)
}
