import ClassSecretaryLayout from '@/Layouts/ClassSecretaryLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useQuery, QueryFunctionContext } from 'react-query';
import { httpServer } from '@/lib/server';
import InputLabel from '@/Components/InputLabel';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { attendancesImg } from '@/lib/assets';

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
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Data Presensi</h2>}
        >
            <Head title="Data Presensi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-5">
                      <img src={ attendancesImg } />
                    </div>
                </div>
            </div>
        </ClassSecretaryLayout>
    );
}
