"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Download, AspectRatio } from 'lucide-react';
import { Label } from './ui/label';

export default function ImageResizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const originalAspectRatio = useRef<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setWidth(img.width);
          setHeight(img.height);
          originalAspectRatio.current = img.width / img.height;
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
      setResizedUrl(null);
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
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
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
          className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted"
          onClick={triggerFileSelect}
        >
          <UploadCloud className="w-10 h-10 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
          </p>
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
          <div className="mt-8 text-center">
            <h3 className="font-headline text-lg font-semibold mb-4">Resized Image:</h3>
            <img src={resizedUrl} alt="Resized" className="mx-auto max-w-full rounded-md border" />
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
