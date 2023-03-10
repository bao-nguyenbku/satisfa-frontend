import React from 'react';
import Input from '@/components/input';
import { Button } from '@mui/material';


const Register = () => {
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col m-auto text-white">
        <div className='flex flex-col gap-3 mb-16'>
          <h2 className="font-bold text-3xl">Get started to use our services</h2>
          <h4>Create your account now</h4>
        </div>
        <div className='w-96 flex flex-col gap-14'>
          <Input type="email" label="Email" placeholder='example@gmail.com'/>
          <Input type="password" label="Password" placeholder='******'/>
          <Input type="password" label="Confirm password" placeholder='******'/>
          <Button className="bg-primary-yellow hover:bg-primary-yellow text-white font-bold py-6 rounded-none">
            Sign up now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
