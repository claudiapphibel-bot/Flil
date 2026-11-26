import { Composition, Folder } from "remotion";
import { TestFilm } from "./films/test/TestFilm";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Films">
      <Composition id="Test" component={TestFilm} durationInFrames={600} fps={60} width={1080} height={1920} />
    </Folder>
  );
};
