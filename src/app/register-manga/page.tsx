// This is a use client component as there are interations between client and browser

"use client";

import React, { useState } from "react";
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
import { redirect } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function RegisterManga() {
  const { toast } = useToast();

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

  // Todo
  const handleSubmit = async () => {
    const res = await registerManga(registerDetails);

    if (res.status === "success") {
      toast({
        title: "Successful",
        description: "Registered successfully",
      });
      redirect("/login-manga");
    } else {
      toast({
        variant: "destructive",
        title: res.status,
        description: res.message,
      });
    }
  };

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                onChange={(e) => handleUsernameChange(e)}
              />
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-7">
            Register
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-center space-y-1.5">
        <div>
          Already have an account?{" "}
          {/* Redirect user to login page when he already has an account */}
          <Link className="underline hover:opacity-70" href="../login-manga">
            Login now
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
