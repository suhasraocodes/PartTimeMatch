import React, { useRef } from 'react';
import Profile from '../assets/Profile.jpg';

const Cards = () => {
  const carouselRef = useRef(null);

  const handleNext = () => {
    carouselRef.current.scrollLeft += 300; // Adjust this value based on your card width
  };

  const handlePrev = () => {
    carouselRef.current.scrollLeft -= 300; // Adjust this value based on your card width
  };

  return (
    <div className='w-full py-4 px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto relative overflow-hidden'>
        <div className='flex' ref={carouselRef}>
        <div className='w-[300px] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Profile} alt="/" />
            <h2 className='text-2xl font-bold text-center py-8'>Ramesh</h2>
            <p className='text-center text-4xl font-bold'>Rank 1</p>
            <div className='text-center font-medium'>
              <p className='py-2 border-b mx-8 mt-8'>Painter</p>
              <p className='py-2 border-b mx-8'>Electrician</p>
              <p className='py-2 border-b mx-8'>Catering Service</p>
            </div>
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Hire</button>
          </div>
          <div className='w-[300px] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Profile} alt="/" />
            <h2 className='text-2xl font-bold text-center py-8'>Suresh</h2>
            <p className='text-center text-4xl font-bold'>Rank 2</p>
            <div className='text-center font-medium'>
              <p className='py-2 border-b mx-8 mt-8'>Tutor</p>
              <p className='py-2 border-b mx-8'>Food Service Worker</p>
              <p className='py-2 border-b mx-8'>Retail Associate</p>
            </div>
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Hire</button>
          </div>
          <div className='w-[300px] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Profile} alt="/" />
            <h2 className='text-2xl font-bold text-center py-8'>Vishesh</h2>
            <p className='text-center text-4xl font-bold'>Rank 3</p>
            <div className='text-center font-medium'>
              <p className='py-2 border-b mx-8 mt-8'>Painter</p>
              <p className='py-2 border-b mx-8'>Electrician</p>
              <p className='py-2 border-b mx-8'>Catering Service</p>
            </div>
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Hire</button>
          </div>
          <div className='w-[300px] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Profile} alt="/" />
            <h2 className='text-2xl font-bold text-center py-8'>Jnanesh</h2>
            <p className='text-center text-4xl font-bold'>Rank 4</p>
            <div className='text-center font-medium'>
              <p className='py-2 border-b mx-8 mt-8'>Fitness Instructor</p>
              <p className='py-2 border-b mx-8'>Pet Sitter</p>
              <p className='py-2 border-b mx-8'>Event Staff</p>
            </div>
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Hire</button>
          </div>
        </div>
        <button onClick={handlePrev} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 px-3 py-1 rounded-md">Prev</button>
        <button onClick={handleNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 px-3 py-1 rounded-md">Next</button>
      </div>
    </div>
  );
};

export default Cards;