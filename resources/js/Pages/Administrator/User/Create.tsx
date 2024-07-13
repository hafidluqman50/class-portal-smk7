import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useQuery, QueryFunctionContext } from "react-query";
import { Link, router } from "@inertiajs/react";
import { httpServer } from "@/lib/server";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/Components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

export default function StudentCreate() {
    const fetchCurrentUser = async ({
        queryKey,
    }: QueryFunctionContext): Promise<
        | {
              name: string;
              email: string;
          }
        | undefined
    > => {
        const request = await httpServer.get("/api/current-user");

        if (request !== undefined) {
            return request.data.data;
        }
    };

    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ["currentUser"],
        queryFn: fetchCurrentUser,
    });

    const formSchema = z.object({
        nama: z.string({
            required_error: "Isi Nama!",
        }),
        username: z.string({
            required_error: "Isi Username!",
        }),
        password: z.string({
            required_error: "Isi Password!",
        }),
        confirm_password: z.string({
            required_error: "isi Konfirmasi Password!",
        }),
        level: z.string({
            required_error: "Isi Level User!",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama: "",
            username: "",
            password: "",
            confirm_password: "",
            level: ""
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <AdministratorLayout
            user={!isLoading ? data : null}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Tambah Data Pengguna
                </h2>
            }
        >
            <Head title="Tambah Data Pengguna" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid-rows-12 mb-8">
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-8"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="nama"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nama</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nama"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Username
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Username"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="confirm_password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Konfirmasi Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Konfirmasi Password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="level"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Level User
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="--------" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Administrator">
                                                                Administrator
                                                            </SelectItem>
                                                            <SelectItem value="Wali Kelas">
                                                                Wali Kelas
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            className="bg-[#337ab7] hover:bg-[#286090]"
                                            type="submit"
                                        >
                                            Proses!
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
