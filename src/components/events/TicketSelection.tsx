import { Flex, Form, FormProps, Select } from 'antd';
import { useState } from 'react';
import TicketHeader from '../common/ticket-header';
import CustomizeRequiredMark from '../common/required-mark';
import { SelectDropDownArrowIcon } from '../icons';
import { useAppContext } from '../../store';
import useLocalStorage from '../../hooks/use-local-storage';

type FormFieldType = {
  ticketType: string;
  noOfTickets: number;
};

type TicketsType = 'Regular' | 'VIP' | 'VVIP';

export type RequiredMark = boolean | 'optional' | 'customize';

const ticketTypes = [
  {
    type: 'Free',
    value: 'Regular',
    label: '20/52',
  },
  {
    type: '$150',
    value: 'VIP',
    label: '20/52',
  },
  {
    type: '$150',
    value: 'VVIP',
    label: '20/52',
  },
];

const TicketSelection = () => {
  const [form] = Form.useForm();
  const noOfTickets = Form.useWatch(['noOfTickets'], form);
  const [selectedTicket, setSelectedTicket] = useState<TicketsType>('Regular');
  const [requiredMark] = useState<RequiredMark>('customize');
  const { setCurrentStep, currentStep } = useAppContext();
  const { value, setValue } = useLocalStorage('userData', { type: 'object' });

  const onFinish: FormProps<FormFieldType>['onFinish'] = (values) => {
    setValue({
      ...value,
      noOfTickets: values.noOfTickets,
      ticketType: selectedTicket,
      currentStep: currentStep + 1,
    });
    setCurrentStep(2);
  };

  const onFinishFailed: FormProps<FormFieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='relative top-40 w-[90vw] mx-auto p-6 flex flex-col gap-8 rounded-4xl bg-darkslategray-300 border border-darkslategray-100 md:p-12 md:w-[35rem] lg:w-[43.75rem] text-light-gray'>
      <TicketHeader title='Ticket Selection' />

      <section className='bg-[#08252B] p-4 rounded-4xl flex flex-col md:p-6'>
        <section className='py-4 px-6 rounded-3xl border-2 border-t-0 border-[#07373F] backdrop-blur-sm event-detail-box text-center'>
          <h1 className='text-[2.4rem] font-road-rage md:text-5xl'>
            Techember Fest ”25
          </h1>
          <p className='font-roboto text-[15px] mt-3 mb-10 max-w-[21.25rem] mx-auto'>
            Join us for an unforgettable experience at Techember Fest! Secure
            your spot now.
          </p>
          <div className='flex font-roboto flex-col max-w-[21.25rem] mx-auto md:flex-row'>
            <p className='text-base flex flex-col md:flex-row'>
              <span className=''>📍 Lagos, Nigeria </span>
              <span className='hidden mx-1.5 md:block'>||</span>
            </p>
            <p className=''> March 15, 2025 | 7:00 PM</p>
          </div>
        </section>

        <hr className='h-1 my-8 w-full rounded-full border-none bg-[#07373F]' />

        <Form
          layout='vertical'
          form={form}
          name='ticketSelectionForm'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          requiredMark={
            requiredMark === 'customize' ? CustomizeRequiredMark : requiredMark
          }
          className='flex flex-col gap-3'
          id='step-one-form'
          initialValues={{ noOfTickets: 1 }}
        >
          <Form.Item<FormFieldType>
            label={<p className='label'>Select Ticket Type:</p>}
          >
            <section className='py-4 px-6 rounded-3xl border border-[#07373F] bg-gray-300 grid gap-6 cursor-pointer md:grid-cols-2 lg:grid-cols-3'>
              {ticketTypes.map((ticket, i) => {
                return (
                  <aside
                    key={i}
                    className={`border-2 border-[#197686] rounded-xl p-3 flex flex-col gap-3 ${
                      selectedTicket !== ticket.value
                        ? 'bg-transparent'
                        : 'bg-[#12464E]'
                    }`}
                    onClick={() =>
                      setSelectedTicket(ticket.value as TicketsType)
                    }
                  >
                    <p className='text-white font-roboto text-2xl font-semibold'>
                      {ticket.type}
                    </p>
                    <Flex vertical gap={5} className='font-roboto'>
                      <p className='uppercase text-white'>
                        {ticket.value} Access
                      </p>
                      <p className='text-sm text-[#d9d9d9]'>{ticket.label}</p>
                    </Flex>
                  </aside>
                );
              })}
            </section>
          </Form.Item>

          <Form.Item<FormFieldType>
            name='noOfTickets'
            label={<p className='label'>Number of Tickets</p>}
          >
            <Select
              size='large'
              suffixIcon={
                <SelectDropDownArrowIcon className='text-2xl text-white' />
              }
              className='bg-transparent border border-[#07373F] rounded-xl'
              variant='borderless'
              options={[
                {
                  value: 1,
                  label: '1',
                },
                {
                  value: 2,
                  label: '2',
                },
                {
                  value: 3,
                  label: '3',
                },
                {
                  value: 4,
                  label: '4',
                },
                {
                  value: 5,
                  label: '5',
                },
                {
                  value: 6,
                  label: '6',
                },
              ]}
            />
          </Form.Item>
        </Form>

        {/* <Form.Item label={null}> */}
        <div className='flex flex-col gap-4 mt-2.5 md:flex-row-reverse'>
          <button
            disabled={!noOfTickets}
            className='block bg-primary-btn w-full border-none py-3 px-6 rounded-lg text-white text-base font-jeju disabled:bg-primary-btn/50 disabled:text-white hover:bg-primary-btn/50'
            type='submit'
            form='step-one-form'
          >
            Next
          </button>
          <button
            className='block bg-transparent border border-primary-btn w-full py-3 px-6 rounded-lg text-primary-btn text-base font-jeju hover:bg-primary-btn/50'
            onClick={() => {
              form.resetFields();
              setSelectedTicket('Regular');
            }}
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
};
export default TicketSelection;