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
        tahun_ajaran: z.string({
            required_error: "Isi NISN!",
        }),
        jurusan: z.string({
            required_error: "Isi Nama Siswa!",
        }),
        kelas: z.string({
            required_error: "Isi Jenis Kelamin!",
        }),
        nama_kelas: z.string({
            required_error: "Isi Agama!",
        }),
        guru: z.string({
            required_error: "Isi Tempat Lahir!",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tahun_ajaran: "",
            jurusan: "",
            kelas: "",
            guru: "",
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
                    Tambah Data Kelas
                </h2>
            }
        >
            <Head title="Tambah Data Kelas" />

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
                                            name="tahun_ajaran"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Tahun Ajaran
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
                                                            <SelectItem value="2015/2016">
                                                                2015/2016
                                                            </SelectItem>
                                                            <SelectItem value="2016/2017">
                                                                2016/2017
                                                            </SelectItem>
                                                            <SelectItem value="2017/2018">
                                                                2017/2018
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="jurusan"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Jurusan
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
                                                            <SelectItem value="ANIMASI">
                                                                ANIMASI
                                                            </SelectItem>
                                                            <SelectItem value="DKV">
                                                                DKV
                                                            </SelectItem>
                                                            <SelectItem value="RPL">
                                                                RPL
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="kelas"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Kelas</FormLabel>
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
                                                            <SelectItem value="X">
                                                                X
                                                            </SelectItem>
                                                            <SelectItem value="XI">
                                                                XI
                                                            </SelectItem>
                                                            <SelectItem value="XII">
                                                                XII
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="nama_kelas"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Nama Kelas
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nama Kelas"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="guru"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Guru</FormLabel>
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
                                                            <SelectItem value="1">
                                                                Abdul Haris, S. Kom
                                                            </SelectItem>
                                                            <SelectItem value="2">
                                                                Abrar Ramdhan Al-Zondana, S.Kom
                                                            </SelectItem>
                                                            <SelectItem value="3">
                                                                Bayu Kresnapati
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
