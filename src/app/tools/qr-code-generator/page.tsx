import QrCodeGenerator from "@/components/qr-code-generator";
import { QrCode } from "lucide-react";

export default function QrCodeGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <QrCode className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold font-headline sm:text-5xl">
            QR Code Generator
          </h1>
        </div>
        <p className="max-w-2xl text-muted-foreground md:text-lg">
          Enter any text or URL to instantly generate a scannable QR code.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-2xl">
        <QrCodeGenerator />
      </div>
    </div>
  );
}
