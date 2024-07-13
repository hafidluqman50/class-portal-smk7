import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useQuery, QueryFunctionContext } from "react-query";
import { Link, router } from "@inertiajs/react";
import { httpServer } from "@/lib/server";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/Components/ui/button";
import { attendancesImg } from "@/lib/assets";
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
        bulan: z.string({
            required_error: "Isi Bulan!",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bulan: "",
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
                    Data Absen
                </h2>
            }
        >
            <Head title="Data Absen" />

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
                                            name="bulan"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Bulan</FormLabel>
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
                                                            <SelectItem value="Januari">
                                                                Januari
                                                            </SelectItem>
                                                            <SelectItem value="Februari">
                                                                Februari
                                                            </SelectItem>
                                                            <SelectItem value="Maret">
                                                                Maret
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
                                        Cetak Absen
                                    </Button>
                                </div>
                                {/*<Table>
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
                                </Table>*/}
                                <img src={attendancesImg} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}