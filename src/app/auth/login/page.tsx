"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/src/shared/ui/Button/button";
import { Field, FieldGroup, FieldLabel } from "@/src/shared/ui/Fields/field";
import { Input } from "@/src/shared/ui/Input/input";
import {
  // FormSchema,
  FormSchemaLogin,
  // formSchema,
  loginSchema,
} from "@/src/shared/config/zod_schema";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/src/shared/lib/auth";
import { loginAction } from "@/src/shared/lib/actions";
// import { auth } from "@/src/shared/lib/auth";
// import { redirect } from "next/navigation";

// TODO: декомпозировать и поменять язык

const LoginPage = () => {
  // const session = await auth();
  // if (session) redirect("/");
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaLogin> = async (data) => {
    console.log("click");
    await loginAction(data);
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
        </FieldGroup>
        <Field>
          <Button // блокируем кнопку
            disabled={!isDirty || isSubmitting}
            type="submit"
          >
            Log in
          </Button>
        </Field>
      </form>
    </>
  );
};

export default LoginPage;
