import { z } from "zod";

export const ResumeSchema = z.object({
  profile: z.object({
    name: z.string(),
    title: z.string(),
    location: z.string().optional(),
    introduction: z.string().optional(),
    keyStrengths: z.array(z.string()).optional(),
    links: z
      .object({
        github: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        website: z.string().url().optional(),
        email: z.string().email().optional(),
      })
      .optional(),
  }),
  projects: z
    .array(
      z.object({
        title: z.string(),
        company: z.string(),
        period: z.string().optional(),
        description: z.string(),
        tech: z.array(z.string()).optional(),
        highlights: z.array(z.string()).optional(),
        links: z.record(z.string(), z.string()).optional(),
        featured: z.boolean().optional(),
        images: z.array(z.string()).optional(),
        subProjects: z
          .array(
            z.object({
              name: z.string(),
              description: z.string(),
            })
          )
          .optional(),
      })
    )
    .optional(),
  experience: z
    .array(
      z.object({
        company: z.string(),
        role: z.string(),
        location: z.string().optional(),
        period: z.string(),
        highlights: z.array(z.string()).optional(),
        bullets: z.array(z.string()).optional(),
        tech: z.array(z.string()).optional(),
      })
    )
    .optional(),
  skills: z.array(z.string()).optional(),
  education: z
    .array(
      z.object({
        school: z.string().optional(),
        degree: z.string(),
        institution: z.string().optional(),
        period: z.string().optional(),
      })
    )
    .optional(),
  certifications: z
    .array(
      z.object({
        name: z.string(),
        issuer: z.string(),
        year: z.string(),
        description: z.string().optional(),
      })
    )
    .optional(),
  achievements: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  extras: z
    .object({
      professionalHighlights: z
        .array(
          z.object({
            title: z.string(),
            description: z.string(),
          })
        )
        .optional(),
      aiToolkit: z
        .array(
          z.object({
            name: z.string(),
            category: z.string(),
            description: z.string(),
          })
        )
        .optional(),
    })
    .optional(),
});

export type Resume = z.infer<typeof ResumeSchema>;
