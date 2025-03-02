import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Breadcrumb = {
  label: string;
  href: string;
};

type PageHeaderProps = {
  heading: string;
  subheading?: string;
  action?: {
    label: string;
    href: string;
  };
  breadcrumbs?: Breadcrumb[];
};

export function PageHeader({
  heading,
  subheading,
  action,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-muted-foreground">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb.href} className="flex items-center">
                {index > 0 && <ChevronRight className="mx-1 h-4 w-4" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-foreground">
                    {breadcrumb.label}
                  </span>
                ) : (
                  <Link
                    to={breadcrumb.href}
                    className="hover:text-foreground hover:underline"
                  >
                    {breadcrumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
          {subheading && <p className="text-muted-foreground">{subheading}</p>}
        </div>
        {action && (
          <Button asChild>
            <Link to={action.href}>{action.label}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
