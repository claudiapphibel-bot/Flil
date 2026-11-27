import { Composition, Folder, Still } from "remotion";
import { TestFilm } from "./films/test/TestFilm";
import { Episode01 } from "./series/lina-14-etages/episode-01/Episode01";
import { Episode01v2, TOTAL_BATTEMENTS_V2 } from "./series/lina-14-etages/episode-01/Episode01v2";
import { Couverture01 } from "./series/lina-14-etages/episode-01/Couverture01";
import { Episode02, TOTAL_BATTEMENTS_EP02 } from "./series/lina-14-etages/episode-02/Episode02";
import { Couverture02 } from "./series/lina-14-etages/episode-02/Couverture02";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Lina-14-etages">
        <Composition id="Lina-Episode-01" component={Episode01v2} durationInFrames={TOTAL_BATTEMENTS_V2 * 30} fps={60} width={1080} height={1920} />
        <Still id="Lina-Episode-01-Couverture" component={Couverture01} width={1080} height={1920} />
        <Composition id="Lina-Episode-02" component={Episode02} durationInFrames={TOTAL_BATTEMENTS_EP02 * 30} fps={60} width={1080} height={1920} />
        <Still id="Lina-Episode-02-Couverture" component={Couverture02} width={1080} height={1920} />
      </Folder>
      <Folder name="Archives">
        <Composition id="Lina-Episode-01-v1" component={Episode01} durationInFrames={5220} fps={60} width={1080} height={1920} />
        <Composition id="Test" component={TestFilm} durationInFrames={600} fps={60} width={1080} height={1920} />
      </Folder>
    </>
  );
};
