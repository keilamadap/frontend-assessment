import { z } from "zod";

// TODO: define the full API response schema from the shape described in the README
export const applicationApiSchema = z.object({
  id: z.number(),
  candidate_id: z.number(),
  prospect: z.boolean(),
  applied_at: z.string(),
  rejected_at: z.string().nullable(),
  last_activity_at: z.string(),

  location: z
    .object({
      address: z.string(),
    })
    .nullable(),

  source: z.object({
    id: z.number(),
    public_name: z.string(),
  }),

  credited_to: z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    name: z.string(),
    employee_id: z.string(),
  }),

  recruiter: z
    .object({
      id: z.number(),
      first_name: z.string(),
      last_name: z.string(),
      name: z.string(),
      employee_id: z.string(),
    })
    .nullable(),

  coordinator: z
    .object({
      id: z.number(),
      first_name: z.string(),
      last_name: z.string(),
      name: z.string(),
      employee_id: z.string(),
    })
    .nullable(),

  rejection_reason: z.string().nullable(),
  rejection_details: z.string().nullable(),

  jobs: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),

  job_post_id: z.number().nullable(),

  status: z.string(),

  current_stage: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable(),

  answers: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),

  prospective_office: z
    .object({
      id: z.number(),
      name: z.string(),
      location: z
        .object({
          name: z.string(),
        })
        .nullable(),
      parent_id: z.number().nullable(),
      primary_contact_user_id: z.number().nullable(),
      external_id: z.string().nullable(),
      child_ids: z.array(z.number()),
    })
    .nullable(),

  prospective_department: z
    .object({
      id: z.number(),
      name: z.string(),
      parent_id: z.number().nullable(),
      external_id: z.string().nullable(),
      child_ids: z.array(z.number()),
    })
    .nullable(),

  prospect_detail: z.object({
    prospect_pool: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable(),
    prospect_stage: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable(),
    prospect_owner: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable(),
  }),

  custom_fields: z.record(z.string(), z.string()),

  keyed_custom_fields: z.record(
    z.string(),
    z.object({
      name: z.string(),
      type: z.string(),
      value: z.string(),
    }),
  ),

  attachments: z.array(
    z.object({
      filename: z.string(),
      url: z.string().url(),
      type: z.string(),
      created_at: z.string().datetime(),
    }),
  ),
});

export type ApplicationApi = z.infer<typeof applicationApiSchema>;

// TODO: define what gets exposed to the frontend — only the fields needed to render the card
export const applicationSchema = z.object({
  id: z.number(),
  status: z.string(),
  appliedAt: z.string(),
  lastActivityAt: z.string(),
  location: z.string().nullable(),
  source: z.string(),
  jobs: z.array(z.string()),
  currentStage: z.string().nullable(),
  recruiter: z.string().nullable(),
  coordinator: z.string().nullable(),
  isProspect: z.boolean(),
});

export type Application = z.infer<typeof applicationSchema>;
