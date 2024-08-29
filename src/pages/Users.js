
import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useState} from 'react'
import axios from 'axios';

import { set_friends, set_requests, set_receivedRequests } from '../redux/friends'


async function GetUserInfo(id) {
	try {
		const res = await axios.get('http://localhost:5001/auth/getUserInfo/' + id, {
			headers: {
				'x-auth-token': localStorage.getItem('token')
			}
		});

		//console.log('user info:', res.data)
		return res.data
	} catch (err) {
		console.error(err.response.data)
		return null
	}
}

async function GetUsersList() {
	try {
		const res = await axios.get('http://localhost:5001/auth/users', {
			headers: {
				'x-auth-token': localStorage.getItem('token')
			}
		});

		console.log('user ids:', res.data)
		return res.data
	} catch (err) {
		console.error(err)
		return []
	}
}

async function GetFriendsList(friends, dispatch) {
	try {
		const res = await axios.get('http://localhost:5001/friends', {
			headers: {
				'x-auth-token': localStorage.getItem('token')
			}
		});

		dispatch(set_friends(res.data.friends))
		return res.data.friends
	} catch (err) {
		dispatch(set_friends([]))
		console.error(err.response.data);
		return []
	}
}

async function GetRequestsList(requests, dispatch) {
	try {
		const res = await axios.get('http://localhost:5001/friends/requests', {
			headers: {
				'x-auth-token': localStorage.getItem('token')
			}
		});

		dispatch(set_requests(res.data.requests))
		return res.data.requests
	} catch (err) {
		dispatch(set_requests([]))
		console.error(err.response.data)
		return []
	}
}

async function GetReceivedRequestsList(receivedRequests, dispatch) {
	try {
		const res = await axios.get('http://localhost:5001/friends/receivedRequests', {
			headers: {
				'x-auth-token': localStorage.getItem('token')
			}
		});

		dispatch(set_receivedRequests(res.data.receivedRequests))
		return res.data.receivedRequests
	} catch (err) {
		dispatch(set_receivedRequests([]))
		console.error(err.response.data)
		return []
	}
}

async function GetUsersInfo(user_ids) {
	var usersInfo = []

	for (let user_id of user_ids) {
		usersInfo.push(await GetUserInfo(user_id))
	}

	return usersInfo
}


