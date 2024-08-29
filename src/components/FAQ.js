
import React, { useEffect, useState, useRef, useContext } from 'react';

import {RefContext} from '../App'
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import {useSelector, useDispatch} from 'react-redux'
import { set_featuresText } from '../redux/global'


const FAQItem = ({ question, answer, isOpen, onClick, isLast }) => {
  const contentRef = useRef(null);

  return (
    <div>
      <div
        onClick={onClick}
        style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          cursor: 'pointer', fontSize: 18,
          paddingBottom: 15,
          marginLeft: 15, marginRight: 15, marginTop: 15,
        }}
      >
        <h4 style={{ margin: 0 }}>{question}</h4>

        {
        isOpen ?
        <IoIosArrowUp size={20} color={'black'} />
        :
        <IoIosArrowDown size={20} color={'black'} />
        }
      </div>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? contentRef.current.scrollHeight + 'px' : '0px',
          overflow: 'hidden',  fontSize: 16,
          transition: 'max-height 0.3s ease',
          //border: isOpen ? '1px solid rgba(0, 0, 0, 0.5)' : 'none',
          marginLeft: 15, marginRight: 15,
          borderBottom: isLast ? 'none' : '1px solid rgba(0, 0, 0, 0.2)'
        }}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};


export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const {faqRef, animateFaq} = useContext(RefContext);

  const faqData = [
    { question: 'Intrebare 1', answer: 'Raspuns 1' },
    { question: 'Intrebare 2', answer: 'Raspuns 2' },
    { question: 'Intrebare 3', answer: 'Raspuns 3' },
  ];


	useEffect(() => {
    const handleAnimation = (entries) => {
			const entry = entries[0];

      if (entry.isIntersecting) {
        animateFaq()

        observer.disconnect(); // Stop observing after the first time
      }
    };

    const observer = new IntersectionObserver(handleAnimation, { threshold: 0.2 });

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => observer.disconnect();
  }, []);


  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      ref={faqRef}
      style={{
        display: 'flex', flexDirection: 'column', width: '70%',
        alignItems: 'center', justifyContent: 'center',
        marginBottom: '50vh', opacity: 0,
      }}
    >
      <div
				style={{
					display: 'flex', flexDirection: 'column',
					alignItems: 'center',
					marginBottom: '5vh'
				}}
			>
				<h2 style={{fontFamily: 'Georgia'}}>Intrebari frecvente</h2>
			</div>

      <div
        style={{
          display: 'flex',  flexDirection: 'column', width: '100%',
          justifyContent: 'center',
          borderRadius: 10, border: '1px solid rgba(0, 0, 0, 0.5)',
          boxShadow: '0px 0px 2px 2px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgb(214, 217, 216)'
        }}
      >
      {
        faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleClick(index)}
            isLast={index === faqData.length - 1}
          />
        ))
      }
      </div>
    </div>
  );
};
