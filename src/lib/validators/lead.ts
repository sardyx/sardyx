import { z } from "zod";

export const LeadSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().max(100).optional().or(z.literal("")),
  service_label: z.string().optional().or(z.literal("")),
  budget_range: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Project message must be at least 10 characters").max(3000),
  consent: z.boolean().refine((val) => val === true, "Consent is required to submit"),
  website_hp: z.string().optional().or(z.literal("")), // Honeypot
  source: z.string().default("contact_form"),
  utm: z.record(z.any()).default({}),
});

export type LeadInput = z.infer<typeof LeadSchema>;

