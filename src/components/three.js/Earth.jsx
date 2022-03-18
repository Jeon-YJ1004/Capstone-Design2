import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import EarthDayMap from "../../assets/img/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/img/8k_earth_normal_map.tif";
import EarthSpecularMap from "../../assets/img/8k_earth_specular_map.tif";
import EarthCloudsMap from "../../assets/img/8k_earth_clouds.jpg";

export default function Earth() {
  // const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
  //   TextureLoader,
  //   [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  // );
  // useLoader(TextureLoader);
  // return (
  //   <>
  //     <ambientLight intensity={1} />
  //     <mesh>
  //       <sphereGeometry args={[1, 32, 32]} />
  //       {/* sphereGeometry의 인자는 순서대로 반지름, 너비, 높이 이다 */}
  //       <meshPhongMaterial specularMap={specularMap} />
  //       <meshStandardMaterial map={colorMap} normalMap={normalMap} />
  //     </mesh>
  //   </>
  // );
}
