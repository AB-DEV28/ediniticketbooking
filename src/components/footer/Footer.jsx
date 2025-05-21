import React from 'react';
import RootLayout from '../../layout/RootLayout';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import CardImg from "../../assets/card.png";
import BancaireImg from "../../assets/bancaire.png";

const Footer = () => {
  return (
    <div className="w-full h-auto bg-neutral-950 py-12 px-4">
      <RootLayout className="space-y-10">
        
        {/* Footer Content */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
          {/* Branding & Description */}
          <div className="col-span-2 space-y-8 md:pr-10">
            {/* Logo */}
            <Link to="/" className="text-6xl text-red font-bold">
              Edini
            </Link>

            {/* Description */}
            <p className="text-sm text-neutral-500 font-normal">
              Edini simplifies bus ticket booking through an online platform, making it more convenient for passengers. 
              Travel seamlessly with secure payments, refunds, and 24/7 customer support.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-x-4">
              {[FaInstagram, FaFacebook, FaYoutube, FaXTwitter].map((Icon, index) => (
                <div key={index} className="w-11 h-11 rounded-xl bg-neutral-800/40 hover:bg-red flex items-center justify-center cursor-pointer transition duration-500">
                  <Icon className="w-5 h-5 text-neutral-50" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h1 className="text-lg text-neutral-100 font-semibold">Quick Links</h1>
            <div className="space-y-2">
              {["About Us", "My Account", "Reserve your ticket", "Create your account"].map((item, index) => (
                <Link key={index} to="/" className="block text-base text-neutral-500 hover:text-neutral-300 transition duration-300">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Top Reserved Routes */}
          <div className="space-y-5">
            <h1 className="text-lg text-neutral-100 font-semibold">Top Reserved Routes</h1>
            <div className="space-y-2">
              {["Msila - Alger", "Msila - Boussada", "Msila - Oran", "Msila - Mostaghanem"].map((route, index) => (
                <Link key={index} to="/" className="block text-base text-neutral-500 hover:text-neutral-300 transition duration-300">
                  {route}
                </Link>
              ))}
            </div>
          </div>

          {/* Support Links */}
          <div className="space-y-5">
            <h1 className="text-lg text-neutral-100 font-semibold">Support Links</h1>
            <div className="space-y-2">
              {["Privacy Policy", "Terms & Conditions", "Help", "FAQs"].map((item, index) => (
                <Link key={index} to="/" className="block text-base text-neutral-500 hover:text-neutral-300 transition duration-300">
                  {item}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Separator */}
        <div className="w-full h-px bg-neutral-800/50" />

        {/* Copyright & Payment Options */}
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-neutral-600 font-normal">
            Copyright &copy; 2025 All rights reserved.
          </p>
          <div className="flex items-center gap-x-2">
            <img src={CardImg} alt="Payment Method" className="h-9 object-contain" />
            <img src={BancaireImg} alt="Payment Method" className="h-9 object-contain" />
          </div>
        </div>

      </RootLayout>
    </div>
  );
};

export default Footer;
