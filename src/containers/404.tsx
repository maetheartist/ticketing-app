import { Button } from 'antd';
import useNavigation from '../hooks/use-navigate';
import { EVENTS_PAGE } from '../config/routes';

const NotFound = () => {
  const { navigate } = useNavigation();

  return (
    <div className='w-full h-screen bg-gray-300 flex flex-col items-center justify-center'>
      <p className='text-xl flex gap-3 items-center'>
        <span className='p-2 rounded-md bg-black text-white'>404</span>
        <span>Page Not Found</span>
      </p>

      <p className='text-lg mt-2 italic text-black/60'>
        The page you are looking for could not be found 😢😢
      </p>

      <Button
        onClick={() => navigate(EVENTS_PAGE)}
        type='primary'
        className='mt-5'
      >
        Back Home
      </Button>
    </div>
  );
};
export default NotFound;