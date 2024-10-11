import React, { useEffect } from "react";
import 'flowbite'; // Importar Flowbite
import { initFlowbite } from 'flowbite'; // Inicializar Flowbite

export const App = () => {
  useEffect(() => {
    initFlowbite(); // Inicializar Flowbite al cargar la app
  }, []);

  return (
    <div className="bg-gray-100 p-8">
      {/* Aquí van los botones y componentes de Flowbite */}
    </div>
  );
};
