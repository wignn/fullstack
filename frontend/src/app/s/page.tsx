// pages/index.js
import NovelDetail from './detail';
import fa from '../../../public/1.jpg'

export default function Home() {
  const novel = {
    title: 'The Great Adventure',
    cover: '/1.jpg', 
    genre: 'Fantasy, Adventure',
    description:
      'Follow the journey of a young hero who embarks on a thrilling adventure across mystical lands, battling dark forces to save the kingdom.',
    chapters: [
      'Chapter 1: The Beginning',
      'Chapter 2: The Journey',
      'Chapter 3: The Battle',
      'Chapter 4: The Climax',
      'Chapter 5: The Victory',
    ],
  };

  return (
    <div>
      <NovelDetail {...novel} />
    </div>
  );
}
