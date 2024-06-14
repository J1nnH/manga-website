// This is a use client component as there are interations between client and browser

"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { RegiserLoginType } from "../../api/register-manga";
import { loginManga } from "../../api/login-manga";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

export default function LoginManga() {
  const { t } = useTranslation();

  // For modal
  const { toast } = useToast();

  // Used to set cookie once the login is successfull
  const [cookie, setCookie, _] = useCookies(["userId"]);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Use to store the username and password entered by user
  const [loginDetails, setLoginDetails] = useState<RegiserLoginType>({
    username: "",
    password: "",
  });

  // Update the username when there is a change in the input
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails((prev) => {
      return { ...prev, username: e.target.value };
    });
  };

  // Update the password  when there is a change in the input
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails((prev) => {
      return { ...prev, password: e.target.value };
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    const waitApiCalls = async () => {
      try {
        // Pass the login details to loginManga function
        const res = await loginManga(loginDetails);

        // The function execute successfully
        if (res.status === "success") {
          toast({
            title: `${t("success")}`,
            description: `${t("successDesc")}`,
          });

          // Set the cookie expired date to 31 days
          const todayDate = new Date();

          todayDate.setDate(todayDate.getDate() + 31);

          setCookie("userId", res.userId, { expires: todayDate });

          // Redirect user back to homepage
          router.push("/");
        } else {
          // The function return error
          toast({
            variant: "destructive",
            title: res.status,
            description: res.message,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please try again later",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading === true) {
      waitApiCalls();
    }
  }, [isLoading]);

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="username">{t("subtitle1")}</Label>
              <Input
                id="username"
                placeholder={t("namePlace")}
                onChange={(e) => handleUsernameChange(e)}
              />
              <Label htmlFor="password">{t("subtitle2")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("passPlace")}
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
          </div>
          <Button className="w-full mt-7" disabled={isLoading}>
            {isLoading ? t("loginButtonLoading") : t("loginButton")}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-center space-y-1.5">
        <div>
          {t("prompt")}{" "}
          {/* Redirect user to register page when he does not has an account yet */}
          <Link className="underline hover:opacity-70" href="../register-manga">
            {t("linkRegis")}
          </Link>
        </div>
      </CardFooter>
      <button
        onClick={async () => {
          const response = await fetch("/api/test", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          console.log(data);
        }}
      >
        Click me
      </button>
    </Card>
  );
}
