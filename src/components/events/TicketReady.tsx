import { useEffect } from 'react';
import useLocalStorage from '../../hooks/use-local-storage';
import TicketHeader from '../common/ticket-header';
import { Flex } from 'antd';
import Ticket from '../common/ticket';

const TicketReady = () => {
  const { value } = useLocalStorage('userData', { type: 'object' });
  const { value: tickets, setValue: setTickets } = useLocalStorage(
    'myTickets',
    { type: 'array' }
  );

  useEffect(() => {
    if (value && tickets) {
      setTickets([...tickets, value]);
    } else {
      return;
    }
  }, []);

  return (
    <div className='relative top-40 w-[90vw] mx-auto p-6 flex flex-col gap-8 rounded-4xl bg-darkslategray-300 border border-darkslategray-100 md:p-12 md:w-[35rem] lg:w-[43.75rem] text-light-gray'>
      <TicketHeader title='Ready' />

      <Flex vertical gap={12} align='center'>
        <h1 className='text-light-gray text-center font-roboto text-2xl font-semibold'>
          Your Ticket is Booked!
        </h1>
        <p className='text-light-gray font-roboto text-base'>
          You can download or Check your email for a copy
        </p>
      </Flex>

      <Ticket />

      <div className='flex flex-col gap-4 mt-2.5 md:flex-row-reverse'>
        <button
          className='block bg-primary-btn w-full border-none py-3 px-6 rounded-lg text-white text-base font-jeju disabled:bg-primary-btn/50 disabled:text-white hover:bg-primary-btn/50'
          type='submit'
          form='step-one-form'
        >
          Download Ticket
        </button>
        <button
          className='block bg-transparent border border-primary-btn w-full py-3 px-6 rounded-lg text-primary-btn text-base font-jeju hover:bg-primary-btn/50'
          // onClick={() => {
          // }}
        >
          Book Another Ticket
        </button>
      </div>
      {/* </section> */}
    </div>
  );
};
export default TicketReady;