'use client';

import React, { useState } from 'react';
// import { 
//   auth, 
//   signInWithEmailAndPassword, 
//   signInWithDiscord 
// } from '../../../firebaseConfig';
// import { useSession, signIn, signOut } from 'next-auth/react';
import { z, ZodSchema } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { FaGoogle, FaDiscord } from 'react-icons/fa';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthProvider';
import { useSession, signIn } from 'next-auth/react';

// change to server (redirect instead of useRouter) for performance and SEO
import { useRouter } from 'next/navigation';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { toast } from 'react-hot-toast';

// Define types for state variables
interface Errors {
  [key: string]: string | undefined;
}

interface Touched {
  [key: string]: boolean | undefined;
}

interface AuthFormProps {
  mode: 'signin' | 'signup' | 'resetPassword';
  schema: ZodSchema;
  children: React.ReactNode;
}

interface FieldValues {
  email: string;
  password: string;
}


const AuthForm = ({ mode, schema, children }: AuthFormProps) => {
  const { googleSignIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // import and initalize zod schema

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      if (mode === 'signin') {
        await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        }).then((result) => {
          if (result && result.error) {
            console.error(result.error);
          } else {
            console.log('Logged in');
            // make sure that the tokens match
            router.push('/dashboard');
          }
        });
      } else if (mode === 'signup') {
        // Add sign-up logic
      } else if (mode === 'resetPassword') {
        // Add reset password logic
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const user = await googleSignIn();
      console.log(user, "Logged in with Google");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscordSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithDiscord();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostAuth = (user: { uid: any; }) => {
    // Check if the user exists in the database
    // This is a placeholder logic; replace with actual database check
    const userExists = checkUserInDatabase(user.uid);
    if (!userExists) {
      router.push('/onboarding');
    } else {
      router.push('/dashboard');
    }
  };

  const checkUserInDatabase = (uid: string) => {
    // Placeholder function to check user in database
    // Replace with actual database call
    return false; // Assuming the user does not exist for demonstration
  };

  const handleResetPassword = async () => {
    // Implement password reset logic
  };

  const handleSignUp = async () => {
    // Implement sign up logic
  };

  const inputClassNames = (field: keyof FieldValues) => {
    let baseClasses = "w-full px-4 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors";
    if (errors[field]) {
      baseClasses += " border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500";
    }
    return baseClasses;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 via-blue-500 to bg-purple-500 p-4 font-Inter" style={{ animation: 'bounceIn 1s ease-in-out' }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            {...register('email')}
            placeholder="Email"
            className={inputClassNames('email')}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

          {mode !== 'resetPassword' && (
            <>
              <input
                type="password"
                {...register('password')}
                placeholder="Password"
                className={inputClassNames('password')}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1 pb-1">{errors.password.message}</p>}
            </>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={isLoading}
          >
            <div className="flex items-center justify-center">
              <LogIn className="mr-2 h-4 w-4" />
              {isLoading ? 'Loading...' : mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}
            </div>
          </motion.button>
        </form>

        <div className="mt-4 flex flex-col space-y-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 transition duration-300"
            disabled={isLoading}
          >
            <FaGoogle className="mr-2" /> Continue with Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDiscordSignIn}
            className="flex items-center justify-center w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            disabled={isLoading}
          >
            <FaDiscord className="mr-2" /> Continue with Discord
          </motion.button>

          {children}

        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
