'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '../schemas/login-schema';
import { useLoginMutation } from '../hooks/use-login-mutation';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const loginMutation = useLoginMutation({
    onSuccess: (response) => {
      if (response && response.accessToken) {
        login(response, watch('rememberMe') || false);
      } else {
        setApiError('Authentication failed. Unexpected response format.');
      }
    },
    onError: (err: any) => {
      const responseData = err.response?.data;
      if (responseData && responseData.message) {
        setApiError(responseData.message);
      } else if (err.response?.status === 401) {
        setApiError('Invalid credentials. Please verify your email and password.');
      } else if (err.message === 'Network Error') {
        setApiError('Network connection error. Please verify the backend API is running.');
      } else {
        setApiError('An unexpected server error occurred. Please try again later.');
      }
    }
  });

  const onSubmit = (data: LoginInput) => {
    setApiError(null);
    loginMutation.mutate(data);
  };

  const isLoading = loginMutation.isPending;

  return (
    <Card className="w-full max-w-md border-border bg-card/50 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Visual Accent top bar */}
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
        <CardTitle className="text-2xl font-extrabold tracking-tight">Sign In to BumbleBrick AI</CardTitle>
        <CardDescription className="text-center text-muted-foreground text-sm">
          Enter your admin credentials to access your contractor dashboard
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        {apiError && (
          <div className="flex items-start gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm font-medium mb-5 shadow-sm animate-shake">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="flex-1">{apiError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@bumblebrick.ai"
              disabled={isLoading}
              className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-destructive font-medium mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                disabled
                className="text-xs font-semibold text-muted-foreground cursor-not-allowed hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
              className={errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-destructive font-medium mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <Checkbox id="rememberMe" disabled={isLoading} {...register('rememberMe')} />
            <Label
              htmlFor="rememberMe"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Remember me on this device
            </Label>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full mt-2 font-semibold">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground mt-4 pt-1">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
