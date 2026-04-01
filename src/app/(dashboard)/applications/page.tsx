import { z } from "zod";

import { ApplicationCard } from "@/components/partials/applications/application-card";
import {
  applicationApiSchema,
  applicationSchema,
  type Application,
  type ApplicationApi,
} from "@/schemas/application.editable";
import { applicantsApi } from "@/lib/api/applicants";

const applicationsApiSchema = z.array(applicationApiSchema);

function toApplication(application: ApplicationApi): Application {
  return applicationSchema.parse({
    id: application.id,
    status: application.status,
    appliedAt: application.applied_at,
    lastActivityAt: application.last_activity_at,
    location: application.location?.address ?? null,
    source: application.source.public_name,
    jobs: application.jobs.map((job) => job.name),
    currentStage: application.current_stage?.name ?? null,
    recruiter: application.recruiter?.name ?? null,
    coordinator: application.coordinator?.name ?? null,
    isProspect: application.prospect,
  });
}

async function getApplications(): Promise<Application[]> {
  const json: unknown = await applicantsApi.get("applications").json();
  const parsed = applicationsApiSchema.parse(json);

  return parsed.map(toApplication);
}

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Applications</h1>

      {applications.length === 0 ? (
        <p className="text-sm text-muted-foreground">No applications found.</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
}
