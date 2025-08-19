'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Check, Clipboard } from 'lucide-react';
import { Badge } from './ui/badge';

interface GeneratedContentProps {
  title: string;
  items: string[];
  variant?: 'badge' | 'paragraph';
}

export function GeneratedContent({
  title,
  items,
  variant = 'badge',
}: GeneratedContentProps) {
  const [selectedItems, setSelectedItems] = useState(items);
  const [copied, setCopied] = useState(false);

  const handleItemClick = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((t) => t !== item) : [...prev, item]
    );
  };

  const copySelected = () => {
    if (selectedItems.length === 0) return;
    const textToCopy = selectedItems.join(variant === 'badge' ? ' ' : '\n\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-headline text-lg font-semibold">
          {title} ({selectedItems.length}/{items.length})
        </h3>
        <Button variant="outline" size="sm" onClick={copySelected}>
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <Clipboard className="mr-2 h-4 w-4" />
          )}
          {copied ? 'Copied!' : 'Copy Selected'}
        </Button>
      </div>

      {variant === 'badge' ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <Badge
              key={`${item}-${index}`}
              variant={selectedItems.includes(item) ? 'default' : 'secondary'}
              className="cursor-pointer transition-all"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </Badge>
          ))}
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${selectedItems.includes(item) ? 'bg-secondary/80 border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => handleItemClick(item)}
            >
              <div className="flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary transition duration-150 ease-in-out"
                  checked={selectedItems.includes(item)}
                  readOnly
                />
              </div>
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
