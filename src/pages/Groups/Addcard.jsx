import React, { useContext, useEffect } from 'react'
import { Context } from '../../context/Context';

const Addcard = ({keyy,addmemlist,setaddmemlist,person,jobId, axiosInstancee}) => {

	const { user } = useContext(Context);

    async function pushvalue(){
        await setaddmemlist(prevArray => [...prevArray, person._id]);
    }

    async function removeValue(indexrB){

        // assigning the list to temp variable
        const temp = [...addmemlist];

        // removing the element using splice
        temp.splice(indexrB, 1);

        // updating the list
        setaddmemlist(temp);
    }

	useEffect(()=>{
		if(person.group_joined.includes(jobId)){
			setaddmemlist(prevArray => [...prevArray, person._id]);
		}
	},[]);
    
  return (
                                    (addmemlist.includes(person._id) && person._id != user._id)?
                                    <div
										className="groups-add-users-person"
										onClick={() => {
                                            removeValue(addmemlist.indexOf(person._id));
											console.log(addmemlist);
										}}
                                        key={keyy}
									>
										<div className="groups-add-users-person-select">
                                                <span className="material-icons">
                                                        check_box
                                                </span>
											
										</div>
										<div className="groups-add-users-person-image">
											<img
												src={`${axiosInstancee.defaults.baseURL}images/${person.photo}`}
												alt={person.username}
											/>
										</div>
										<div className="groups-add-users-person-content">
											<span className="groups-add-users-person-name">
												{person.name}
											</span>
											<span className="groups-add-users-person-username">
												@{person._id}
											</span>
										</div>
									</div>
                                    :
									(person._id != user._id)?
                                    <div
										className="groups-add-users-person"
										onClick={() => {
											pushvalue();
											console.log(addmemlist);
										}}
                                        key={keyy}
									>
										<div className="groups-add-users-person-select">
                                                <span className="material-icons">
                                                        check_box_outline_blank
                                                </span>											
										</div>
										<div className="groups-add-users-person-image">
											<img
												src={`${axiosInstancee.defaults.baseURL}images/${person.photo}`}
												alt={person.username}
											/>
										</div>
										<div className="groups-add-users-person-content">
											<span className="groups-add-users-person-name">
												{person.name}
											</span>
											<span className="groups-add-users-person-username">
												@{person._id}
											</span>
										</div>
									</div>
									:
									<div
										className="groups-add-users-person"
										onClick={() => {
											console.log(addmemlist);
										}}
                                        key={keyy}
									>
										<div className="groups-add-users-person-select">
                                                <span className="material-icons">
                                                        check_box
                                                </span>											
										</div>
										<div className="groups-add-users-person-image">
											<img
												src={`${axiosInstancee.defaults.baseURL}images/${person.photo}`}
												alt={person.username}
											/>
										</div>
										<div className="groups-add-users-person-content">
											<span className="groups-add-users-person-name">
												{person.name}
											</span>
											<span className="groups-add-users-person-username">
												@{person._id}
											</span>
										</div>
									</div>
  )
}

export default Addcard