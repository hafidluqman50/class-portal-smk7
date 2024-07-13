import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useQuery, QueryFunctionContext } from "react-query";
import { Link, router } from "@inertiajs/react";
import { httpServer } from "@/lib/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
        tahun_ajaran: z.string({
            required_error: "Isi Tahun Ajaran!",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tahun_ajaran: "",
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
                    Data Kelas
                </h2>
            }
        >
            <Head title="Data Kelas" />

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
                                            router.get(
                                                "/administrator/class/create"
                                            );
                                        }}
                                    >
                                        Tambah Data
                                    </Button>
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[2%]">
                                                No
                                            </TableHead>
                                            <TableHead>Tahun Ajaran</TableHead>
                                            <TableHead>Nama Kelas</TableHead>
                                            <TableHead>Jurusan</TableHead>
                                            <TableHead>Wali Kelas</TableHead>
                                            <TableHead>#</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key={1}>
                                            <TableCell className="font-medium">
                                                1
                                            </TableCell>
                                            <TableCell>2023/2024</TableCell>
                                            <TableCell>X ANIMASI</TableCell>
                                            <TableCell>ANIMASI</TableCell>
                                            <TableCell>
                                                Fahri Ansar Potabuga, S.Sos
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
                                            <TableCell>2022/2023</TableCell>
                                            <TableCell>X ANIMASI</TableCell>
                                            <TableCell>ANIMASI</TableCell>
                                            <TableCell>
                                                Abrar Ramdhan Al-Zondana, S.Kom
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
                                            <TableCell>2022/2023</TableCell>
                                            <TableCell>XI ANIMASI</TableCell>
                                            <TableCell>ANIMASI</TableCell>
                                            <TableCell>
                                                Yekti Bambang Priono, SS, M. Pd
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
