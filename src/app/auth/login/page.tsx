"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/src/shared/ui/Button/button";
import { Field, FieldGroup, FieldLabel } from "@/src/shared/ui/Fields/field";
import { Input } from "@/src/shared/ui/Input/input";
import { FormSchema, formSchema } from "@/src/shared/config/zod_schema";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

// TODO: декомпозировать и поменять язык

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
    reset();
  };

  useEffect(() => {
    // устанавливаем фокус на первое поле (имя пользователя) после монтирования компонента
    setFocus("email");
  }, []);

  return (
    <>
      <h1>LOGIN</h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs"
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              {...register("email", { required: true })}
              type="email"
              placeholder="name@mail.com"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <span role="alert" className="error">
                {errors.email?.message}
              </span>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              {...register("password", { required: true })}
              id="password"
              type="password"
              placeholder="Введите ваш пароль"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <span role="alert" className="error">
                {errors.password?.message}
              </span>
            )}
          </Field>

          <Field>
            <Button // блокируем кнопку
              disabled={!isDirty || isSubmitting}
              type="submit"
            >
              Login in
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
};

export default LoginPage;
