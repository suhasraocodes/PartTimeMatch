import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ContactUs = () => {
  const form = useRef();
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_9qgk9mi', 'template_6nufayc', form.current, {
        publicKey: 'FaW-BU0RKuzTY-S6q',
      })
      .then(
        () => {
          toast.success('Email sent successfully!');
          navigate('/home'); // Redirect to home page
        },
        (error) => {
          toast.error('Failed to send email. Please try again.');
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
      <form ref={form} onSubmit={sendEmail}>
        <label className="block mb-2">Name</label>
        <input type="text" name="user_name" className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3" />
        <label className="block mb-2">Email</label>
        <input type="email" name="user_email" className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3" />
        <label className="block mb-2">Message</label>
        <textarea name="message" className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"></textarea>
        <input type="submit" value="Send" className="bg-blue-500 text-white rounded-md px-4 py-2 cursor-pointer hover:bg-blue-600" />
      </form>
    </div>
  );
};
