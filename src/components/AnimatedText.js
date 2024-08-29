
import React, {useContext, useEffect, useState, useRef} from 'react'

import {useSelector, useDispatch} from 'react-redux'
import { set_attractionsText } from '../redux/global'


const AnimatedText = ({text, trigger}) => {
  const [textIndex, setTextIndex] = useState(0)
	const displayedText = useRef('')


  useEffect(() => {
		if (!trigger) return;
		if (textIndex === text.length) return;

		setTimeout(() => {
			displayedText.current = text.slice(0, textIndex + 1)
			setTextIndex(prev => prev + 1)
		}, textIndex === 0 ? 500 : 40)
	}, [textIndex])


	useEffect(() => {
		setTextIndex(prev => prev + 1)
	}, [trigger])


  return (
    <p style={{fontSize: 20, marginTop: '-1vh'}}>
			{displayedText.current}
		</p>
  )
}


export default AnimatedText;