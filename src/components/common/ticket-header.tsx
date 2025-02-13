import { Flex, Progress } from 'antd';
import { useAppContext } from '../../store';

const TicketHeader = ({ title }: { title: string }) => {
  const { currentStep, totalSteps } = useAppContext();
  return (
    <Flex vertical gap={3}>
      <Flex gap={10} className='flex-col md:flex-row md:justify-between'>
        <h1 className='text-2xl'>{title}</h1>
        <p className='font-roboto text-base'>
          Step <span>{currentStep}</span> / <span>{totalSteps}</span>
        </p>
      </Flex>
      <Progress
        size={['100%', 4]}
        showInfo={false}
        strokeColor={'#24A0B5'}
        trailColor='#0E464F'
        percent={(currentStep / totalSteps) * 100}
      />
    </Flex>
  );
};
export default TicketHeader;