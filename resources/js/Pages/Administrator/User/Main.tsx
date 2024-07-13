import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useQuery, QueryFunctionContext } from "react-query";
import { Link, router } from "@inertiajs/react";
import { httpServer } from "@/lib/server";
import { Button } from "@/Components/ui/button";
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

    return (
        <AdministratorLayout
            user={!isLoading ? data : null}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Data Pengguna
                </h2>
            }
        >
            <Head title="Data Pengguna" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid-rows-12">
                                <div className="flex flex-row-reverse mb-8">
                                    <Button
                                        className="bg-[#337ab7] hover:bg-[#286090]"
                                        onClick={() => {
                                            router.get(
                                                "/administrator/user/create"
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
                                            <TableHead>Nama</TableHead>
                                            <TableHead>Username</TableHead>
                                            <TableHead>Level</TableHead>
                                            <TableHead>Kelas</TableHead>
                                            <TableHead>#</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key={1}>
                                            <TableCell className="font-medium">
                                                1
                                            </TableCell>
                                            <TableCell>ABBIZAR MULIA</TableCell>
                                            <TableCell>0057892505</TableCell>
                                            <TableCell>Pengguna</TableCell>
                                            <TableCell>Semua</TableCell>
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
                                            <TableCell>ABDAD ELDAFIE</TableCell>
                                            <TableCell>0067957493</TableCell>
                                            <TableCell>Pengguna</TableCell>
                                            <TableCell>Semua</TableCell>
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
                                            <TableCell>ABDI RADITYA FAHREZY</TableCell>
                                            <TableCell>0057687405</TableCell>
                                            <TableCell>Pengguna</TableCell>
                                            <TableCell>Semua</TableCell>
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
