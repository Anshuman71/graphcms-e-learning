import { Player, Hls } from "@vime/react";

export default function PlayerComponent({ src, poster }) {
  const hlsConfig = {};
  return (
    <Player controls>
      <Hls version="latest" config={hlsConfig} poster={poster}>
        <source data-src={src} type="application/x-mpegURL" />
      </Hls>
    </Player>
  );
}