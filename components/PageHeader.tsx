import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  badge: string;
  badgeColor?: string;
  title: string;
  titleGradient?: string;
  description: string;
  breadcrumb: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  badgeColor = '#42bfd8',
  title,
  titleGradient,
  description,
  breadcrumb,
}) => {
  return (
    <section className="bg-[#0e1e3e] text-white pt-10 pb-12 sm:pt-14 sm:pb-16 relative overflow-hidden border-b border-slate-800">
      {/* Background glow & subtle patterns */}
      <div className="absolute left-1/4 top-0 w-96 h-96 bg-[#318bc6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-10 bottom-0 w-80 h-80 bg-[#20a88a]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-5 font-medium">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-[#83d6e8]">{breadcrumb}</span>
        </nav>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-4 text-[#83d6e8]">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: badgeColor }}
          />
          <span>{badge}</span>
        </div>

        {/* Title */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-4 max-w-3xl">
          {title}{' '}
          {titleGradient && (
            <span className="spectrum-text-gradient italic font-serif font-light block sm:inline">
              {titleGradient}
            </span>
          )}
        </h1>

        {/* Description */}
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-light">
          {description}
        </p>
      </div>
    </section>
  );
};
