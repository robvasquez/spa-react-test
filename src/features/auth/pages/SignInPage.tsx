import { SignInForm } from '../components/SignInForm';

export function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please enter your credentials to continue.
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <SignInForm />
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Test credentials: user@example.com / Password123!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
