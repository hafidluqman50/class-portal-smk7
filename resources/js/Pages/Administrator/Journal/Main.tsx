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
import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/Components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

export default function StudentPage() {
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
        tglawal: z.string({
            required_error: "Isi Tanggal Awal!",
        }),
        tglakhir: z.string({
            required_error: "Isi Tanggal Akhir!",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tglawal: "",
            tglakhir: "",
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
                    Data Jurnal
                </h2>
            }
        >
            <Head title="Data Jurnal" />

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
                                            name="tglawal"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>
                                                        Tanggal Awal
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
                                            name="tglakhir"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>
                                                        Tanggal Akhir
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
                                        <Button
                                            className="bg-[#337ab7] hover:bg-[#286090]"
                                            type="submit"
                                        >
                                            Cari
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                            <div className="grid-rows-12">
                                <div className="flex flex-row-reverse mb-8">
                                    <Button
                                        className="bg-[#337ab7] hover:bg-[#286090]"
                                        onClick={() => {
                                            router.get("");
                                        }}
                                    >
                                        Cetak Jurnal
                                    </Button>
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[2%]">
                                                No
                                            </TableHead>
                                            <TableHead>Jam Ke</TableHead>
                                            <TableHead>
                                                Mata Pelajaran
                                            </TableHead>
                                            <TableHead>Nama Guru</TableHead>
                                            <TableHead>Materi</TableHead>
                                            <TableHead>
                                                Pembelajaran Tatap Muka
                                            </TableHead>
                                            <TableHead>
                                                Siswa Yang Tidak Hadir
                                            </TableHead>
                                            <TableHead>Tanda Tangan</TableHead>
                                            <TableHead>#</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key={1}>
                                            <TableCell className="font-medium">
                                                1
                                            </TableCell>
                                            <TableCell>1-2</TableCell>
                                            <TableCell>
                                                Bahasa Dayak Kenyah
                                            </TableCell>
                                            <TableCell>
                                                Septiana Lenjau, S. Sn
                                            </TableCell>
                                            <TableCell>
                                                Membuat skrip bahasa Dayak
                                            </TableCell>
                                            <TableCell>Tatap Muka</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>
                                                        1. Muhammad Shafwan
                                                        Kasifillah
                                                    </li>
                                                    <li>
                                                        2. Rizqi Meldiy Pratama
                                                    </li>
                                                </ul>
                                            </TableCell>
                                            <TableCell>
                                                <img
                                                    src="https://presensi.smkn7-smr.sch.id/ttd/6634871495e3f.jpg"
                                                    alt=""
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    className="bg-[#5cb85c] hover:bg-[#449d44]"
                                                    onClick={() => {
                                                        router.get("");
                                                    }}
                                                >
                                                    Ubah
                                                </Button>
                                                <Button
                                                    className="bg-[#d9534f] hover:bg-[#c9302c]"
                                                    onClick={() => {
                                                        router.get("");
                                                    }}
                                                >
                                                    Hapus
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={2}>
                                            <TableCell className="font-medium">
                                                2
                                            </TableCell>
                                            <TableCell>1-2</TableCell>
                                            <TableCell>
                                                Bahasa Dayak Kenyah
                                            </TableCell>
                                            <TableCell>
                                                Septiana Lenjau, S. Sn
                                            </TableCell>
                                            <TableCell>
                                                Membuat skrip bahasa Dayak
                                            </TableCell>
                                            <TableCell>Tatap Muka</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>
                                                        1. Muhammad Shafwan
                                                        Kasifillah
                                                    </li>
                                                    <li>
                                                        2. Rizqi Meldiy Pratama
                                                    </li>
                                                </ul>
                                            </TableCell>
                                            <TableCell>
                                                <img
                                                    src="https://presensi.smkn7-smr.sch.id/ttd/6634871495e3f.jpg"
                                                    alt=""
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    className="bg-[#5cb85c] hover:bg-[#449d44]"
                                                    onClick={() => {
                                                        router.get("");
                                                    }}
                                                >
                                                    Ubah
                                                </Button>
                                                <Button
                                                    className="bg-[#d9534f] hover:bg-[#c9302c]"
                                                    onClick={() => {
                                                        router.get("");
                                                    }}
                                                >
                                                    Hapus
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={3}>
                                            <TableCell className="font-medium">
                                                3
                                            </TableCell>
                                            <TableCell>1-2</TableCell>
                                            <TableCell>
                                                Bahasa Dayak Kenyah
                                            </TableCell>
                                            <TableCell>
                                                Septiana Lenjau, S. Sn
                                            </TableCell>
                                            <TableCell>
                                                Membuat skrip bahasa Dayak
                                            </TableCell>
                                            <TableCell>Tatap Muka</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>
                                                        1. Muhammad Shafwan
                                                        Kasifillah
                                                    </li>
                                                    <li>
                                                        2. Rizqi Meldiy Pratama
                                                    </li>
                                                </ul>
                                            </TableCell>
                                            <TableCell>
                                                <img
                                                    src="https://presensi.smkn7-smr.sch.id/ttd/6634871495e3f.jpg"
                                                    alt=""
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    className="bg-[#5cb85c] hover:bg-[#449d44]"
                                                    onClick={() => {
                                                        router.get("");
                                                    }}
                                                >
                                                    Ubah
                                                </Button>
                                                <Button
                                                    className="bg-[#d9534f] hover:bg-[#c9302c]"
                                                    onClick={() => {
                                                        router.get("");
                                                    }}
                                                >
                                                    Hapus
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
