import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface AdSenseAdProps {
  publisherId: string;
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
}

export default function AdSenseAd({
  publisherId,
  slotId = 'default',
  format = 'auto',
  responsive = true,
  className = ''
}: AdSenseAdProps) {
  
  // Format publisher ID correctly
  let formattedPubId = publisherId.trim();
  if (formattedPubId) {
    if (formattedPubId.startsWith('pub-')) {
      formattedPubId = 'ca-' + formattedPubId;
    } else if (!formattedPubId.startsWith('ca-pub-')) {
      formattedPubId = 'ca-pub-' + formattedPubId;
    }
  }

  useEffect(() => {
    // Only attempt to push when window.adsbygoogle is available on production
    try {
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      }
    } catch (e) {
      console.warn('AdSense push failed (this is normal in development environments):', e);
    }
  }, [formattedPubId, slotId]);

  return (
    <div className={`w-full overflow-hidden my-6 ${className}`} id={`adsense-wrapper-${slotId}`}>
      {/* Real Google AdSense Tag */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client={formattedPubId}
        data-ad-slot={slotId === 'default' ? '1234567890' : slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />

      {/* Elegant Visual Sandbox/Preview Container for Developers/Users */}
      <div className="relative rounded-2xl border border-dashed border-zinc-900 bg-zinc-950/20 p-6 flex flex-col items-center justify-center text-center space-y-2 mt-2 group hover:border-teal-500/20 transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-500/10 to-transparent"></div>
        
        <div className="flex items-center space-x-1.5 text-xs font-extrabold text-teal-400 uppercase tracking-widest bg-teal-500/10 px-2.5 py-1 rounded-lg">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>Google AdSense Aktif Reklam Alanı</span>
        </div>
        
        <div className="space-y-1">
          <span className="text-xs font-bold text-zinc-400 block">
            Reklamlar Google Tarafından Yüklenecektir
          </span>
          <span className="text-[10px] text-zinc-500 font-mono block">
            Yayıncı Kimliği: <span className="text-zinc-300">{formattedPubId}</span> • Slot ID: <span className="text-zinc-300">{slotId}</span>
          </span>
        </div>
        
        <p className="text-[10px] text-zinc-600 max-w-sm">
          AdSense onay sürecinden sonra burası otomatik olarak gelir kazandıran Google reklamları ile doldurulacaktır.
        </p>
      </div>
    </div>
  );
}
