
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Download, Image as ImageIcon } from 'lucide-react';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import Image from 'next/image';

export default function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [format, setFormat] = useState('png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (convertedUrl) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [convertedUrl]);

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
      setConvertedUrl(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = () => {
    if (!selectedFile) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a file first.',
      });
      return;
    }
    setIsConverting(true);
    setConvertedUrl(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            if (format === 'jpeg' && selectedFile.type !== 'image/jpeg') {
                ctx.fillStyle = '#fff';
                ctx.fillRect(0,0,canvas.width, canvas.height)
            }
            ctx.drawImage(img, 0, 0);
        }
        const dataUrl = canvas.toDataURL(`image/${format}`);
        setConvertedUrl(dataUrl);
        setIsConverting(false);
        toast({
          title: 'Success!',
          description: `Image successfully converted to ${format.toUpperCase()}.`,
        });
      };
      img.onerror = () => {
          setIsConverting(false);
          toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Could not load the image for conversion.'
          })
      }
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
        setIsConverting(false);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to read the file.'
        })
    }
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
            accept="image/png, image/jpeg, image/webp, image/gif"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {selectedFile && (
            <div className='text-center text-sm font-medium text-foreground'>
                {selectedFile.name}
            </div>
        )}
        
        <div className="space-y-2">
            <Label htmlFor="format">Convert To</Label>
            <Select onValueChange={setFormat} defaultValue={format} disabled={!selectedFile}>
              <SelectTrigger id="format">
                <SelectValue placeholder="Select a format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpeg">JPG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>

        <Button onClick={handleConvert} disabled={!selectedFile || isConverting} className="w-full">
          {isConverting ? 'Converting...' : 'Convert Image'}
        </Button>

        {convertedUrl && (
          <div ref={resultsRef} className="mt-8 text-center">
            <h3 className="font-headline text-lg font-semibold mb-4">Converted Image:</h3>
            <div className="p-4 bg-muted rounded-md inline-block">
                <img src={convertedUrl} alt="Converted" className="mx-auto max-w-full h-auto max-h-64 rounded-md border" />
            </div>
            <a href={convertedUrl} download={`converted-image.${format}`}>
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
