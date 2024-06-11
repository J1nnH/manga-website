// This is a use client component as there are interations between client and browser

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { RegiserLoginType } from "../api/register-manga";
import { registerManga } from "../api/register-manga";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export default function RegisterManga() {
  const { t } = useTranslation();
  const { toast } = useToast();

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Use to store the username and password entered by user
  const [registerDetails, setRegisterDetails] = useState<RegiserLoginType>({
    username: "",
    password: "",
  });

  // Update the username when there is a change in the input
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterDetails((prev) => {
      return { ...prev, username: e.target.value };
    });
  };

  // Update the password when there is a change in the input
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterDetails((prev) => {
      return { ...prev, password: e.target.value };
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
  };

  useEffect(() => {
    const waitApiCalls = async () => {
      try {
        // Send the register details to server action
        const res = await registerManga(registerDetails);

        // The function executed successfully
        if (res.status === "success") {
          toast({
            title: `${t("success")}`,
            description: `${t("successDesc")}`,
          });

          // Redirect user to login page
          router.push("/login-manga");
        } else {
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
        <CardTitle>{t("registerTitle")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="username">{t("username")}</Label>
              <Input
                id="username"
                placeholder={t("namePlace")}
                onChange={(e) => handleUsernameChange(e)}
              />
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("passPlace")}
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-7" disabled={isLoading}>
            {isLoading ? t("registerButtonLoading") : t("registerButton")}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-center space-y-1.5">
        <div>
          {t("prompt")}{" "}
          {/* Redirect user to login page when he already has an account */}
          <Link className="underline hover:opacity-70" href="../login-manga">
            {t("linkLog")}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
