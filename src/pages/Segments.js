
import {useEffect, useState, useRef} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios';

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const MAPBOX_TOKEN = 'pk.eyJ1IjoiZG9vZ2FsIiwiYSI6ImNrc2E2d2twdjFjbmcydW9jOWhoOWp6aWgifQ._1t0uF-p_PvwXlQl77jVmQ';

const Map = ReactMapboxGl({
  //accessToken: MAPBOX_TOKEN
});


const GetSegments = async (latitude, longitude) => {
	// TODO: add delay between requests

	try {
		const res = await axios.post('http://localhost:5001/segments', {
			coords: {latitude, longitude}
		})
		console.log(res.data)
		return res.data
	}
	catch (error) {
		console.log(error)
		return []
	}
}


const MapComponent = ({setSegments}) => {
	const [viewport, setViewport] = useState({
		latitude: 45.0003442,
		longitude: 24.3867658,
		zoom: 8,
		width: '600px',
		height: '300px'
	});

	useEffect(() => {
		
	}, []);

	const Func = async (coords) => {
		setSegments(await GetSegments(coords.lat, coords.lng))
	}

	const handleOnMove = (map) => {
		const coords = map.getCenter()
		console.log(coords)

		Func(coords)
	}

	return (
		<Map
			style="mapbox://styles/mapbox/streets-v9"
			center={[viewport.longitude, viewport.latitude]}
			containerStyle={{
        width: '70vw',
        height: '50vh'
      }}
			onMove={handleOnMove}
		>
			
		</Map>
	)
};



const Segments = () => {
	return;

	const [segments, setSegments] = useState([])
	const [coords, setCoords] = useState({latitude: 45.0003442, longitude: 24.3867658})

	useEffect(() => {

	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log(coords)
			setSegments(await GetSegments(Number(coords.latitude), Number(coords.longitude)))
		}
		catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<MapComponent setSegments={setSegments} />

			<button onClick={(coords) => GetSegments(Number(coords.latitude), Number(coords.longitude))}>Get Segments</button>

			<form onSubmit={handleSubmit}>
				<input
					value={coords.latitude} // ...force the input's value to match the state variable...
					onChange={ e => setCoords(prev => ({...prev, latitude: e.target.value})) } // ... and update the state variable on any edits!
				/>

				<input
					value={coords.longitude} // ...force the input's value to match the state variable...
					onChange={ e => setCoords(prev => ({...prev, longitude: e.target.value})) } // ... and update the state variable on any edits!
				/>

				<button type="submit">Submit</button>
			</form>

			{
				segments.map((segment, index) => (
					<p key={index}>{segment.Segment}</p>
				))
			}
		</div>
	)
}


export default Segments


