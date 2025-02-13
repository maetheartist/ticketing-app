import AttendeeDetails from '../components/events/AttendeeDetails';
import TicketReady from '../components/events/TicketReady';
import TicketSelection from '../components/events/TicketSelection';
import { useAppContext } from '../store';

const EventsPage = () => {
  const { currentStep } = useAppContext();
  return currentStep === 1 ? (
    <TicketSelection />
  ) : currentStep === 2 ? (
    <AttendeeDetails />
  ) : (
    <TicketReady />
  );
};
export default EventsPage;