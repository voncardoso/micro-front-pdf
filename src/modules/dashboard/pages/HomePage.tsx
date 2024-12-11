import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import { MessageSquare, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Our Service
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get in touch with our team to discuss your needs and how we can help you achieve your goals.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto sm:mr-4 mb-4 sm:mb-0"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto"
            >
              <Users className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: '🚀',
              title: 'Fast Response',
              description: 'Get quick responses from our dedicated team'
            },
            {
              icon: '💡',
              title: 'Expert Solutions',
              description: 'Tailored solutions for your specific needs'
            },
            {
              icon: '🤝',
              title: 'Reliable Support',
              description: '24/7 support to help you succeed'
            }
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};