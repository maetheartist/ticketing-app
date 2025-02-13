import { LoadingOutlined } from '@ant-design/icons';

type Props = {
  className?: string;
};

const Loading = ({ className }: Props) => {
  return (
    <aside className='w-screen h-screen flex items-center justify-center'>
      <LoadingOutlined className={`text-6xl ${className}`}></LoadingOutlined>
    </aside>
  );
};
export default Loading;