import { Composition } from 'remotion';
import { InfoSession } from './compositions/InfoSession';
import { FullInfoSession } from './compositions/FullInfoSession';
import { BrandIntroReel } from './compositions/BrandIntroReel';
import { YouveBeenProgramming } from './compositions/YouveBeenProgramming';
import { VariablesExplained } from './compositions/VariablesExplained';
import { ForLoopSkincare } from './compositions/ForLoopSkincare';
import { IfElseOutfit } from './compositions/IfElseOutfit';
import { FunctionsRecipe } from './compositions/FunctionsRecipe';
import { ArraysPlaylist } from './compositions/ArraysPlaylist';
import { BooleansYesNo } from './compositions/BooleansYesNo';
import { ConsoleLogThinking } from './compositions/ConsoleLogThinking';
import { ObjectsContact } from './compositions/ObjectsContact';
import { DeveloperIntro } from './compositions/DeveloperIntro';
import { StompBeatDOGM } from './compositions/StompBeatDOGM';
import { BootcampPost1, BootcampPost2, BootcampPost3, BootcampPost4 } from './compositions/BootcampCarousel';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InfoSession"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={InfoSession as any}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          cohortName: 'Manila',
          startDate: 'March 16, 2026',
          seatsAvailable: 25,
        }}
      />
      <Composition
        id="FullInfoSession"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={FullInfoSession as any}
        durationInFrames={4770} // ~159 seconds at 30fps (audio + 1s pauses between)
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          cohortName: 'Manila',
          startDate: 'March 2026',
          seatsAvailable: 25,
        }}
      />
      <Composition
        id="BrandIntroReel"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={BrandIntroReel as any}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          headline: 'DOGM.AI',
          tagline: 'Learn to build with AI',
        }}
      />
      <Composition
        id="YouveBeenProgramming"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={YouveBeenProgramming as any}
        durationInFrames={540} // 18 seconds at 30fps (extended Scene 2)
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          showCodeRain: true,
        }}
      />
      <Composition
        id="VariablesExplained"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={VariablesExplained as any}
        durationInFrames={1290} // 43 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          showAudioHints: false,
        }}
      />
      <Composition
        id="ForLoopSkincare"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={ForLoopSkincare as any}
        durationInFrames={1050} // 35 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          showSparkles: true,
        }}
      />
      <Composition
        id="IfElseOutfit"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={IfElseOutfit as any}
        durationInFrames={1080} // 36 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          showWeatherParticles: true,
        }}
      />
      <Composition
        id="FunctionsRecipe"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={FunctionsRecipe as any}
        durationInFrames={1050} // 35 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          showSteamParticles: true,
        }}
      />
      <Composition
        id="ArraysPlaylist"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={ArraysPlaylist as any}
        durationInFrames={1080} // 36 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          showMusicNotes: true,
        }}
      />
      <Composition
        id="BooleansYesNo"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={BooleansYesNo as any}
        durationInFrames={1020} // 34 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          showFloatingSymbols: true,
        }}
      />
      <Composition
        id="ConsoleLogThinking"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={ConsoleLogThinking as any}
        durationInFrames={1020} // 34 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          showFloatingLogs: true,
        }}
      />
      <Composition
        id="ObjectsContact"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={ObjectsContact as any}
        durationInFrames={1080} // 36 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          showFloatingIcons: true,
        }}
      />
      <Composition
        id="DeveloperIntro"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={DeveloperIntro as any}
        durationInFrames={1890} // 63 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          name: 'Llino Del Rosario',
          title: 'Full-Stack & AI Engineer',
          email: 'llino.delrosario.gadia@gmail.com',
          website: 'llinodelrosario.vercel.app',
        }}
      />
      <Composition
        id="StompBeatDOGM"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={StompBeatDOGM as any}
        durationInFrames={750} // 25 seconds at 30fps
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          showParticles: true,
        }}
      />
      {/* Bootcamp Carousel Posts - 4 static images */}
      <Composition
        id="BootcampPost1"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={BootcampPost1 as any}
        durationInFrames={60} // 2 seconds for static image
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="BootcampPost2"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={BootcampPost2 as any}
        durationInFrames={60}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="BootcampPost3"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={BootcampPost3 as any}
        durationInFrames={60}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="BootcampPost4"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={BootcampPost4 as any}
        durationInFrames={60}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
