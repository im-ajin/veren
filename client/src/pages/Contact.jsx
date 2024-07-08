import React, { useState } from 'react';
import { useSnackbar } from "notistack";
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Contact = () => {

  const { currentUser } = useSelector((state) => state.user)

  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    userId: currentUser._id
  });
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/message/sendmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          message: '',
          userId: currentUser._id
        });
        enqueueSnackbar('Message Sended successfully',{ variant : 'success'})
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error.message);
      enqueueSnackbar('Something wrong',{ variant : 'error'})
    }
  };
  

  return (
    <div className="container mx-auto p-12 min-h-screen mt-12 max-w-[800px]">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
