import React, { createContext, useContext, useState } from 'react';

// El contexto solo almacenará el id de la canción
const SongContext = createContext<any>(null);

export const SongProvider = ({ children }: { children: React.ReactNode }) => {
  // Solo almacenamos el id de la canción
  const [songId, setSongId] = useState<string | null>(null);

  // La función setSong solo actualiza el id
  const setSong = (id: string) => {
    setSongId(id);
  };

  return (
    <SongContext.Provider value={{ songId, setSong }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => {
  return useContext(SongContext);
};
