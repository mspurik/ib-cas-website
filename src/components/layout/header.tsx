import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { useTranslations } from 'next-intl';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export function Header() {
  const t = useTranslations('navigation');
  const lo = useTranslations('learningOutcomes');
  const org = useTranslations('organization');

  return (
    <div className="w-full">
      <header className="sticky top-0 z-50 w-full border-b bg-white text-black shadow-sm dark:bg-[color:var(--sidebar)] dark:text-white">
        <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full flex items-center justify-center text-lg font-extrabold text-white shadow-md" style={{ background: 'var(--brand-1)', border: '2px solid var(--brand-3)' }}>
            C
          </div>
          <span className="text-xl font-bold">Carpeta CAS</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium transition-all hover:scale-105 hover:underline text-black dark:text-white">
            {t('home')}
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-black dark:text-white">CAS Info</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/what-is-cas"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('whatIsCAS')}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/what-is-cas/learning-outcomes"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {lo('title')}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/ib-profile"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('ibProfile')}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/organization"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                            <div className="text-sm font-medium leading-none">
                              {org('title')}
                            </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/swot"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('swot')}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/experiences" className="text-sm font-medium transition-all hover:scale-105">
            {t('experiences')}
          </Link>

          <Link href="/interviews" className="text-sm font-medium transition-all hover:scale-105">
            {t('interviews')}
          </Link>

          <Link href="/final-reflection" className="text-sm font-medium transition-all hover:scale-105">
            {t('finalReflection')}
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile menu - will add later */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  </div>
  );
}
