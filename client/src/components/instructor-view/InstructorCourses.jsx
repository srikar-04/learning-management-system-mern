import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InstructorContext } from "@/context/instructor-context/instructorContext";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";

function InstructorCourses({listOfCourses}) {

  const navigate = useNavigate()
  
  
  const {
    setCurrentEditCourseId,
    setCourseCurriculumFormData,
    setCourseLandingFormData,
  } = useContext(InstructorContext)

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
        <Button 
          onClick={() =>  {
            setCourseCurriculumFormData(() => courseCurriculumInitialFormData)
            setCourseLandingFormData(() => courseLandingInitialFormData)
            navigate('/instructor/create-course');
          }
          } 
          className="p-6"
        >
          Create New Course
        </Button>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead >Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className='text-right px-7'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                listOfCourses && listOfCourses.length > 0 
                ? listOfCourses.map(course => (
                  <TableRow key={course?._id}>
                    <TableCell className="font-medium">{course?.title}</TableCell>
                    <TableCell>{course?.students?.length}</TableCell>
                    <TableCell>{(course?.pricing)*(course?.students?.length)}</TableCell>
                    <TableCell className="text-right">
                        <Button 
                          variant = 'ghost' size='sm' 
                          onClick={() => {
                            setCurrentEditCourseId(null)
                            navigate(`/instructor/edit-course/${course?._id}`)
                            setCourseLandingFormData(() => courseLandingInitialFormData)
                            setCourseCurriculumFormData(() => courseCurriculumInitialFormData)
                          }}
                        >
                          <Edit className="h-6 w-6" />
                        </Button>

                        <Button variant = 'ghost' size='sm' className=''>
                            <Delete className="h-6 w-6" />
                        </Button>
                    </TableCell>
                </TableRow>
                ) ) 
                : null
              }
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorCourses;
