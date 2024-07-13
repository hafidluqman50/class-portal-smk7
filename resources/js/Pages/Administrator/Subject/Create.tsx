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
        nama_pelajaran: z.string({
            required_error: "Isi Nama Pelajaran!",
        }),
        kelompok: z.string({
            required_error: "Isi Kelompok!",
        }),
        sub_kelompok: z.string({
            required_error: "Isi Sub Kelompok!",
        }),
        jurusan: z.string({
            required_error: "Isi Jurusan!",
        }),
        keterangan: z.string({
            required_error: "Isi Keterangan!",
        }),
        pengetahuan1: z.string({
            required_error: "Isi Pengetahuan Kelas X!",
        }),
        keterampilan1: z.string({
            required_error: "Isi Keterampilan Kelas X!",
        }),
        sikap1: z.string({
            required_error: "Isi Sikap Kelas X!",
        }),
        cp1: z.string({
            required_error: "Isi Capaian Pembelajaran Kelas X!",
        }),
        pengetahuan2: z.string({
            required_error: "Isi Pengetahuan Kelas XI!",
        }),
        keterampilan2: z.string({
            required_error: "Isi Keterampilan Kelas XI!",
        }),
        sikap2: z.string({
            required_error: "Isi Sikap Kelas XI!",
        }),
        cp2: z.string({
            required_error: "Isi Capaian Pembelajaran Kelas XI!",
        }),
        pengetahuan3: z.string({
            required_error: "Isi Pengetahuan Kelas XII!",
        }),
        keterampilan3: z.string({
            required_error: "Isi Keterampilan Kelas XII!",
        }),
        sikap3: z.string({
            required_error: "Isi Sikap Kelas XII!",
        }),
        cp3: z.string({
            required_error: "Isi Capaian Pembelajaran Kelas XII!",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama_pelajaran: "",
            kelompok: "",
            sub_kelompok: "",
            jurusan: "",
            keterangan: "",
            pengetahuan1: "",
            keterampilan1: "",
            sikap1: "",
            cp1: "",
            pengetahuan2: "",
            keterampilan2: "",
            sikap2: "",
            cp2: "",
            pengetahuan3: "",
            keterampilan3: "",
            sikap3: "",
            cp3: "",
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
                    Tambah Data Pelajaran
                </h2>
            }
        >
            <Head title="Tambah Data Pelajaran" />

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
                                            name="nama_pelajaran"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Nama Pelajaran
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nama Pelajaran"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="kelompok"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Kelompok
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
                                                            <SelectItem value="A">
                                                                A
                                                            </SelectItem>
                                                            <SelectItem value="B">
                                                                B
                                                            </SelectItem>
                                                            <SelectItem value="C1">
                                                                C1
                                                            </SelectItem>
                                                            <SelectItem value="C2">
                                                                C2
                                                            </SelectItem>
                                                            <SelectItem value="C3">
                                                                C3
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="sub_kelompok"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Sub Kelompok
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
                                                            <SelectItem value="Umum">
                                                                Umum
                                                            </SelectItem>
                                                            <SelectItem value="Konsentrasi Keahlian">
                                                                Konsentrasi
                                                                Keahlian
                                                            </SelectItem>
                                                            <SelectItem value="Produktif Kreatif dan Kewirausahaan">
                                                                Produktif
                                                                Kreatif dan
                                                                Kewirausahaan
                                                            </SelectItem>
                                                            <SelectItem value="Pilihan">
                                                                Pilihan
                                                            </SelectItem>
                                                            <SelectItem value="IPAS">
                                                                IPAS
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
                                                            <SelectItem value="TKJ">
                                                                TKJ
                                                            </SelectItem>
                                                            <SelectItem value="MM">
                                                                MM
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
                                            name="keterangan"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Keterangan
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Keterangan"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                            Deskripsi Kelas X<hr />
                                        </h2>
                                        <FormField
                                            control={form.control}
                                            name="pengetahuan1"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Deskripsi Pengetahuan
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Deskripsi Pengetahuan"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="keterampilan1"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Deskripsi Keterampilan
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Deskripsi Keterampilan"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="sikap1"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Deskripsi Sikap
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Deskripsi Sikap"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="cp1"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Capaian Pembelajaran
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Capaian Pembelajaran"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                            Deskripsi Kelas XI
                                            <hr />
                                        </h2>
                                        <FormField
                                            control={form.control}
                                            name="pengetahuan2"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Deskripsi Pengetahuan
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Deskripsi Pengetahuan"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="keterampilan2"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Deskripsi Keterampilan
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Deskripsi Keterampilan"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="sikap2"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Deskripsi Sikap
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Deskripsi Sikap"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="cp2"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Capaian Pembelajaran
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Capaian Pembelajaran"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                            Deskripsi Kelas XII<hr />
                                        </h2>
                                        <FormField
                                            control={form.control}
                                            name="pengetahuan3"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Deskripsi Pengetahuan
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Deskripsi Pengetahuan"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="keterampilan3"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Deskripsi Keterampilan
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Deskripsi Keterampilan"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="sikap3"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Deskripsi Sikap
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Deskripsi Sikap"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="cp3"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Capaian Pembelajaran
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Capaian Pembelajaran"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
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
