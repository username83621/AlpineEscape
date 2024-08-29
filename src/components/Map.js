
import React, {useContext, useEffect, useState, useRef} from 'react'
import {RefContext} from '../App'


export const Map = () => {
	const {mapRef, animateMap} = useContext(RefContext);


	useEffect(() => {
    const handleAnimation = (entries) => {
			const entry = entries[0];

      if (entry.isIntersecting) {
        animateMap()

        observer.disconnect(); // Stop observing after the first time
      }
    };

    const observer = new IntersectionObserver(handleAnimation, { threshold: 0.2 });

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);


	return (
		<div ref={mapRef} style={{ width: '100%', height: '500', marginBottom: '20vh', opacity: 0 }}>
			<div style={{display: 'flex', justifyContent: 'center', marginBottom: '5vh'}}>
				<h2 style={{fontFamily: 'Georgia'}}>Harta Interactiva</h2>
			</div>

      <iframe
        title="google-map"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d18569.902502691573!2d24.375732508647562!3d45.1002188168874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sro!4v1723630546901!5m2!1sen!2sro"
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      />
    </div>
	)
}