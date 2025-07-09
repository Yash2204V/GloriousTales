import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Mail } from 'lucide-react';

const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
      handleUnsubscribe(emailParam);
    } else {
      setStatus('error');
    }
  }, [searchParams]);

  const handleUnsubscribe = async (emailAddress) => {
    try {
      const response = await fetch('http://localhost:5000/api/subscriptions/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailAddress }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        toast({
          title: "Unsubscribed successfully",
          description: "You have been removed from our newsletter.",
        });
      } else {
        setStatus('error');
        toast({
          title: "Unsubscribe failed",
          description: data.error || "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      setStatus('error');
      toast({
        title: "Connection error",
        description: "Unable to connect to server. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleManualUnsubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }
    await handleUnsubscribe(email);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Processing your unsubscribe request...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Unsubscribe from Newsletter
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {status === 'success' ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Successfully Unsubscribed!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You have been removed from our newsletter. You won't receive any more email notifications from Glorious Tales.
              </p>
              <div className="space-y-3">
                <Link to="/">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white">
                    Visit Glorious Tales
                  </Button>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You can always subscribe again from our website.
                </p>
              </div>
            </div>
          ) : status === 'error' ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Unsubscribe Failed
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't process your unsubscribe request. Please try again or contact us.
              </p>
              
              <form onSubmit={handleManualUnsubscribe} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                >
                  Unsubscribe
                </Button>
              </form>
              
              <div className="mt-6">
                <Link to="/">
                  <Button variant="outline" className="w-full">
                    Back to Website
                  </Button>
                </Link>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default UnsubscribePage; 