import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/Input/Input';
import { Select } from '../../../components/Select/Select';
import { Button } from '../../../components/Button/Button';
import { FileUpload } from '../../../components/FileUpload/FileUpload';
import { CheckCircle, Shield } from 'lucide-react';
import {
  ComplianceFormData,
  SUBJECT_TYPES,
  complianceFormSchema,
} from '../../../types/compliance';

export const CompliancePage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [protocol, setProtocol] = React.useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<ComplianceFormData>({
    resolver: zodResolver(complianceFormSchema),
    defaultValues: {
      attachments: []
    }
  });

  const description = watch('description', '');
  const attachments = watch('attachments', []);

  const onSubmit = async (data: ComplianceFormData) => {
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
          <p className="text-gray-600 mb-4">
            Your compliance request has been submitted successfully.
            We will review it and get back to you soon.
          </p>
          <p className="text-sm text-gray-500">Protocol: {protocol}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Compliance Request</h1>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Select
            label="Subject Type *"
            options={SUBJECT_TYPES}
            {...register('subject')}
            error={errors.subject?.message}
          />
          
          <Input
            label="Title *"
            {...register('title')}
            error={errors.title?.message}
          />
          
          <Input
            label="Email *"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          
          <Input
            label="Full Name (Optional)"
            {...register('fullName')}
            error={errors.fullName?.message}
          />
          
          <Input
            label="Company/Institution (Optional)"
            {...register('company')}
            error={errors.company?.message}
          />
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Attachments
            </label>
            <FileUpload
              files={attachments}
              onChange={(files) => setValue('attachments', files)}
              error={errors.attachments?.message}
            />
          </div>
          
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full"
          >
            Submit Request
          </Button>
        </form>
      </div>
    </div>
  );
};