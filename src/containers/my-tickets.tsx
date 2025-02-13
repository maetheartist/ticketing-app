import Ticket from '../components/common/ticket';
import useLocalStorage from '../hooks/use-local-storage';
import { UserDataType } from '../store/contexts/app/provider';

const MyTicketsPage = () => {
  const { value: tickets } = useLocalStorage<UserDataType[]>('myTickets', {
    type: 'array',
  });

  return (
    <div className='relative top-40 w-[90vw] mx-auto p-6 flex flex-col gap-8 rounded-4xl bg-darkslategray-300 border border-darkslategray-100 text-light-gray md:p-12 md:w-[35rem] lg:w-[43.75rem]'>
      <div className='grid gap-6'>
        {tickets?.map((ticket, i) => (
          <Ticket
            key={i}
            email={ticket.email}
            fullName={ticket.fullName}
            image={ticket.image}
            noOfTickets={ticket.noOfTickets}
            ticketType={ticket.ticketType}
            specialRequest={ticket.specialRequest}
          />
        ))}
      </div>
    </div>
  );
};

export default MyTicketsPage;
