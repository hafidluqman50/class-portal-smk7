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
import { httpServer } from "@/lib/server";
import { Head, Link, usePage, router } from '@inertiajs/react';
import axios, { AxiosError } from "axios";
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  
  const { register, handleSubmit } = useForm()
  
  // const { data, setData, post, processing, errors, reset } = useForm({
  //     username: '',
  //     password: '',
  // });
  
  const submit = async(data: any) => {
    try {
      const { data: result } = await axios.post('http://localhost:5000/api/super-admin/login', {
        email: data.email,
        password: data.password
      })
      
      
      localStorage.setItem('auth_token', result.data.token)
      
      router.get('/administrator/dashboard')
    } catch(error) {
      if(error as AxiosError) {
        alert((error as AxiosError<any>)?.response?.data?.message)
        console.log((error as AxiosError<any>)?.response?.data?.message)
      }
    }
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
        <form onSubmit={handleSubmit(submit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Email</Label>
              <Input id="email" type="email" {...register('email')} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} required />
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
