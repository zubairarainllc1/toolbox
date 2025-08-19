"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';
import { Label } from './ui/label';

// Basic QR Code generation logic (no external library needed for simple cases)
const generateQrCodeDataURL = (text: string): string => {
  // This is a simplified implementation. For robust QR codes, a library is better.
  // However, for a quick tool, we can use an external API.
  // Using goqr.me API for simplicity and to avoid heavy client-side libraries.
  if (!text) return '';
  return `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(text)}`;
};

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://example.com');
  const [qrUrl, setQrUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      if (text) {
        const url = generateQrCodeDataURL(text);
        setQrUrl(url);
      } else {
        setQrUrl('');
      }
      setIsLoading(false);
    }, 500); // Debounce input

    return () => {
      clearTimeout(handler);
    };
  }, [text]);

  const handleDownload = () => {
    if (!qrUrl) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No QR code to download.',
      });
      return;
    }
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
     toast({
        title: 'Success!',
        description: 'QR Code download started.',
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Enter Text or URL</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="qr-text">Text / URL</Label>
            <Input
                id="qr-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g., https://google.com"
            />
        </div>

        {qrUrl && (
          <div className="mt-4 p-4 bg-white rounded-md flex items-center justify-center">
            {isLoading ? (
                <div className="h-64 w-64 bg-gray-200 animate-pulse rounded-md"></div>
            ) : (
                <img src={qrUrl} alt="Generated QR Code" className="max-w-full h-auto" />
            )}
          </div>
        )}
        
        <Button onClick={handleDownload} disabled={!qrUrl || isLoading} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            {isLoading ? 'Generating...' : 'Download QR Code'}
        </Button>
      </CardContent>
    </Card>
  );
}
