import ClassSecretaryLayout from '@/Layouts/ClassSecretaryLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useQuery, QueryFunctionContext } from 'react-query';
import { httpServer } from '@/lib/server';
import InputLabel from '@/Components/InputLabel';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { attendancesImg } from '@/lib/assets';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';

export default function JournalPage() {
    
    const fetchCurrentUser = async({
      queryKey
    }: QueryFunctionContext): Promise<{
      name:string,
      email:string
    } | undefined> => {
      const request = await httpServer.get('/api/current-user')
      
      if(request !== undefined) {
        return request.data.data
      }
    }
    
    const { isLoading, isError, data, error, refetch } = useQuery({
      queryKey: ['currentUser'],
      queryFn: fetchCurrentUser
    })
  
    return (
        <ClassSecretaryLayout
            user={!isLoading ? data : null}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Data Jurnal</h2>}
        >
            <Head title="Data Jurnal" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-5">
                      <InputLabel value='Nama Guru' />
                      <Select>
                        <SelectTrigger className="mb-3">
                          <SelectValue placeholder="Pilih Guru" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="mantul">Mantul</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      
                      
                      <InputLabel value='Nama Mapel' />
                      <Select>
                        <SelectTrigger className="mb-3">
                          <SelectValue placeholder="Pilih Mapel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"mantul"}>Mantul</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      
                      <InputLabel value='Materi' />
                      <Textarea className='mb-3' />
                      
                      <InputLabel value='Siswa Yang Tidak Hadir' />
                      <Select>
                        <SelectTrigger className="mb-3">
                          <SelectValue placeholder="Pilih Siswa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"mantul"}>Mantul</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      
                      <InputLabel value='Jam Ke' />
                      <Input type='text' className='mb-3' placeholder='1-4' />
                      
                      <InputLabel value='Tanggal' />
                      <Input type='date' className='mb-3' />
                      
                      <InputLabel value='Tanda Tangan' />
                      <Textarea className='mb-3' />
                      
                      <Button className='bg-sky-500'>Simpan</Button>
                    </div>
                </div>
            </div>
        </ClassSecretaryLayout>
    );
}
