// Footer.jsx
import React from "react";
import { HiHome, HiUser, HiPlusCircle, HiShieldCheck } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Footer = ({ userRole }) => {
  const navigate = useNavigate();

  const handleAccountClick = () => {
    navigate("/myaccount");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handlePublicarClick = () => {
    navigate("/publicar");
  };
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-300">
      <div className="flex justify-around py-2">
        <button
          onClick={handleAccountClick}
          className="flex flex-col items-center text-gray-700 hover:text-black w-full"
        >
          <HiUser size={28} />
          <span className="text-xs">Mi Cuenta</span>
        </button>
        <button
          onClick={handlePublicarClick}
          className="flex flex-col items-center text-gray-700 hover:text-black w-full"
        >
          <HiPlusCircle size={28} />
          <span className="text-xs">Publicar</span>
        </button>
        <button className="flex flex-col items-center text-gray-700 hover:text-black w-full">
          <HiHome size={28} />
          <span className="text-xs">Inicio</span>
        </button>
        {/* Botón adicional para usuarios con rol de "admin" */}
        {userRole === "Admin" && (
          <button
            onClick={handleAdminClick}
            className="flex flex-col items-center text-gray-700 hover:text-black w-full"
          >
            <HiShieldCheck size={28} />
            <span className="text-xs">Admin</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Footer;
