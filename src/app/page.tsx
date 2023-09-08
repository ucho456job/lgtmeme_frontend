import { ImageService } from '@/services/image.service';
import packageJson from '../../package.json';

export default async function Home() {
  const service = new ImageService();
  const images = await service.fetchImages();
  return (
    <>
      <div>Hello, World</div>
      <div>ver. {packageJson.version}</div>
      {images.map((i) => {
        return <div key={i.id}>{i.title}</div>
      })}
    </>
  )
}

/*
  I encountered a 'fetch failed' error during the build process.
  As a solution, I have written the following code.
  You can find the issue URL below.
  https://github.com/vercel/next.js/issues/49578
*/
export const runtime = "edge";
