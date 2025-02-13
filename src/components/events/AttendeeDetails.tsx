import { Form, FormProps, Input, Upload } from 'antd';
import { useState } from 'react';
import TicketHeader from '../common/ticket-header';
import { RequiredMark } from './TicketSelection';
import CustomizeRequiredMark from '../common/required-mark';
import { useAppContext } from '../../store';
import { MailOutlined } from '@ant-design/icons';
import { cloudDownloadImg } from '../../config/static';
import useLocalStorage from '../../hooks/use-local-storage';

type FormFieldType = {
  fullName: string;
  email: string;
  specialRequest: string;
};

const AttendeeDetails = () => {
  const [form] = Form.useForm();
  const fullName = Form.useWatch(['fullName'], form);
  const email = Form.useWatch(['email'], form);
  const [requiredMark] = useState<RequiredMark>('customize');
  const [fileName, setFileName] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { setCurrentStep, setUploadedImageUrl } = useAppContext();
  const { value, setValue } = useLocalStorage('userData', { type: 'object' });

  const handleFileUpload = async (values: FormFieldType) => {
    if (!fileName) return;
    setLoading(true);
    try {
      const data = new FormData();
      data.append('file', fileName);
      data.append('upload_preset', 'ticket_generator');
      data.append('cloud_name', 'dkdvogxom');

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dkdvogxom/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );

      const uploadedImageUrl = await res.json();
      const { secure_url } = uploadedImageUrl;
      setUploadedImageUrl(secure_url);
      setCurrentStep(3);
      setValue({
        ...value,
        email: values.email,
        fullName: values.fullName,
        image: secure_url,
        currentStep: value.currentStep < 3 ? value.currentStep + 1 : 3,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish: FormProps<FormFieldType>['onFinish'] = (values) => {
    console.log(values);
    handleFileUpload(values);
  };

  const onFinishFailed: FormProps<FormFieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  const handleFileChange = (file: File) => {
    const objectURL = URL.createObjectURL(file);
    setImagePreview(objectURL);
    setFileName(file);

    return false;
  };

  return (
    <div className='relative top-40 w-[90vw] mx-auto p-6 flex flex-col gap-8 rounded-4xl bg-darkslategray-300 border border-darkslategray-100 md:p-12 md:w-[35rem] lg:w-[43.75rem] text-light-gray'>
      <TicketHeader title='Attendee Details' />

      <section className='bg-[#08252B] p-4 rounded-4xl flex flex-col md:p-6'>
        <section className='py-4 px-6 rounded-3xl border border-[#07373F] relative'>
          <p className='label'>Upload Profile Photo</p>
          <div className='mt-3 relative max-w-60 h-60 mx-auto'>
            <Upload.Dragger
              accept='.jpg, .png, .jpeg'
              beforeUpload={(file) => {
                handleFileChange(file);
                return false;
              }}
              className='mt-1.5 absolute z-40 w-full opacity-0 h-full'
              showUploadList={false}
            />
            <div className='relative z-20 w-full h-full border-4 border-primary-btn/50 bg-darkslategray-100 text-light-gray rounded-4xl flex flex-col gap-4 items-center justify-center'>
              <aside className='p-6 absolute flex flex-col justify-center items-center'>
                <div className='h-8 w-8'>
                  <img
                    src={cloudDownloadImg}
                    alt='cloud download icon'
                    className='w-full h-full'
                  />
                </div>
                <p className='text-center font-roboto text-light-gray'>
                  Drag & drop or click to upload
                </p>
              </aside>
              {imagePreview && (
                <div className='w-full h-full'>
                  <img
                    src={imagePreview}
                    alt='Uploaded Image'
                    className='w-full h-full rounded-4xl'
                  />
                </div>
              )}
            </div>
          </div>
          <aside className='w-[90%] h-[200px] bg-black/20 absolute top-[56%] -translate-y-[50%] left-[5%] hidden md:block'></aside>
        </section>

        <hr className='h-1 my-8 w-full rounded-full border-none bg-[#07373F]' />

        <Form
          layout='vertical'
          form={form}
          name='attendeeDetailsForm'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          requiredMark={
            requiredMark === 'customize' ? CustomizeRequiredMark : requiredMark
          }
          className=''
          id='step-two-form'
        >
          <Form.Item<FormFieldType>
            name='fullName'
            rules={[{ required: true, message: 'Field cannot be empty' }]}
            label={<p className='label'>Enter your fullname *</p>}
          >
            <Input
              variant='borderless'
              size='large'
              style={{
                border: '1px solid #07373f',
                borderRadius: '12px',
              }}
            />
          </Form.Item>
          <Form.Item<FormFieldType>
            name='email'
            rules={[
              { required: true, message: 'Field cannot be empty' },
              {
                pattern: /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim,
                message: 'Please enter a valid email address',
              },
            ]}
            label={<p className='label'>Enter your email *</p>}
          >
            <Input
              prefix={<MailOutlined className='text-white mr-2.5' />}
              variant='borderless'
              size='large'
              style={{
                border: '1px solid #07373f',
                borderRadius: '12px',
              }}
            />
          </Form.Item>

          <Form.Item<FormFieldType>
            name='specialRequest'
            label={<p className='label'>Special Request?</p>}
          >
            <Input.TextArea
              style={{
                resize: 'none',
              }}
              rows={5}
              className='bg-transparent border border-[#07373F] rounded-xl text-white'
              variant='borderless'
            />
          </Form.Item>
        </Form>

        {/* <Form.Item label={null}> */}
        <div className='flex flex-col gap-4 mt-2.5 md:flex-row-reverse'>
          <button
            disabled={loading || !fullName || !email || !fileName}
            className='block bg-primary-btn w-full border-none py-3 px-6 rounded-lg text-white text-base font-jeju disabled:bg-primary-btn/50 disabled:text-white hover:bg-primary-btn/50'
            type='submit'
            form='step-two-form'
          >
            {loading ? 'Generating...' : 'Get My Free Ticket'}
          </button>
          <button
            className='block bg-transparent border border-primary-btn w-full py-3 px-6 rounded-lg text-primary-btn text-base font-jeju hover:bg-primary-btn/50'
            onClick={() => {
              setCurrentStep(1);
            }}
          >
            Back
          </button>
        </div>
      </section>
    </div>
  );
};
export default AttendeeDetails;