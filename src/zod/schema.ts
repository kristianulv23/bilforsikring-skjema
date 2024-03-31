import { z } from "zod";

export const formSchema = z.object({
    regNr: z.string().regex(/^[A-Z]{2}\d{5}$/, "Du må oppgi et gyldig registreringsnummer"),
    bonus: z.object({
        value: z.string(),
        label: z.string(),
    }),
    dateOfBirth: z
        .string()
        .min(1, "Fødselsnummer kan ikke være tomt")
        .length(11, "Fødselsnummeret må bestå av 11 siffer"),
    firstname: z.string().min(2, "Du må fylle ut fornavn"),
    lastname: z.string().min(2, "Du må fylle ut etternavn"),
    email: z.string().email("Du må oppgi en gyldig e-postadresse"),
});

export type FormSchemaInputType = z.infer<typeof formSchema>;
