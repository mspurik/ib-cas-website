import Image from 'next/image';
import type { AboutContent } from '@/lib/types';
import { Mail } from 'lucide-react';

interface HeroSectionProps {
  about: AboutContent;
}

export function HeroSection({ about }: HeroSectionProps) {
  return (
    <section className="container py-12 md:py-20">
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
        {/* Profile Image */}
        <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-full border-4 border-primary/20 md:h-64 md:w-64">
          {about.profileImage ? (
            <Image
              src={about.profileImage}
              alt={about.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
              <span className="text-6xl font-bold text-white md:text-8xl">
                {about.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {about.name}
          </h1>
          <p className="text-xl text-muted-foreground md:text-2xl">
            {about.title}
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {about.bio}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 md:justify-start">
            <div className="rounded-lg bg-secondary px-4 py-2">
              <p className="text-sm font-medium">{about.school}</p>
            </div>
            <div className="rounded-lg bg-secondary px-4 py-2">
              <p className="text-sm font-medium">
                Class of {about.graduationYear}
              </p>
            </div>
          </div>
          {about.socialLinks?.email && (
            <div className="flex justify-center gap-4 pt-4 md:justify-start">
              <a
                href={`mailto:${about.socialLinks.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {about.socialLinks.email}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
