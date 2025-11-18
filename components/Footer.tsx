
import React from 'react';
import type { SocialLinks } from '../types';
import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';
import TwitterIcon from './icons/TwitterIcon';
import WhatsappIcon from './icons/WhatsappIcon';

interface FooterProps {
  socialLinks: SocialLinks;
}

const Footer: React.FC<FooterProps> = ({ socialLinks }) => {
  return (
    <footer className="bg-white mt-auto border-t">
      <div className="container mx-auto px-4 py-6 text-center text-text-secondary">
        <p>&copy; {new Date().getFullYear()} AGRO EN CASA🥗🍇🥙. Todos los derechos reservados.</p>
        <p className="text-sm mt-2">Productos agrícolas frescos directamente del campo a tu hogar.</p>
        
        {(socialLinks.facebook || socialLinks.instagram || socialLinks.twitter || socialLinks.whatsapp) && (
          <div className="flex justify-center space-x-6 mt-4">
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                <FacebookIcon />
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors">
                <InstagramIcon />
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
                <TwitterIcon />
              </a>
            )}
            {socialLinks.whatsapp && (
                 <a href={`https://wa.me/${socialLinks.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition-colors">
                    <WhatsappIcon />
                 </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
