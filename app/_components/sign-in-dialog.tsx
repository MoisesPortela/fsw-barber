"use client"

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import Image from "next/image"

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google")
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça seu login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta google
        </DialogDescription>
      </DialogHeader>
      <Button
        variant={"outline"}
        className="gap-1 font-bold"
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          alt="Faça seu login usando uma conta google"
          src={"/Google.svg"}
          width={18}
          height={18}
        />
        Google
      </Button>
    </>
  )
}

export default SignInDialog
