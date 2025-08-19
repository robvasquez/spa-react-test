import React, { useState } from 'react';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../../../components/forms/Input';
import { FormError } from '../../../components/forms/FormError';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<SignInFormData>>({});
  const [formError, setFormError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: keyof SignInFormData, value: string) => {
    try {
      signInSchema.shape[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  const handleInputChange = (field: keyof SignInFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
    setFormError(''); // Clear form error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    try {
      const validatedData = signInSchema.parse(formData);
      setIsSubmitting(true);
      await signIn(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<SignInFormData> = {};
        error.errors.forEach(err => {
          const field = err.path[0] as keyof SignInFormData;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      } else if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = signInSchema.safeParse(formData).success;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormError error={formError} />
      
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleInputChange('email')}
        error={errors.email}
        placeholder="Enter your email"
        autoComplete="email"
        required
      />

      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleInputChange('password')}
        error={errors.password}
        placeholder="Enter your password"
        autoComplete="current-password"
        required
      />

      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="btn-primary w-full"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Signing in...
          </div>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
}
