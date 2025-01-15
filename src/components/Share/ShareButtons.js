import React from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const ShareButtons = ({ meal }) => {
  const url = window.location.href;
  const title = `Check out this recipe for ${meal.title}!`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
  };

  return (
    <div className="flex space-x-4 my-4">
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:opacity-80">
        <FaFacebook size={24} />
      </a>
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:opacity-80">
        <FaTwitter size={24} />
      </a>
      <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:opacity-80">
        <FaWhatsapp size={24} />
      </a>
      <a href={shareLinks.email} className="text-gray-600 hover:opacity-80">
        <FaEnvelope size={24} />
      </a>
    </div>
  );
};

export default ShareButtons;
