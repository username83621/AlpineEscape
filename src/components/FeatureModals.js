
import '../styles/scrollbar.css'
import '../styles/modal.css'
import React, {useContext, useEffect, useState, useRef} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {RefContext} from '../App'



const Wifi = () => {
  return (
    <>
      <h3>WiFi</h3>
      <p>Parola este</p>
    </>
  )
}


const Parking = () => {
  return (
    <>
      <h3>Parcare</h3>
      <p></p>
    </>
  )
}


const EVCharging = () => {
  return (
    <>
      <h3>Incarcare EV</h3>
      <p></p>
    </>
  )
}


export const ModalLayout = () => {
  const {isModalOpen, setIsModalOpen, featureModalName} = useContext(RefContext)
  const modalRef = useRef(null)
  const buttonRef = useRef(null)


  if (!isModalOpen) return null; // If the modal is not open, return null to render nothing


  const DisplayModal = () => {
    switch (featureModalName.current) {
			case 'wifi':
				modalRef.current = Wifi
				break
			case 'parking':
				modalRef.current = Parking
				break
			case 'ev charging':
				modalRef.current = EVCharging
				break
			default:
        modalRef.current = null
				console.log('modal not found')
		}

    if (!modalRef.current) return null

    return <modalRef.current />
  }


  const handleMouseEnterButton = () => {
    buttonRef.current.style.backgroundColor = 'rgb(210, 210, 210)'
  };

  const handleMouseLeaveButton = () => {
    buttonRef.current.style.backgroundColor = 'rgb(194, 194, 187)'
  };


  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex', flexDirection: 'column', overflowY: 'scroll',
          width: 600, height: 400, position: 'absolute', top: '15vh',
        }}
      >
        <button className="modal-close" onClick={closeModal}>
          &times;
        </button>

        <DisplayModal />


        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <button
            ref={buttonRef}
            onClick={closeModal}
            onMouseEnter={handleMouseEnterButton}
					  onMouseLeave={handleMouseLeaveButton}
            style={{
              position: 'absolute', bottom: 0,
              borderRadius: '100vw', border: '1px solid #000', backgroundColor: 'rgba(194, 194, 187, 0.6)',
              marginBottom: 10, padding: 3, paddingLeft: 10, paddingRight: 10,
              boxShadow: '0px 0px 2px 2px rgba(0, 0, 0, 0.1)', cursor: 'pointer'
            }}
          >
            Inchide
          </button>
        </div>
      </div>
    </div>
  );
};
