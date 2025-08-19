"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

const generateQrCodeDataURL = (text: string, size: number): string => {
  if (!text) return '';
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
};

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://example.com');
  const [qrUrl, setQrUrl] = useState('');
  const [size, setSize] = useState(256);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      if (text) {
        const url = generateQrCodeDataURL(text, size);
        setQrUrl(url);
      } else {
        setQrUrl('');
      }
      setIsLoading(false);
    }, 500); // Debounce input

    return () => {
      clearTimeout(handler);
    };
  }, [text, size]);

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
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="size">QR Code Size</Label>
            <span className="text-sm font-medium text-muted-foreground">{size}px</span>
          </div>
          <Slider
            id="size"
            min={100}
            max={512}
            step={1}
            value={[size]}
            onValueChange={(value) => setSize(value[0])}
          />
        </div>

        {qrUrl && (
          <div className="mt-4 p-4 bg-white rounded-md flex items-center justify-center">
            {isLoading ? (
                <div style={{height: `${size}px`, width: `${size}px`}} className="bg-gray-200 animate-pulse rounded-md"></div>
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
