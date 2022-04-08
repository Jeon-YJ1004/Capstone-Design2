import { React } from "react";

import { useProgress, Html } from "@react-three/drei";

function Loading() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html as="div" center style={{ color: "white" }}>
      {progress} % loaded
    </Html>
  );
}

export default Loading;
