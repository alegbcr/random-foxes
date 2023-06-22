"use client";
import { useState } from "react";
import type { MouseEventHandler } from "react";
import { random } from "lodash";

// components
import { LazyImage } from "@/components/LazyImage";

// generate a random function between 1 to 123
const myRandom = (): number => random(1, 123);
// generate simple unique id
const generateId = (): string => Math.random().toString(36).substring(2, 9);

const Home = () => {
  const [images, setImages] = useState<Array<IImageItem>>([]);

  const handleAddNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    const newImageItem: IImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${myRandom()}.jpg`,
    };
    setImages([...images, newImageItem]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <h1 className="text-green-300">Hello, world!!!</h1>
      <button onClick={handleAddNewFox}>Add new fox</button>
      {images.map(({ id, url }, index) => (
        <div key={id} className="p-4">
          <LazyImage
            src={url}
            width="320"
            height="auto"
            className="rounded bg-gray-300"
            onClick={() => {
              console.log("holi!");
            }}
            onLazyLoad={(img) => {
              console.log(`Image #${index + 1} cargada. Nodo:`, img);
            }}
          />
        </div>
      ))}
    </main>
  );
};

export default Home;
