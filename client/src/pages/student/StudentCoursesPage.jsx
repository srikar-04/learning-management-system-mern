import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDownIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { filterOptions, sortOptions } from "../../config/index.js";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchStudentCourseListService } from "@/services/services.js";
import { studentContext } from "@/context/student-context/studentContext.jsx";
import { Card, CardContent, CardTitle } from "@/components/ui/card.jsx";

function StudentCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filter, setFilter] = useState({})

  const {
    studentCourseList,
    setStudentCourseList
  } = useContext(studentContext)

  const fetchAllStudentCouses = async () => {
    const response = await fetchStudentCourseListService();

    if(!response?.success) {
      throw new Error('error fetching student courses')
    }

    setStudentCourseList(response.data)

    // console.log(response.data, 'student courses in useEffect');
  }

  useEffect( () => {
    fetchAllStudentCouses()
  }, [])

  const handleFilterOnChange = (item, id) => {
    
  }

  return (
    <div className="container mx-6 p-4">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div className="space-y-4">
            {Object.keys(filterOptions).map((keyItem) => (
              <div className="p-4 space-y-4">
                <h3 className="font-bold mb-3">{keyItem.toUpperCase()}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItem].map((option) => (
                    <Label className="flex font-medium items-center gap-3">
                      <Checkbox
                        checked={false}
                        onCheckedChange={() =>
                          handleFilterOnChange(keyItem, option.id)
                        }
                      />
                        {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(() => value)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-gray-800 font-bold">10 Results</span>
          </div>

          <div className="space-y-4">
              {
                studentCourseList && studentCourseList.length > 0
                ? studentCourseList.map(courseItem => (
                  <Card className='cursor-pointer' key={courseItem?._id}>

                    <CardContent className='flex gap-4 p-4'>

                      <div className="w-48 h-32 flex-shrink-0">
                        <img className="w-full h-full object-cover" src={courseItem?.image} alt="course thumbnail" />
                      </div>

                      <div className="flex-1 ">
                        <CardTitle className='text-xl mb-2' >
                          {courseItem?.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mb-1">
                          created by   <span className="font-bold text-gray-700">
                            {courseItem?.instructorName}
                          </span>
                        </p>
                        <p className="text-[17px] text-gray-600 mt-3 mb-2">
                          {
                            `${courseItem?.curriculum?.length} ${courseItem?.curriculum?.length <=1 ? 'Lecture' : 'Lectures'} - ${courseItem?.level?.toUpperCase()} Level`
                          }
                        </p>
                        <p className="font-bold text-lg">
                          ${courseItem?.pricing}
                        </p>
                      </div>

                    </CardContent>

                  </Card>
                ))
                : <h1>No Courses Found</h1>
              }
          </div>

        </main>
      </div>
    </div>
  );
}

export default StudentCoursesPage;
