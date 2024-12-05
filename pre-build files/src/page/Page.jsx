import { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Env from '../models/Env'
import Gorilla from '../models/Gorilla'
import subway from '../assets/audio/SUBWAY SURFERS (Main Theme).mp3'
import { soundoff, soundon } from "../assets/icons";
import { Link } from "react-router-dom";

const Page = () => {
    const audioRef = useRef(new Audio(subway));
    audioRef.current.volume = 0.1;
    audioRef.current.loop = true;
    const [isRotating, setIsRotating] = useState(false);
    const [isPlayingMusic, setIsPlayingMusic] = useState(false);

    useEffect(() => {
        if (isPlayingMusic) {
          audioRef.current.play();
        }
    
        return () => {
          audioRef.current.pause();
        };
      }, [isPlayingMusic]);

    const adjustEnvForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -43];
        let rotation = [0.1, 4.7, 0];

        if (window.innerWidth < 768) {
            screenScale = [0.06, 0.06, 0.06];
            screenPosition = [0, -6.5, -43.4];
          } else {
            screenScale = [0.07, 0.07, 0.07];
            screenPosition = [0, -6.5, -43.4];
          }
      
          return [screenScale, screenPosition, rotation];
        }

    const adjustGorillaForScreenSize = () => {
        let screenScale, screenPosition;

        if (window.innerWidth < 768) {
            screenScale = [0.1, 0.1, 0.1];
            screenPosition = [0, -.25, 2];
          } else {
            screenScale = [0.2, 0.2, 0.2];
            screenPosition = [0, -.5, 2.5];
          }
      
          return [screenScale, screenPosition];
        }

    const [envScale, envPosition, envRotation] = adjustEnvForScreenSize();
    const [gorillaScale, gorillaPosition, gorillaRotation] = adjustGorillaForScreenSize();
    
    return (
        <section className='w-full h-screen relative'>
            <Link to='https://sketchfab.com/3d-models/sea-keep-lonely-watcher-09a15a0c14cb4accaf060a92bc70413d' className="sm:text-lg italic sm:leading-snug neo-brutalism-white py-4 px-8
             text-black mx-5 absolute top-30 left-13 right-13 z-10 flex items-center justify-center">
                Sea Keep "Lonely Watcher" by Artjoms Horosilovs: https://sketchfab.com/3d-models/sea-keep-lonely-watcher-09a15a0c14cb4accaf060a92bc70413d
                <br />
                Mobile - Flying Gorilla - Gorilla by Gusifer719: https://sketchfab.com/3d-models/mobile-flying-gorilla-gorilla-e0c73b005a554311960814fb4405d613
                <br />
                "Subway Surfers (Main Theme) by Mikkel Fabricius Smitt: https://www.youtube.com/watch?v=H_G-kvMxg3Y"
            </Link>
            <Canvas 
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense
                    fallback={<Loader />}
                >
                    <directionalLight 
                        position={[1, 1, 1]} intensity={2}
                    />
                    <ambientLight 
                        intentsity={0.5}
                    />
                    <hemisphereLight 
                        skyColor="#b1e1ff" groundColor="#000000" intensity={1}
                    />

                    <Gorilla 
                        gorillaScale={gorillaScale} 
                        gorillaPosition={gorillaPosition}
                        isRotating={isRotating}
                        rotation={[-.2, -0.25, 23.7]}
                    />
                    <Env 
                        position={envPosition}
                        scale={envScale}
                        rotation={envRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                    />
                </Suspense>
            </Canvas>

            <div
                className="absolute bottom-10 left-10"
            >
                <img
                    src={!isPlayingMusic ? soundoff : soundon}
                    alt="sound"
                    onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                    className="w-20 h-20 cursor-pointer object-contain"
                />
            </div>
        </section>
    )
}

export default Page