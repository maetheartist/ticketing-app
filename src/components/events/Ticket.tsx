import { useEffect, useRef } from "react";
import useLocalStorage from "../../hooks/use-local-storage";
import TicketHeader from "../common/ticket-header";
import Ticket from "../common/ticket";
import html2canvas from "html2canvas";
import useNavigation from "../../hooks/use-navigate"; 

const TicketReady = () => {
  const { value } = useLocalStorage("userData", { type: "object" });
  const { value: tickets, setValue: setTickets } = useLocalStorage(
    "myTickets",
    { type: "array" }
  );
  const ticketRef = useRef(null);
  const { navigate } = useNavigation();

  useEffect(() => {
    if (value && tickets) {
      setTickets([...tickets, value]);
    }
  }, []);

  const handleDownload = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current, {
      backgroundColor: null,
      useCORS: true,
      logging: false,
      scale: 2,
      ignoreElements: (element) => {
        return window.getComputedStyle(element).color.includes("oklab");
      },
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `ticket-${value?.fullName}.png`;
    link.click();
  };

  
  const handleBookAnother = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("myTickets");
    navigate("/"); 
    window.location.reload();
  };

  return (
    <div className="relative top-40 w-[90vw] mx-auto p-8 flex flex-col gap-10 rounded-4xl bg-darkslategray-300 border border-darkslategray-100 md:p-14 md:w-[38rem] lg:w-[46rem] text-light-gray">
      <TicketHeader title="Ready" />

      <div className="text-center">
        <h1 className="text-light-gray font-roboto text-2xl font-semibold">
          Your Ticket is Booked!
        </h1>
        <p className="text-light-gray font-roboto text-base mt-2">
          You can download it or check your email for a copy.
        </p>
      </div>

      {value && (
        <div ref={ticketRef}>
          <Ticket
            email={value?.email}
            fullName={value?.fullName}
            noOfTickets={value?.noOfTickets}
            ticketType={value?.ticketType}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 mt-6 md:flex-row md:justify-between">
        <button
          onClick={handleDownload}
          className="bg-primary-btn w-full md:w-[48%] border-none py-3 px-6 rounded-lg text-white text-base font-jeju hover:bg-primary-btn/50"
        >
          Download Ticket
        </button>
        <button
          onClick={handleBookAnother}
          className="bg-transparent border border-primary-btn w-full md:w-[48%] py-3 px-6 rounded-lg text-primary-btn text-base font-jeju hover:bg-primary-btn/50"
        >
          Book Another Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketReady;
