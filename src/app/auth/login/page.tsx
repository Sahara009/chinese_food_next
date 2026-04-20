import {
  Field,
  //   FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/src/shared/ui/Fields/field";
import { Input } from "@/src/shared/ui/Input/input";

const AuthFields = () => {
  return (
    <FieldSet className="w-full max-w-xs">
      <h1>LOGIN</h1>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="Max Leiter" />
          {/* <FieldDescription>
              Choose a unique username for your account.
            </FieldDescription> */}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          {/* <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription> */}
          <Input id="password" type="password" placeholder="••••••••" />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default AuthFields;
