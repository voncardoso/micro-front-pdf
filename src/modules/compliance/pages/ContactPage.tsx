import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/Input/Input';
import { Select } from '../../../components/Select/Select';
import { Button } from '../../../components/Button/Button';
import { ContactFormData, ACTIVITY_AREAS, SERVICE_TYPES } from '../../../types/form';
import { contactFormSchema } from '../../../utils/validation';
import { CheckCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [protocol, setProtocol] = React.useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const description = watch('description', '');

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newProtocol = Math.random().toString(36).substring(2, 15);
    setProtocol(newProtocol);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
          <p className="text-gray-600 mb-4">Your message has been received.</p>
          <p className="text-sm text-gray-500">Protocol: {protocol}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Name"
            {...register('name')}
            error={errors.name?.message}
          />
          
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          
          <Input
            label="Phone"
            {...register('phone')}
            error={errors.phone?.message}
          />
          
          <Select
            label="Area of Activity"
            options={ACTIVITY_AREAS}
            {...register('activityArea')}
            error={errors.activityArea?.message}
          />
          
          <Select
            label="Type of Service"
            options={SERVICE_TYPES}
            {...register('serviceType')}
            error={errors.serviceType?.message}
          />
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register('description')}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={4}
            />
            <div className="mt-1 flex justify-between">
              <p className={errors.description ? 'text-red-500' : 'text-gray-500'}>
                {description.length}/1000 characters
              </p>
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>
          
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};