import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { studentContext } from "@/context/student-context/studentContext";
import { fetchStudentCourseDetailsService } from "@/services/services";
import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useParams } from "react-router-dom";

function StudentCourseDetailsPage() {
  const {
    currentCourseId,
    setCurrentCouseId,
    currentCourseDetails,
    setCurrentCourseDetails,
  } = useContext(studentContext);

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    // console.log('updating id state');

    if (id) {
      setCurrentCouseId(() => id);
    }
  }, [id]);

  const fetchCurrentCourseDetails = async () => {
    // console.log('fetching data using id');
    try {
      const response = await fetchStudentCourseDetailsService(currentCourseId);

      // console.log(response, 'reponse in useEffect');

      if (response?.success) {
        setCurrentCourseDetails(response.data);
      } else {
        console.error("data not found for specific course");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(
        "error while fetching course details, in studentCourseDetailsPage",
        error
      );
    }
  };

  useEffect(() => {
    fetchCurrentCourseDetails();
  }, [currentCourseId]);

  console.log(currentCourseDetails, "current course details");

  if (loading)
    return (
      <AnimatePresence mode="wait">
        <motion.div
          className=" h-screen w-full flex items-center justify-center"
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            colors={["#000000", "#000000", "#000000", "#000000", "#000000"]}
            wrapperClass={{}}
          />
        </motion.div>
      </AnimatePresence>
    );

  return (
    <AnimatePresence mode="wait">
      <motion.div className="mx-auto p-4 ">
        <div className="bg-gray-900 text-white p-8 rounded-t-lg">
          <h1 className="text-3xl font-bold mb-4">
            {currentCourseDetails?.title}
          </h1>
          <p className="text-xl mb-4">{currentCourseDetails?.subtitle}</p>

          <div className="flex items-center space-x-4 mt-2 text-sm">
            <span>Created By {currentCourseDetails?.instructorName}</span>
            <span>Created On {currentCourseDetails?.date.split("T")[0]}</span>
            <span className="flex items-center">
              <Globe className="mr-1 h-4 w-4" />
              {currentCourseDetails?.primaryLanguage}
            </span>
            <span>
              {currentCourseDetails?.students.length}{" "}
              {currentCourseDetails?.students.length > 1
                ? "Students"
                : currentCourseDetails?.students.length === 0
                ? "Students"
                : "Student"}{" "}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <main className="flex-grow">
            <Card>
              <CardHeader>
                <CardTitle>What you will learn</CardTitle>
              </CardHeader>
            </Card>
          </main>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default StudentCourseDetailsPage;
