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
        jurusan: z.string({
            required_error: "Isi Jurusan!",
        }),
        kelas: z.string({
            required_error: "Isi Kelas!",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tahun_ajaran: "",
            jurusan: "",
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
                    Data Siswa
                </h2>
            }
        >
            <Head title="Data Siswa" />

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
                                      <Button className="bg-[#337ab7] hover:bg-[#286090]" type="submit">Cari</Button>
                                  </form>
                              </Form>
                            </div>
                            <div className="grid-rows-12">
                              <div className="flex flex-row-reverse mb-8">
                                <Button className="bg-[#337ab7] hover:bg-[#286090]" onClick={() => {
                                    router.get("/administrator/student/create");
                                }}>Tambah Data</Button>
                              </div>
                              <Table>
                                  <TableHeader>
                                      <TableRow>
                                        <TableHead className="w-[2%]">No</TableHead>
                                        <TableHead>NISN</TableHead>
                                        <TableHead>Nama Siswa</TableHead>
                                        <TableHead>Kelas</TableHead>
                                        <TableHead>Login</TableHead>
                                        <TableHead>#</TableHead>
                                      </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow key={1}>
                                      <TableCell className="font-medium">
                                          1
                                      </TableCell>
                                      <TableCell>
                                          123456789
                                      </TableCell>
                                      <TableCell>
                                          Rindho Ananta Samat
                                      </TableCell>
                                      <TableCell>
                                          XI RPL 1
                                      </TableCell>
                                      <TableCell>
                                        <Button className="bg-[#f0ad4e] hover:bg-[#d58512]" onClick={() => {
                                          router.get("");
                                        }}>Data Login</Button>
                                      </TableCell>
                                      <TableCell>
                                          <Button className="bg-[#5cb85c] hover:bg-[#449d44]" onClick={() => {
                                            router.get("");
                                          }}>Ubah</Button>
                                          <Button className="bg-[#d9534f] hover:bg-[#c9302c]" onClick={() => {
                                            router.get("");
                                          }}>Hapus</Button>
                                          <Button className="bg-[#f0ad4e] hover:bg-[#ec971f]" onClick={() => {
                                            router.get("");
                                          }}>Nonaktifkan</Button>
                                      </TableCell>
                                    </TableRow>
                                    <TableRow key={2}>
                                      <TableCell className="font-medium">
                                          2
                                      </TableCell>
                                      <TableCell>
                                          321312312
                                      </TableCell>
                                      <TableCell>
                                          Hafiidh Luqmanul Hakim
                                      </TableCell>
                                      <TableCell>
                                          XI RPL 1
                                      </TableCell>
                                      <TableCell>
                                        <Button className="bg-[#f0ad4e] hover:bg-[#d58512]" onClick={() => {
                                          router.get("");
                                        }}>Data Login</Button>
                                      </TableCell>
                                      <TableCell>
                                          <Button className="bg-[#5cb85c] hover:bg-[#449d44]" onClick={() => {
                                            router.get("");
                                          }}>Ubah</Button>
                                          <Button className="bg-[#d9534f] hover:bg-[#c9302c]" onClick={() => {
                                            router.get("");
                                          }}>Hapus</Button>
                                          <Button className="bg-[#f0ad4e] hover:bg-[#ec971f]" onClick={() => {
                                            router.get("");
                                          }}>Nonaktifkan</Button>
                                      </TableCell>
                                    </TableRow>
                                    <TableRow key={2}>
                                      <TableCell className="font-medium">
                                          3
                                      </TableCell>
                                      <TableCell>
                                          123321321
                                      </TableCell>
                                      <TableCell>
                                          Muhammad Fachrian Noor
                                      </TableCell>
                                      <TableCell>
                                          XI RPL 1
                                      </TableCell>
                                      <TableCell>
                                        <Button className="bg-[#f0ad4e] hover:bg-[#d58512]" onClick={() => {
                                          router.get("");
                                        }}>Data Login</Button>
                                      </TableCell>
                                      <TableCell>
                                          <Button className="bg-[#5cb85c] hover:bg-[#449d44]" onClick={() => {
                                            router.get("");
                                          }}>Ubah</Button>
                                          <Button className="bg-[#d9534f] hover:bg-[#c9302c]" onClick={() => {
                                            router.get("");
                                          }}>Hapus</Button>
                                          <Button className="bg-[#f0ad4e] hover:bg-[#ec971f]" onClick={() => {
                                            router.get("");
                                          }}>Nonaktifkan</Button>
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
