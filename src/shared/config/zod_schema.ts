import { object, string, z } from "zod";

export const formSchema = z
  // данные формы - объект
  .object({
    email: z.string().email("Некорректный email"),
    password: z.string().min(6, "Пароль слишком короткий"),
    confirmPassword: z.string().min(6, "Повторите пароль"),
  })
  // кастомная валидация формы - всего объекта
  .refine((data) => data.password === data.confirmPassword, {
    // необходимо указать путь - название поля с ошибкой
    path: ["confirmPassword"],
    message: "Введенные пароли не совпадают",
  });

export type FormSchema = z.infer<typeof formSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type FormSchemaLogin = z.infer<typeof loginSchema>;

export const ingredientSchema = object({
  name: string().min(1, "Нзавание обязательно"),
  category: z.enum([
    "VEGETABLES",
    "MEAT",
    "CHICKEN",
    "SEAFOOD",
    "NOODLES",
    "RICE",
    "DUMPLINGS",
    "SOUPS",
    "STREET_FOOD",
    "SPICY",
    "DESSERTS",
    "SAUCES",
    "TOFU",
    "VEGAN",
    "SICHUAN",
    "CANTONESE",
    "BEIJING",
  ]),
  unit: z.enum([
    "GRAM",
    "KILOGRAM",
    "MILLILITER",
    "LITER",
    "TEASPOON",
    "TABLESPOON",
    "CUP",
    "PIECE",
    "PINCH",
  ]),
  pricePerUnit: z
    .number()
    .min(0, "Цена должна быть больше 0")
    .nullable()
    .optional(),
  description: z.string(),
});
