import { FormEventHandler } from 'react';
import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function LoginForm() {
  
  const { data, setData, post, processing, errors, reset } = useForm({
      username: '',
      password: '',
  });
  
  const submit: FormEventHandler = (e) => {
      e.preventDefault();

      post(route('login'));
  };
  
  return (
    <>
    <Head title="Login Form | Portal Kelas SMKN 7" />
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Portal Kelas SMK7</CardTitle>
          <CardDescription className="text-center">
            Masukkan username dan password!
          </CardDescription>
        </CardHeader>
        <form onSubmit={submit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" onChange={(e) => setData('username', e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" onChange={(e) => setData('password', e.target.value)} required />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-sky-600 hover:bg-sky-400">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    </>
  )
}
