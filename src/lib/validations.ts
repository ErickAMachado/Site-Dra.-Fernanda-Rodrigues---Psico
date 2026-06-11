import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo.")
    .max(120, "Nome muito longo."),
  phone: z
    .string()
    .trim()
    .min(10, "Informe um WhatsApp válido.")
    .max(20, "WhatsApp inválido.")
    .regex(/^[\d\s()+-]+$/, "Use apenas números e símbolos comuns de telefone."),
  email: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || z.string().email().safeParse(value).success,
      "Informe um e-mail válido.",
    ),
  message: z
    .string()
    .trim()
    .max(500, "Mensagem muito longa.")
    .optional()
    .or(z.literal("")),
});

export type LeadFormData = z.infer<typeof leadSchema>;
