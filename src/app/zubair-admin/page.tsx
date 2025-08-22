
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, User, Eye, EyeOff, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

// Schemas for validation
const setPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const loginSchema = z.object({
  username: z.string().nonempty('Username is required.'),
  password: z.string().nonempty('Password is required.'),
});

type SetPasswordForm = z.infer<typeof setPasswordSchema>;
type LoginForm = z.infer<typeof loginSchema>;

// Mock admin dashboard
const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2"><LayoutDashboard /> Admin Dashboard</CardTitle>
      <CardDescription>Welcome to the admin area.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Here you can manage your application settings.</p>
      <Button onClick={onLogout} variant="outline" className="mt-6">Logout</Button>
    </CardContent>
  </Card>
);

export default function AdminPage() {
  const [pageState, setPageState] = useState<'loading' | 'setup' | 'login' | 'dashboard'>('loading');
  const [storedPassword, setStoredPassword] = useState<string | null>(null);
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form hooks
  const setPasswordForm = useForm<SetPasswordForm>({ resolver: zodResolver(setPasswordSchema) });
  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    // This code runs only on the client
    const password = localStorage.getItem('zubair-admin-password');
    if (password) {
      setStoredPassword(password);
      setPageState('login');
    } else {
      setPageState('setup');
    }
  }, []);

  const handleSetPassword = (data: SetPasswordForm) => {
    localStorage.setItem('zubair-admin-password', data.password);
    setStoredPassword(data.password);
    setPageState('login');
    toast({ title: 'Success', description: 'Password has been set. Please log in.' });
  };

  const handleLogin = (data: LoginForm) => {
    if (data.username === 'wbtool@1' && data.password === storedPassword) {
      sessionStorage.setItem('admin-logged-in', 'true');
      setPageState('dashboard');
      toast({ title: 'Login Successful', description: 'Welcome!' });
    } else {
      toast({ variant: 'destructive', title: 'Login Failed', description: 'Invalid username or password.' });
    }
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('admin-logged-in');
    setPageState('login');
    loginForm.reset();
  };
  
  useEffect(() => {
      const isLoggedIn = sessionStorage.getItem('admin-logged-in');
      if (isLoggedIn && storedPassword) {
          setPageState('dashboard');
      }
  }, [storedPassword]);

  if (pageState === 'loading') {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if(pageState === 'dashboard') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <AdminDashboard onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">{pageState === 'setup' ? 'Admin Setup' : 'Admin Login'}</CardTitle>
          <CardDescription>
            {pageState === 'setup'
              ? 'Set your password to secure the admin panel.'
              : 'Enter your credentials to access the dashboard.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pageState === 'setup' && (
            <form onSubmit={setPasswordForm.handleSubmit(handleSetPassword)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="username" value="wbtool@1" readOnly className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Set Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type={showPassword ? 'text' : 'password'}
                    className="pl-10 pr-10"
                    {...setPasswordForm.register('password')} 
                  />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {setPasswordForm.formState.errors.password && <p className="text-sm text-destructive">{setPasswordForm.formState.errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="pl-10 pr-10"
                    {...setPasswordForm.register('confirmPassword')} 
                  />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {setPasswordForm.formState.errors.confirmPassword && <p className="text-sm text-destructive">{setPasswordForm.formState.errors.confirmPassword.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={setPasswordForm.formState.isSubmitting}>
                Set Password & Secure
              </Button>
            </form>
          )}

          {pageState === 'login' && (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-username">Username</Label>
                 <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="login-username" placeholder="wbtool@1" {...loginForm.register('username')} className="pl-10" />
                </div>
                {loginForm.formState.errors.username && <p className="text-sm text-destructive">{loginForm.formState.errors.username.message}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Password</Label>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="login-password" type={showPassword ? 'text' : 'password'} {...loginForm.register('password')} className="pl-10 pr-10" />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
                {loginForm.formState.errors.password && <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                Login
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
