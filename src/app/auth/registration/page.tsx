"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/src/shared/ui/Button/button";
import { Field, FieldGroup, FieldLabel } from "@/src/shared/ui/Fields/field";
import { Input } from "@/src/shared/ui/Input/input";
import { FormSchema, formSchema } from "@/src/shared/config/zod_schema";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerApi } from "@/src/features/auth/register";

// TODO: декомпозировать и поменять язык

const RegisterPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    setServerError(null);
    const res = await registerApi(data);
    if (res && "error" in res && res.error) {
      setServerError(res.error);
    } else {
      reset();
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <>
      <h1>REGISTER</h1>
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
              placeholder="Не менее 6 символов"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <span role="alert" className="error">
                {errors.password?.message}
              </span>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="confirmPassword">
              Confirm your password
            </FieldLabel>
            <Input
              {...register("confirmPassword", { required: true })}
              id="confirmPassword"
              type="password"
              placeholder="Не менее 6 символов"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <span role="alert" className="error">
                {errors.confirmPassword?.message}
              </span>
            )}
          </Field>
          {serverError && (
            <span role="alert" className="error">
              {serverError}
            </span>
          )}
          <Field>
            <Button disabled={!isDirty || isSubmitting} type="submit">
              Sign up
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
};

export default RegisterPage;
