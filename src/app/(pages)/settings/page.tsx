'use server';

import CheckLoggedIn from "@/actions/auth/check-logged-in";
import SettingsPage from "@/app/components/SettingsPage";
import {redirect} from "next/navigation";

export default async function Settings() {
    const logged_in_user = await CheckLoggedIn()
    if (!logged_in_user) {console.log("no session detected"); return redirect("/sign-in");}
    return <SettingsPage user={logged_in_user} />
}
