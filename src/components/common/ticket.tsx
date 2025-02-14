
import QRCode from "react-qr-code";


type TicketProps = {
  email: string;
  fullName: string;
  image?: string;
  noOfTickets: number;
  ticketType: string;
  specialRequest?: string;
};

const Ticket: React.FC<TicketProps> = ({
  email,
  fullName,
  noOfTickets,
  ticketType,
  specialRequest,      
}) => {
  const qrData = JSON.stringify({ email, fullName, ticketType, noOfTickets });

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[28rem] md:max-w-[32rem] lg:max-w-[36rem]">
        <div className="flex flex-col items-center w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] bg-[#031E21]/[0.9] border border-[#24A0B5] p-4 rounded-xl text-white">
          
        
          <QRCode value={qrData} size={150} bgColor="#ffffff" fgColor="#000000" />

          <section className="text-center mt-4">
            <h1 className="text-2xl font-road-rage md:text-3xl">
              Techember Fest '25
            </h1>
            <div className="mt-2 text-sm text-white-300">
              <p>📍 Lagos, Nigeria</p>
              <p>📆 March 15, 2025 | 7:00 PM</p>
            </div>
          </section>

         
          <p className="text-center mt-4 font-bold">
            Ticket for: {fullName} ({email})
          </p>
          <p className="text-center text-sm text-gray-400">
            Ticket Type: {ticketType} | Quantity: {noOfTickets}
          </p>
          {specialRequest && (
            <p className="text-center text-sm text-gray-500">
              Special Request: {specialRequest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
