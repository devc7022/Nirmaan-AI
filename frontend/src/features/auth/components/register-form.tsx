'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerSchema, RegisterInput } from '../schemas/register-schema';
import { useRegisterMutation } from '../hooks/use-register-mutation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    }
  });

  const registerMutation = useRegisterMutation({
    onSuccess: (response) => {
      setSuccessMessage(response.message || 'Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    },
    onError: (err: any) => {
      const responseData = err.response?.data;
      if (responseData && responseData.message) {
        setApiError(responseData.message);
      } else if (err.response?.status === 409) {
        setApiError('This email is already registered. Please sign in or use another email.');
      } else if (err.message === 'Network Error') {
        setApiError('Network connection error. Please verify the backend API is running.');
      } else {
        setApiError('An unexpected server error occurred. Please try again.');
      }
    }
  });

  const onSubmit = (data: RegisterInput) => {
    setApiError(null);
    setSuccessMessage(null);
    registerMutation.mutate(data);
  };

  const isLoading = registerMutation.isPending;

  return (
    <Card className="w-full max-w-md border-border bg-card/50 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Accent top bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-orange-500 to-amber-500" />

      <CardHeader className="space-y-1.5 items-center pb-2">
        <div className="mb-2 w-16 h-16 flex items-center justify-center">
          <Image
            src="/images/bumble_brick_building_only_logo.png"
            alt="BumbleBrick AI Logo"
            width={64}
            height={64}
            className="object-contain w-full h-full"
            unoptimized
            priority
          />
        </div>
        <CardTitle className="text-2xl font-extrabold tracking-tight">Create an Account</CardTitle>
        <CardDescription className="text-center text-muted-foreground text-sm">
          Sign up for a contractor account to manage your construction sites
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        {apiError && (
          <div className="flex items-start gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm font-medium mb-5 shadow-sm">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="flex-1">{apiError}</div>
          </div>
        )}

        {successMessage && (
          <div className="flex items-start gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-500 text-sm font-medium mb-5 shadow-sm">
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="flex-1">{successMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Aarav Sharma"
              disabled={isLoading || !!successMessage}
              className={errors.fullName ? 'border-destructive focus-visible:ring-destructive' : ''}
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive font-medium mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="aarav@example.com"
              disabled={isLoading || !!successMessage}
              className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-destructive font-medium mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••••••"
              disabled={isLoading || !!successMessage}
              className={errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-destructive font-medium mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading || !!successMessage} className="w-full mt-4 font-semibold">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground mt-4 pt-1">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
