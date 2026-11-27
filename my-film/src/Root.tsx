import { Composition, Folder, Still } from "remotion";
import { TestFilm } from "./films/test/TestFilm";
import { Episode01 } from "./series/lina-14-etages/episode-01/Episode01";
import { Episode01v2, TOTAL_BATTEMENTS_V2 } from "./series/lina-14-etages/episode-01/Episode01v2";
import { Couverture01 } from "./series/lina-14-etages/episode-01/Couverture01";
import { Episode02, TOTAL_BATTEMENTS_EP02 } from "./series/lina-14-etages/episode-02/Episode02";
import { Couverture02 } from "./series/lina-14-etages/episode-02/Couverture02";
import { Episode03, TOTAL_BATTEMENTS_EP03 } from "./series/lina-14-etages/episode-03/Episode03";
import { Couverture03 } from "./series/lina-14-etages/episode-03/Couverture03";
import { DTLM01, TOTAL_IMAGES_DTLM01 } from "./series/devant-tout-le-monde/episode-01/DTLM01";
import { CouvertureDTLM01 } from "./series/devant-tout-le-monde/episode-01/CouvertureDTLM01";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Lina-14-etages">
        <Composition id="Lina-Episode-01" component={Episode01v2} durationInFrames={TOTAL_BATTEMENTS_V2 * 30} fps={60} width={1080} height={1920} />
        <Still id="Lina-Episode-01-Couverture" component={Couverture01} width={1080} height={1920} />
        <Composition id="Lina-Episode-02" component={Episode02} durationInFrames={TOTAL_BATTEMENTS_EP02 * 30} fps={60} width={1080} height={1920} />
        <Still id="Lina-Episode-02-Couverture" component={Couverture02} width={1080} height={1920} />
        <Composition id="Lina-Episode-03" component={Episode03} durationInFrames={TOTAL_BATTEMENTS_EP03 * 30} fps={60} width={1080} height={1920} />
        <Still id="Lina-Episode-03-Couverture" component={Couverture03} width={1080} height={1920} />
      </Folder>
      <Folder name="Devant-tout-le-monde">
        <Composition id="DTLM-Episode-01" component={DTLM01} durationInFrames={TOTAL_IMAGES_DTLM01} fps={60} width={1080} height={1920} />
        <Still id="DTLM-Episode-01-Couverture" component={CouvertureDTLM01} width={1080} height={1920} />
      </Folder>
      <Folder name="Archives">
        <Composition id="Lina-Episode-01-v1" component={Episode01} durationInFrames={5220} fps={60} width={1080} height={1920} />
        <Composition id="Test" component={TestFilm} durationInFrames={600} fps={60} width={1080} height={1920} />
      </Folder>
    </>
  );
};
