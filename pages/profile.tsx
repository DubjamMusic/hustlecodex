import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define validation schema
const profileSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string()
    .email('Please enter a valid email address'),
  displayName: z.string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must not exceed 50 characters'),
  bio: z.string()
    .max(300, 'Bio must not exceed 300 characters')
    .optional()
    .transform(val => val === '' ? undefined : val),
  website: z.string()
    .url('Please enter a valid URL')
    .optional()
    .transform(val => val === '' ? undefined : val),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const isMountedRef = React.useRef(true);
  
  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      email: '',
      displayName: '',
      bio: '',
      website: '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', data);
      
      if (isMountedRef.current) {
        setSubmitSuccess(true);
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          if (isMountedRef.current) {
            setSubmitSuccess(false);
          }
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-2">User Profile</h1>
        <p className="text-gray-400 mb-8">Update your profile information with proper validation</p>

        {submitSuccess && (
          <div className="bg-green-900 border border-green-600 text-green-200 px-4 py-3 rounded mb-6">
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username *
            </label>
            <input
              id="username"
              type="text"
              {...register('username')}
              className={`w-full px-4 py-2 bg-gray-900 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.username
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-700 focus:ring-cyan-500'
              }`}
              placeholder="johndoe"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-4 py-2 bg-gray-900 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-700 focus:ring-cyan-500'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Display Name Field */}
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">
              Display Name *
            </label>
            <input
              id="displayName"
              type="text"
              {...register('displayName')}
              className={`w-full px-4 py-2 bg-gray-900 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.displayName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-700 focus:ring-cyan-500'
              }`}
              placeholder="John Doe"
            />
            {errors.displayName && (
              <p className="mt-1 text-sm text-red-400">{errors.displayName.message}</p>
            )}
          </div>

          {/* Bio Field */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
              Bio (Optional)
            </label>
            <textarea
              id="bio"
              {...register('bio')}
              rows={4}
              className={`w-full px-4 py-2 bg-gray-900 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.bio
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-700 focus:ring-cyan-500'
              }`}
              placeholder="Tell us about yourself... (max 300 characters)"
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-400">{errors.bio.message}</p>
            )}
          </div>

          {/* Website Field */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
              Website (Optional)
            </label>
            <input
              id="website"
              type="url"
              {...register('website')}
              className={`w-full px-4 py-2 bg-gray-900 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.website
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-700 focus:ring-cyan-500'
              }`}
              placeholder="https://yourwebsite.com"
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-400">{errors.website.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save Profile'}
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-800">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Validation Rules:</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Username: 3-20 characters, alphanumeric and underscores only</li>
            <li>• Email: Valid email format required</li>
            <li>• Display Name: 2-50 characters</li>
            <li>• Bio: Maximum 300 characters (optional)</li>
            <li>• Website: Valid URL format (optional)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
