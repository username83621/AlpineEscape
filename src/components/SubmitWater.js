
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

import { set_waters } from '../redux/global'


const SubmitWater = () => {
  const [name, setName] = useState('')
  const [files, setFiles] = useState([])
  const { waters } = useSelector((state) => state.waters)
  const dispatch = useDispatch()

	const [formData, setFormData] = useState({
    name: '',
    coords: [],
    images: []
  })

  useEffect(() => {
    // Cleanup object URLs when the component unmounts
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [files])

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files)

    if (selectedFiles.length + files.length > 5) {
      alert("You can only upload a maximum of 5 images.")
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (files.length === 0) {
      alert("Please select at least one file!")
      return;
    }

    const formData = new FormData()

    formData.append('name', name)

    files.forEach((file, index) => {
      formData.append('images[]', file)
    })

		axios.post('http://localhost:5001/waters/addWater', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
			.then(res => {
        const watersArray = [...waters, res.data]
        dispatch(set_waters(watersArray))

				console.log('new water source added:')
				console.log(res.data)
			})
			.catch(error => {
        dispatch(set_waters([]))
        setFiles([])
				console.log(error)
      })

    // Clear form after submission
    setFormData({
      name: '',
      coords: [],
      images: []
    })
  }

  return (
    <div>
    <form onSubmit={handleSubmit} style={{backgroundColor: 'white', marginTop: '10px', marginBottom: '10px', padding: '10px'}}>
      <div>
				<p style={{margin: 0}}>Name</p>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{marginTop: '10px'}}>
				<p style={{margin: 0}}>Images</p>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          value={formData.images}
          onChange={handleImageChange}
        />

        <div>
          {
          files.map((file, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(file)}
                alt={`preview ${index + 1}`}
                style={{width: '100px', height: '100px', objectFit: 'cover', margin: '5px'}}
              />
            </div>
          ))
          }
        </div>
      </div>

      <button type="submit" style={{marginTop: 10}}>Submit</button>
    </form>
    </div>
  )
}

export default SubmitWater
