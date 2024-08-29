
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios';

import { set_waters } from '../redux/global'
import SubmitWater from '../components/SubmitWater'


const Waters = () => {
	const { waters } = useSelector((state) => state.waters)
  const dispatch = useDispatch()

	const getWaters = async () => {
		try {
			const res = await axios.get('http://localhost:5001/waters/')

			console.log(res.data)

			dispatch(set_waters(res.data))
			console.log(res.data)
		}
		catch (error) {
			dispatch(set_waters([]))
			console.log(error)
		}
	}

	const getSegments = async () => {
		try {
			const res = await axios.get('http://localhost:5001/waters/segments/')

			console.log(res.data)
		}
		catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {

	}, [])

	const deleteWater = (id) => {
    axios.delete('http://localhost:5001/waters/deleteWater/' + id)
    .then(res => {
			getWaters()

      console.log('water source deleted:')
      console.log(res.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

	const DisplayWater = ({water, index}) => {
		return (
			<>
			<div>
				<p>{water.name}</p>
			</div>

			<div style={{display: 'flex', flexDirection: 'row', padding: 10, overflowX: 'auto'}}>
				{
				water.images.map((image, index) => (
					<div key={water.name + ' image ' + index}>
						<img
							src={image}
							style={{width: '100px', height: '100px', objectFit: 'cover', margin: '5px'}}
						/>
					</div>
				))
				}
			</div>

			<button onClick={() => deleteWater(water._id)}>delete</button>
			</>
		)
	}

	return (
		<div>
			<h2>Waters Page</h2>

			<div>
				<button onClick={getSegments}>Show Strava Segments</button>
			</div>

			<div>
				<button onClick={getWaters}>Show Waters</button>
			</div>

			<div>
				{
				waters.map((water, index) => (
					<div key={water._id}>
						<DisplayWater water={water} index={index} />
					</div>
				))
				}
			</div>

			<SubmitWater />
		</div>
	)
}

export default Waters
