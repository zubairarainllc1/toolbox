
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Download, AspectRatio } from 'lucide-react';
import { Label } from './ui/label';
import Image from 'next/image';

export default function ImageResizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const originalAspectRatio = useRef<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (resizedUrl) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [resizedUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          variant: 'destructive',
          title: 'Invalid File',
          description: 'Please select an image file.',
        });
        return;
      }
      setSelectedFile(file);
      setResizedUrl(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          setWidth(img.width);
          setHeight(img.height);
          originalAspectRatio.current = img.width / img.height;
        };
        img.src = e.target?.result as string;
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value === '' ? '' : parseInt(e.target.value, 10);
    setWidth(newWidth);
    if (keepAspectRatio && newWidth !== '' && originalAspectRatio.current) {
      setHeight(Math.round(newWidth / originalAspectRatio.current));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = e.target.value === '' ? '' : parseInt(e.target.value, 10);
    setHeight(newHeight);
    if (keepAspectRatio && newHeight !== '' && originalAspectRatio.current) {
      setWidth(Math.round(newHeight * originalAspectRatio.current));
    }
  };

  const handleResize = () => {
    if (!selectedFile || width === '' || height === '') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a file and specify dimensions.',
      });
      return;
    }
    setIsResizing(true);
    setResizedUrl(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width as number;
        canvas.height = height as number;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width as number, height as number);
        const dataUrl = canvas.toDataURL(selectedFile.type);
        setResizedUrl(dataUrl);
        setIsResizing(false);
        toast({
          title: 'Success!',
          description: 'Image successfully resized.',
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };
  
  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Upload Image</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div 
          className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors"
          onClick={triggerFileSelect}
        >
          {previewUrl ? (
            <Image src={previewUrl} alt="Image preview" width={200} height={200} className="max-h-48 w-auto object-contain rounded-md" />
          ) : (
            <div className='text-center text-muted-foreground'>
              <UploadCloud className="w-10 h-10 mx-auto" />
              <p className="mt-2 text-sm">
                Click to upload or drag and drop
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        
        {selectedFile && (
            <div className='space-y-4'>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="width">Width</Label>
                        <Input id="width" type="number" value={width} onChange={handleWidthChange} placeholder="e.g. 1920"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="height">Height</Label>
                        <Input id="height" type="number" value={height} onChange={handleHeightChange} placeholder="e.g. 1080"/>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="aspect-ratio" checked={keepAspectRatio} onChange={(e) => setKeepAspectRatio(e.target.checked)} className="form-checkbox h-4 w-4 text-primary transition duration-150 ease-in-out" />
                    <Label htmlFor="aspect-ratio">Keep aspect ratio</Label>
                </div>
            </div>
        )}

        <Button onClick={handleResize} disabled={!selectedFile || isResizing} className="w-full">
          {isResizing ? 'Resizing...' : 'Resize Image'}
        </Button>

        {resizedUrl && (
          <div ref={resultsRef} className="mt-8 text-center">
            <h3 className="font-headline text-lg font-semibold mb-4">Resized Image:</h3>
            <div className="p-4 bg-muted rounded-md inline-block">
                <img src={resizedUrl} alt="Resized" className="mx-auto max-w-full h-auto max-h-64 rounded-md border" />
            </div>
            <a href={resizedUrl} download={`resized-${selectedFile?.name}`}>
              <Button className="mt-4">
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
