import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useQuery, QueryFunctionContext } from "react-query";
import { Link, router } from "@inertiajs/react";
import { httpServer } from "@/lib/server";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@/Components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";

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
        nisn: z.string({
            required_error: "Isi NISN!",
        }),
        nama_siswa: z.string({
            required_error: "Isi Nama Siswa!",
        }),
        jenis_kelamin: z.string({
            required_error: "Isi Jenis Kelamin!",
        }),
        agama: z.string({
            required_error: "Isi Agama!",
        }),
        tempat_lahir: z.string({
            required_error: "Isi Tempat Lahir!",
        }),
        tanggal_lahir: z.string({
            required_error: "Isi Tanggal Lahir!",
        }),
        alamat: z.string({
            required_error: "Isi Alamat!",
        }),
        no_telp: z.string({
            required_error: "Isi No Telepon!",
        }),
        tahun_angkatan: z.string({
            required_error: "Isi Tahun Angkatan!",
        }),
        kelas: z.string({
            required_error: "Isi Kelas!",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nisn: "",
            nama_siswa: "",
            jenis_kelamin: "",
            agama: "",
            tempat_lahir: "",
            alamat: "",
            no_telp: "",
            tahun_angkatan: "",
            kelas: "",
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
                    Tambah Data Siswa
                </h2>
            }
        >
            <Head title="Tambah Data Siswa" />

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
                                            name="nisn"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>NISN</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="NISN"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="nama_siswa"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Nama Siswa
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nama Siswa"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="jenis_kelamin"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Jenis Kelamin
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
                                                            <SelectItem value="Laki-Laki">
                                                                Laki-Laki
                                                            </SelectItem>
                                                            <SelectItem value="Perempuan">
                                                                Perempuan
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="agama"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Agama</FormLabel>
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
                                                            <SelectItem value="Islam">
                                                                Islam
                                                            </SelectItem>
                                                            <SelectItem value="Katolik">
                                                                Katolik
                                                            </SelectItem>
                                                            <SelectItem value="Kristen">
                                                                Kristen
                                                            </SelectItem>
                                                            <SelectItem value="Hindu">
                                                                Hindu
                                                            </SelectItem>
                                                            <SelectItem value="Budha">
                                                                Budha
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tempat_lahir"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Tempat Lahir
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Tempat Lahir"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tanggal_lahir"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>
                                                        Tanggal Lahir
                                                    </FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={
                                                                        "outline"
                                                                    }
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value &&
                                                                            "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(
                                                                            field.value,
                                                                            "PPP"
                                                                        )
                                                                    ) : (
                                                                        <span>
                                                                            dd/mm/yyyy
                                                                        </span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className="w-auto p-0"
                                                            align="start"
                                                        >
                                                            <Calendar
                                                                mode="single"
                                                                selected={
                                                                    field.value
                                                                }
                                                                onSelect={
                                                                    field.onChange
                                                                }
                                                                disabled={(
                                                                    date
                                                                ) =>
                                                                    date >
                                                                        new Date() ||
                                                                    date <
                                                                        new Date(
                                                                            "1900-01-01"
                                                                        )
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="alamat"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Alamat
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Alamat"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="no_telp"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        No Telepon
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="No Telepon"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tahun_angkatan"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Tahun Angkatan
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Tahun Angkatan"
                                                            {...field}
                                                        />
                                                    </FormControl>
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
                                                            <SelectItem value="X RPL 1">
                                                                X RPL 1
                                                            </SelectItem>
                                                            <SelectItem value="X RPL 2">
                                                                X RPL 2
                                                            </SelectItem>
                                                            <SelectItem value="XI RPL 1">
                                                                XI RPL 1
                                                            </SelectItem>
                                                            <SelectItem value="XI RPL 2">
                                                                XI RPL 2
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <Button className="bg-[#337ab7] hover:bg-[#286090]" type="submit">Proses!</Button>
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
