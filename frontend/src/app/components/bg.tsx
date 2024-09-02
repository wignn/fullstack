import img from '../../../public/backimg.jpg';

export const styling = {
  backgroundImage: `url('${img.src}')`,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
};

const Background = () => {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center z-[-1]"
      style={{
        backgroundImage: `url('${img.src}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>
  );
};

export default Background;
