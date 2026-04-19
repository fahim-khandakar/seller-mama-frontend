/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRegisterUserMutation } from '@/redux/features/dashboard/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, MapPin, Image, Shield } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  picture?: string;
  address?: string;
  isActive: 'ACTIVE' | 'INACTIVE';
  isVerified: boolean;
};

export default function CustomerCreate() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      isActive: 'ACTIVE',
      isVerified: false,
    },
  });
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const customerData = { ...data, role: 'CUSTOMER' };
      await registerUser(customerData).unwrap();
      toast.success('Customer created successfully!');
      router.push('/dashboard/customers');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create customer');
    }
  };

  return (
    <div className="shadow-md pt-5 px-5 rounded-md">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
            Create <span className="text-orange-600">Customer</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <User className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Full Name
                </Label>
              </div>
              <Input
                {...register('name', { required: 'Name is required' })}
                placeholder="Enter full name"
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <Mail className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Email Address
                </Label>
              </div>
              <Input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Enter email"
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <Lock className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Password
                </Label>
              </div>
              <Input
                type="password"
                {...register('password', { required: 'Password is required' })}
                placeholder="Enter password"
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <Phone className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Phone
                </Label>
              </div>
              <Input
                {...register('phone')}
                placeholder="Enter phone number"
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
            </div>

            {/* Picture */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <Image className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Picture URL
                </Label>
              </div>
              <Input
                {...register('picture')}
                placeholder="Enter picture URL"
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <MapPin className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Address
                </Label>
              </div>
              <Input
                {...register('address')}
                placeholder="Enter address"
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
            </div>

            {/* Is Active */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <Shield className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Status
                </Label>
              </div>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium focus-visible:ring-2 focus-visible:ring-orange-600/50"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                )}
              />
            </div>

            {/* Is Verified */}
            <div className="flex items-center space-x-2">
              <Controller
                name="isVerified"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="isVerified"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label
                htmlFor="isVerified"
                className="text-[10px] font-black uppercase text-slate-500 tracking-widest"
              >
                Verified
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-slate-900 dark:bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-orange-600/20 transition-all active:scale-95"
            >
              {isLoading ? 'Creating...' : 'Create Customer'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
