'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { CASExperience } from '@/lib/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface CASStagesProps {
  experience: CASExperience;
}

export function CASStages({ experience }: CASStagesProps) {
  const t = useTranslations('stages');

  const stages = [
    { key: 'investigation' as const, label: t('investigation') },
    { key: 'preparation' as const, label: t('preparation') },
    { key: 'action' as const, label: t('action') },
    { key: 'reflection' as const, label: t('reflection') },
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="w-full space-y-6">
          {stages.map((stage) => {
            const stageData = experience.stages[stage.key];
            if (!stageData) return null;
            const contentIsArray = Array.isArray(stageData.content);

            return (
              <section key={stage.key} className="rounded-md border p-4">
                <h3 className="mb-3 text-xl font-semibold">{stageData.title}</h3>

                {contentIsArray ? (
                  <>
                        {stageData.content.map((paragraph: string, pidx: number) => (
                          <div key={pidx}>
                            <p className="whitespace-pre-line leading-relaxed text-muted-foreground text-justify">
                              {paragraph}
                            </p>

                        {/* render images that should appear after this paragraph */}
                        {stageData.images && stageData.images.length > 0 && (
                          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:items-start">
                            {stageData.images
                              .map((img: any, index: number) => {
                                if (typeof img === 'string') {
                                  // legacy: string images are inserted after paragraph 0
                                  return { src: img, position: 0 };
                                }
                                return img;
                              })
                              .filter((img: any) => (img.position ?? 0) === pidx)
                              .map((img: any, idx: number) => (
                                <div key={idx} className="rounded-lg border overflow-hidden flex justify-center">
                                    <Image
                                      src={img.src}
                                      alt={`${stage.label} - Image ${idx + 1}`}
                                      width={2400}
                                      height={1600}
                                      style={img.rotate ? { transform: `rotate(${img.rotate}deg)` } : undefined}
                                      className="mx-auto max-w-[1800px] w-full h-auto object-contain"
                                    />
                                  </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <p className="whitespace-pre-line leading-relaxed text-muted-foreground text-justify">
                      {stageData.content}
                    </p>

                    {/* Images */}
                    {stageData.images && stageData.images.length > 0 && (
                      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:items-start">
                        {stageData.images.map((image, index) => {
                          const imgObj = typeof image === 'string' ? { src: image } : image;
                          return (
                            <div key={index} className="rounded-lg border overflow-hidden flex justify-center">
                              <Image
                                src={imgObj.src}
                                alt={`${stage.label} - Image ${index + 1}`}
                                width={2400}
                                height={1600}
                                style={imgObj.rotate ? { transform: `rotate(${imgObj.rotate}deg)` } : undefined}
                                className="mx-auto max-w-[1800px] w-full h-auto object-contain"
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </section>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
