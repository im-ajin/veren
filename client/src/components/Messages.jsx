import React, { useEffect, useState } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch('/api/message/getmessages');
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchMessages();
  }, []);

  const handleRemoveMessage = async (id) => {
    try {
      const res = await fetch(`/api/message/deletemessage/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to remove message');
      }
      setMessages(messages.filter(message => message._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    {messages.length <= 0 ? (
      <p className='pl-8 mt-24'>Currently messages are not available</p>
    ) : (
      <div className="container mx-auto">
      {error && <div className="text-red-500">{error}</div>}
      <table className="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead className="">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Updated At</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {messages.map(message => (
            <tr key={message._id}>
              <td className="border px-4 py-2">{message.name}</td>
              <td className="border px-4 py-2">
                <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline">{message.email}</a>
              </td>
              <td className="border px-4 py-2">{message.message}</td>
              <td className="border px-4 py-2">{message.createdAt}</td>
              <td className="border px-4 py-2">{message.updatedAt}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleRemoveMessage(message._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
    
    </>
  );
};

export default Messages;
