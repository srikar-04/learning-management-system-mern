

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { ArrowUpDownIcon } from 'lucide-react'
import React, { useState } from 'react'
import { filterOptions, sortOptions } from '../../config/index.js'

function StudentCoursesPage() {

    const [sort, setSort] = useState('')

  return (
    <div className='container mx-auto p-4'>
        <h1 className='text-3xl font-bold mb-4'>All Courses</h1>
        <div className='flex flex-col md:flex-row gap-4'>
            <aside className='w-full md:w-64 space-y-4'>
                <div className='p-4 space-y-4'>
                    {/* filter options */}
                </div>
            </aside>

            <main className='flex-1'>
                <div className='flex justify-end items-center mb-4 gap-5'>
                    <DropdownMenu>

                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' size='sm' className='flex items-center gap-2 p-5'>
                                <ArrowUpDownIcon className='h-4 w-4' />
                                <span className='text-[16px] font-medium'>Sort By</span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align='end' className='w-[200px]'>
                            <DropdownMenuRadioGroup 
                                value={sort}
                                onValueChange={value => setSort(() => value)}
                            >
                                {/* sort options */}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>

                    </DropdownMenu>
                </div>
            </main>

        </div>
    </div>
  )
}

export default StudentCoursesPage