import { ImageService } from '@/services/image.service';

export default async function Home() {
  const service = new ImageService();
  const images = await service.fetchImages();
  return (
    <>
      <div>Hello, World</div>
      {images.map((i) => {
        return <div key={i.id}>{i.title}</div>
      })}
    </>
  )
}
