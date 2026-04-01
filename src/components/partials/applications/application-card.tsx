import { Application } from "@/schemas/application.editable";

type ApplicationCardProps = {
  application: Application;
};

export function ApplicationCard({ application }: ApplicationCardProps) {
  const appliedAt = new Date(application.appliedAt).toLocaleString();
  const lastActivityAt = new Date(application.lastActivityAt).toLocaleString();

  const jobsLabel =
    application.jobs.length > 0 ? application.jobs.join(", ") : "No job linked";

  const statusLabel = application.status
    ? application.status.charAt(0).toUpperCase() + application.status.slice(1)
    : "Unknown";

  const statusStyles: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    hired: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm transition-colors hover:bg-accent/30">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold leading-tight">
            Application #{application.id}
          </h2>
          <p className="mt-1 text-base leading-snug text-muted-foreground">
            {jobsLabel}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${
            statusStyles[application.status] ?? "bg-muted text-foreground"
          }`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Source
          </p>
          <p className="text-base">{application.source}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Current stage
          </p>
          <p className="text-base">{application.currentStage ?? "—"}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Location
          </p>
          <p className="text-base">{application.location ?? "—"}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Prospect
          </p>
          <p className="text-base">{application.isProspect ? "Yes" : "No"}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Recruiter
          </p>
          <p className="text-base">{application.recruiter ?? "—"}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Coordinator
          </p>
          <p className="text-base">{application.coordinator ?? "—"}</p>
        </div>
      </div>

      <div className="mt-5 border-t pt-3">
        <div className="flex flex-col gap-1 text-base text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Applied at: {appliedAt}</p>
          <p>Last activity: {lastActivityAt}</p>
        </div>
      </div>
    </div>
  );
}
