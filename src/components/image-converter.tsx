"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Download } from 'lucide-react';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [format, setFormat] = useState('png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setConvertedUrl(null);
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
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL(`image/${format}`);
        setConvertedUrl(dataUrl);
        setIsConverting(false);
        toast({
          title: 'Success!',
          description: `Image successfully converted to ${format.toUpperCase()}.`,
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
        
        <div className="space-y-2">
            <Label htmlFor="format">Convert To</Label>
            <Select onValueChange={setFormat} defaultValue={format}>
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
          <div className="mt-8 text-center">
            <h3 className="font-headline text-lg font-semibold mb-4">Converted Image:</h3>
            <img src={convertedUrl} alt="Converted" className="mx-auto max-w-full rounded-md border" />
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
