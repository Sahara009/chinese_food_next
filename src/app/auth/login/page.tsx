"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/src/shared/ui/Button/button";
import { Field, FieldGroup, FieldLabel } from "@/src/shared/ui/Fields/field";
import { Input } from "@/src/shared/ui/Input/input";
import { FormSchemaLogin, loginSchema } from "@/src/shared/config/zod_schema";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "@/src/shared/lib/actions";

// TODO: декомпозировать и поменять язык

const LoginPage = () => {
  const [serverError, setServerError] = useState<string | null>(null);

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
    setServerError(null);
    const res = await loginAction(data);
    if (res && "error" in res) {
      setServerError(res.error);
    }
  };

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

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
        {serverError && (
          <span role="alert" className="error">
            {serverError}
          </span>
        )}
        <Field>
          <Button disabled={!isDirty || isSubmitting} type="submit">
            Log in
          </Button>
        </Field>
      </form>
    </>
  );
};

export default LoginPage;