const Users = () => {
	const [showList, setShowList] = useState('')
	const [usersInfo, setUsersInfo] = useState([])
	const { userID } = useSelector((state) => state.user)
	const { friends, requests, receivedRequests } = useSelector((state) => state.friends)
  const dispatch = useDispatch()


	useEffect(() => {
		GetFriendsList(friends, dispatch)
		GetRequestsList(requests, dispatch)
		GetReceivedRequestsList(receivedRequests, dispatch)

		setShowList(false)
	}, [])

	const handleShowUsersButton = async () => {
    try {
			const user_ids = await GetUsersList()
			const usersInfo_ = await GetUsersInfo(user_ids)
			await GetFriendsList(friends, dispatch)
			await GetRequestsList(requests, dispatch)
			await GetReceivedRequestsList(receivedRequests, dispatch)

			setUsersInfo(usersInfo_)
			setShowList('users')
		} catch (err) {
			setUsersInfo([])
			setShowList('')
			console.error(err);
		}
  }

	const handleShowFriendsButton = async () => {
    try {
			const user_ids = await GetFriendsList(friends, dispatch)
			const usersInfo_ = await GetUsersInfo(user_ids)

			setUsersInfo(usersInfo_)
			setShowList('friends')
			console.log(usersInfo_)
		} catch (err) {
			setUsersInfo([])
			setShowList('')
			console.error(err);
		}
  }

	const handleShowReceivedRequestsButton = async () => {
    try {
			const user_ids = await GetReceivedRequestsList(receivedRequests, dispatch)
			const usersInfo_ = await GetUsersInfo(user_ids)

			setUsersInfo(usersInfo_)
			setShowList('received requests')
			//console.log(res.data.list)
		} catch (err) {
			setUsersInfo([])
			setShowList('')
			console.error(err);
		}
  }

	const handleSendFriendRequest = async (user_id) => {
    try {
			const res = await axios.post('http://localhost:5001/friends/request',
				{
					id: user_id
				},
				{
					headers: {
						'x-auth-token': localStorage.getItem('token')
					}
				}
			);

			dispatch(set_requests(res.data.requests))
			//console.log(res.data.requests)
		} catch (err) {
			console.error(err)
		}
  }

	const FriendRequest = ({id}) => {
		if (requests.includes(id)) {
			return (
				<p>friend request sent</p>
			)
		}

		if (receivedRequests.includes(id)) {
			return (
				<p>friend request received</p>
			)
		}

		return (
			<button onClick={() => handleSendFriendRequest(id)}>send friend request</button>
		)
	}

	const ShowUser = ({user}) => {
		return (
			<>
				<p>ID: {user._id}</p>
				<p>Name: {user.name}</p>
				<p>Email: {user.email}</p>
				<p>Role: {user.role}</p>
			</>
		)
	}

	const ShowUsers = ({users}) => {
		return (
			<div>
				<h3>Users List</h3>

				{
				users.map((item, index) => (
					item._id !== userID &&
					!friends.includes(item._id) &&
					<div key={index} style={{backgroundColor: 'white', padding: 10, marginTop: 10}}>
						<ShowUser user={item} />
						<FriendRequest id={item._id} />
					</div>
				))
				}
			</div>
		)
	}

	const ShowFriends = ({users}) => {
		const handleButton = async (user_id, answer) => {
			try {
				const res = await axios.post('http://localhost:5001/friends/removeFriend',
					{
						user_id: user_id
					},
					{
						headers: {
							'x-auth-token': localStorage.getItem('token')
						}
					}
				);
	
				dispatch(set_friends(res.data.friends))

				const usersInfo_ = await GetUsersInfo(res.data.friends)
				setUsersInfo(usersInfo_)
			} catch (err) {
				console.error(err);
			}
		}

		return (
			<div>
				<h3>Friends List</h3>
			
				{
				users.map((item, index) => (
					<div key={index} style={{backgroundColor: 'white', padding: 10, marginTop: 10}}>
						<ShowUser user={item} />

						<button onClick={() => handleButton(item._id)}>remove</button>
					</div>
				))
				}
			</div>
		)
	}

	const ShowReceivedRequests = ({users}) => {
		const handleButton = async (user_id, answer) => {
			try {
				const res = await axios.post('http://localhost:5001/friends/processRequest',
					{
						user_id: user_id,
						answer: answer
					},
					{
						headers: {
							'x-auth-token': localStorage.getItem('token')
						}
					}
				);
	
				dispatch(set_friends(res.data.friends))
				dispatch(set_requests(res.data.requests))
				dispatch(set_receivedRequests(res.data.receivedRequests))
				
				const usersInfo_ = await GetUsersInfo(res.data.receivedRequests)
				setUsersInfo(usersInfo_)
			} catch (err) {
				console.error(err);
			}
		}

		console.log(receivedRequests)

		return (
			<div>
				<h3>Received Requests List</h3>
			
				{
				users.map((item, index) => (
					<div key={index} style={{backgroundColor: 'white', padding: 10, marginTop: 10}}>
						<ShowUser user={item} />

						<button onClick={() => handleButton(item._id, 'accept')}>accept</button>
						<button onClick={() => handleButton(item._id, 'reject')}>reject</button>
					</div>
				))
				}
			</div>
		)
	}

	const handleResetAllButton = async () => {
		try {
			const res = await axios.get('http://localhost:5001/friends/resetAll',
				{
					headers: {
						'x-auth-token': localStorage.getItem('token')
					}
				}
			);

			dispatch(set_friends(res.data.friends))
			dispatch(set_requests(res.data.requests))
			dispatch(set_receivedRequests(res.data.receivedRequests))
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div>
			<h2>Users Page</h2>

			{/* <AuthForm setShowUsers={setShowUsers} /> */}

			<div style={{marginTop: '20px'}}>
				<button onClick={handleShowUsersButton}>Show all users</button>
				<button onClick={handleShowFriendsButton}>Show friends</button>
				<button onClick={handleShowReceivedRequestsButton}>Show received requests</button>
				<button onClick={handleResetAllButton}>Reset All</button>
			</div>

			{showList === 'users' && <ShowUsers users={usersInfo} />}
			{showList === 'friends' && <ShowFriends users={usersInfo} />}
			{showList === 'received requests' && <ShowReceivedRequests users={usersInfo} />}
			
		</div>
	)
}

export default Users
