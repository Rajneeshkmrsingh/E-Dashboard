import React, { useEffect, useState } from 'react';

const ProfileDetails = () => {
   
    const data = localStorage.getItem("user");
       const user    = JSON.parse(data)
   console.log(user)
    return (
        <div>
            <h1 className='profileHead'>User Details</h1>
            <ul className='profileList'>
                <li><span>User Id :</span> {user._id}</li>
                <li><span>Name :</span> {user.name}</li>
                <li><span>Email :</span> {user.email}</li>
                <li><span>Phone Number :</span> {user.phone}</li>
            </ul>
            
        </div>
    );
};

export default ProfileDetails;