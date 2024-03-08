import React from 'react';
import Laptop from '../assets/laptop.jpg';
import { Link } from 'react-router-dom';
const Analytics = () => {
  return (
    <div className='w-full bg-white px-0 py-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>PartTimeMatch</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Connecting Talent with Opportunity, One Part-Time Match at a Time</h1>
          <p>
          PartTimeMatch is a cutting-edge platform designed to bridge the gap between part-time job seekers 
          and employers. Our intuitive interface simplifies the job search process, enabling users to effortlessly 
          discover exciting part-time opportunities tailored to their skills and preferences. With advanced matching 
          algorithms, we ensure that every match is optimized for success, fostering meaningful connections between 
          talented individuals and forward-thinking organizations. Whether you're a student seeking flexible work or 
          a company in need of skilled part-time staff, PartTimeMatch is your go-to solution. 
          Join us today and unlock a world of part-time possibilities!
          </p>
          <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3' to= '/search'>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
