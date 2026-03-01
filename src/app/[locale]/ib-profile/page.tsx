import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Locale } from '@/lib/types';
import { readFileSync } from 'fs';
import { join } from 'path';

interface IBProfileContent {
  title: string;
  subtitle: string;
  introduction: string;
  profiles: Array<{
    attribute: string;
    icon: string;
    description: string;
    casConnection: string;
  }>;
}

async function getContent(locale: Locale): Promise<IBProfileContent> {
  const filePath = join(process.cwd(), 'src/content/ib-profile', `${locale}.json`);
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function IBProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getContent(locale as Locale);

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {content.title}
          </h1>
          <p className="text-xl text-muted-foreground">{content.subtitle}</p>
        </div>

        {/* Introduction */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">{content.introduction}</p>
          </CardContent>
        </Card>

        {/* IB Profile Attributes */}
        <div className="space-y-6">
          {content.profiles.map((profile, idx) => (
            <Card key={idx} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background text-4xl shadow-sm">
                    {profile.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{profile.attribute}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* IB Description */}
                  <div>
                    <h4 className="mb-2 font-semibold text-primary">IB Learner Profile</h4>
                    <p className="leading-relaxed text-muted-foreground">
                      {profile.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t"></div>

                  {/* CAS Connection */}
                  <div>
                    <h4 className="mb-2 font-semibold text-primary">CAS Connection</h4>
                    <p className="leading-relaxed text-muted-foreground">
                      {profile.casConnection}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
