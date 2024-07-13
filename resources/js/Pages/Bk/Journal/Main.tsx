import AdministratorLayout from '@/Layouts/AdministratorLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useQuery, QueryFunctionContext } from 'react-query';
import { httpServer } from '@/lib/server';

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
        <AdministratorLayout
            user={!isLoading ? data : null}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Data Jurnal</h2>}
        >
            <Head title="Data Jurnal" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">HALAMAN DATA JURNAL</div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
