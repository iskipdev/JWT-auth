"use client";
import { useRouter } from "next/navigation";
import { identity } from "@/server/authentication/identity";
import { SubmitButton } from "@/ui/SubmitButton";
import { errorToast, successToast } from "@/hooks/useToast";

export default function Logout() {
  const router = useRouter();

  async function identityLogout(formData: FormData) {
    const logout = await identity(formData);
    if (logout?.logoutSuccess) {
      successToast(logout.logoutSuccess);
      router.push("/");
    }
    if (logout?.logoutError) {
      errorToast(logout.logoutError);
    }
  }
  return (
    <form action={identityLogout}>
      <input type="text" defaultValue={"LOGOUT"} name="type" hidden />
      <input defaultValue={"CURRENT_SESSION"} hidden name="logoutType" />
      <SubmitButton text={"Logout"} />
    </form>
  );
}
