'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    { key: 'demonstration' as const, label: t('demonstration') },
    { key: 'reflection' as const, label: t('reflection') },
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="investigation" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            {stages.map((stage) => (
              <TabsTrigger key={stage.key} value={stage.key}>
                {stage.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {stages.map((stage) => {
            const stageData = experience.stages[stage.key];
            return (
              <TabsContent key={stage.key} value={stage.key} className="mt-6 space-y-4">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">{stageData.title}</h3>
                  <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                    {stageData.content}
                  </p>
                </div>

                {/* Images */}
                {stageData.images && stageData.images.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {stageData.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video overflow-hidden rounded-lg border"
                      >
                        <Image
                          src={image}
                          alt={`${stage.label} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
