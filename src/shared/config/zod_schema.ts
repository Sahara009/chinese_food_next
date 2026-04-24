import { z } from "zod";

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
