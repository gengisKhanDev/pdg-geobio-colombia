import React, { useEffect } from "react";
import 'flowbite'; // Importar Flowbite
import { initFlowbite } from 'flowbite'; // Inicializar Flowbite
import { Hello } from "../components/Hello.jsx";
import { Info } from "../components/Info.jsx";

export const App = () => {
  useEffect(() => {
    initFlowbite(); // Inicializar Flowbite al cargar la app
  }, []);

  return (
    <div className="bg-gray-100 p-8">
      <Hello />
      <Info />
      {/* Aquí van los botones y componentes de Flowbite */}
    </div>
  );
};
