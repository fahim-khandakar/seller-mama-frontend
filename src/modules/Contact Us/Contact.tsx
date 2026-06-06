'use client';

import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                Get in <span className="text-orange-500">Touch</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Have a bulk order request or a question about sizing? Drop us a
                message or find us on WhatsApp.
              </p>
            </div>

            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Phone / WhatsApp
                  </p>
                  <p className="text-lg font-bold">+880 1633030788</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Email Support
                  </p>
                  <p className="text-lg font-bold">sellermamabd@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Outlet Address
                  </p>
                  <p className="text-lg font-bold">
                    Outlet Coming Soon — We are currently an online-only shop.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-500">
                  Full Name
                </label>
                <Input
                  placeholder="Enter your name"
                  className="h-12 rounded-xl border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-500">
                  Email
                </label>
                <Input
                  placeholder="example@mail.com"
                  className="h-12 rounded-xl border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-500">
                  Message
                </label>
                <Textarea
                  placeholder="How can we help you?"
                  className="min-h-[150px] rounded-xl border-slate-200"
                />
              </div>
              <div
                className="cursor-not-allowed"
                title="Currently in development, will be available soon!"
              >
                <Button
                  disabled
                  className="w-full h-14  bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-orange-500/30 gap-2 text-md transition-all"
                >
                  Send Message <Send className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
