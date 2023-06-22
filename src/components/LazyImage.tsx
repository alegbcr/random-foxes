// Importar los hooks y tipos necesarios de React
import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";

// Definir los tipos de props del componente
type LazyImageProps = {
  src: string;
  onLazyLoad?: (img: HTMLImageElement) => void;
};
type Props = ImgHTMLAttributes<HTMLImageElement> & LazyImageProps;

// Definir el componente LazyImage
export const LazyImage = ({
  src,
  onLazyLoad,
  ...imgProps
}: Props): JSX.Element => {
  // Crear una referencia mutable para el elemento de imagen en el DOM
  const node = useRef<HTMLImageElement>(null);

  // Estado para indicar si la imagen ya ha sido cargada
  const [isLazyLoaded, setIsLazyLoad] = useState(false);

  // Estado para almacenar la fuente actual de la imagen
  const [currentSrc, setCurrentScr] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );

  useEffect(() => {
    // Si la imagen ya ha sido cargada, no hacer nada
    if (isLazyLoaded) {
      return;
    }

    // Crear una instancia del IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Verificar si el elemento es visible y si existe la referencia al elemento de imagen
        if (!entry.isIntersecting || !node.current) {
          return;
        }

        // Actualizar la fuente de la imagen con la URL real
        setCurrentScr(src);
        // Desconectar el observador de intersección
        observer.disconnect();
        // Establecer el estado de carga de la imagen en true
        setIsLazyLoad(true);

        // Si se proporciona la función onLazyLoad, llamarla con el elemento de imagen
        if (typeof onLazyLoad === "function") {
          onLazyLoad(node.current);
        }
      });
    });

    // Observar el nodo del elemento de imagen
    if (node.current) {
      observer.observe(node.current);
    }

    // Desconectar el observador cuando el componente se desmonte
    return () => {
      observer.disconnect();
    };
  }, [src, onLazyLoad, isLazyLoaded]);

  // Renderizar el elemento de imagen con la referencia al nodo, la fuente actual y las demás propiedades
  return <img ref={node} src={currentSrc} {...imgProps} />;
};
