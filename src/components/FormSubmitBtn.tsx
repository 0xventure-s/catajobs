"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import LoadingButton from "./LoadingButton";

export default function FormSubmitBtn(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();
  return (
    <LoadingButton {...props} type="submit" loading={pending}  />
  )
}
