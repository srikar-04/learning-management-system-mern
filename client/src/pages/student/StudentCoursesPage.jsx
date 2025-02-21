import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { filterOptions, sortOptions } from "../../config/index.js";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchStudentCourseListService } from "@/services/services.js";
import { studentContext } from "@/context/student-context/studentContext.jsx";
import { Card, CardContent, CardTitle } from "@/components/ui/card.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function StudentCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000000");
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const navigate = useNavigate()

  const { studentCourseList, setStudentCourseList } =
    useContext(studentContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const fetchAllStudentCouses = async (filter, sort) => {
    let queryObj = { sortBy: sort };

    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        queryObj[key] = value.join(",");
      }
    });

    const query = new URLSearchParams(queryObj);
    // console.log(query.toString(), 'query sending to services in main page');

    const response = await fetchStudentCourseListService(query);

    // console.log(response, 'final response in main page');

    if (response.success) {
      setStudentCourseList(response.data);
    }
  };

  const createSearchPraramsHelper = (filter) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filter)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }

    return queryParams.join("&");
  };

  useEffect(() => {
    setLoading(true);
    const buildQueryStringForFilters = createSearchPraramsHelper(filter);

    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    setLoading(true);
    if (filter && filter !== null && sort && sort !== null) {
      fetchAllStudentCouses(filter, sort);
    }
    setLoading(false);
  }, [filter, sort]);

  useEffect(() => {
    setLoading(true);
    setSort("price-lowtohigh");

    // console.log(sort, 'sort state in useEffect');

    const storedFilter = sessionStorage.getItem("filters");

    const initializeFilterState =
      storedFilter && storedFilter !== "null" ? JSON.parse(storedFilter) : {};

    // console.log(
    //   initializeFilterState,
    //   "value to be stored in state, currently in useEffect"
    // );

    setFilter(() => initializeFilterState);
    setLoading(false);
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  const handleFilterOnChange = (item, option) => {
    let copiedFilter = {};
    if (filter !== null) {
      copiedFilter = { ...filter };
    } else {
      copiedFilter[item] = [option.id];
    }

    if (!copiedFilter[item]) {
      copiedFilter[item] = [option.id];
    } else {
      const indexOfCurrentOption = copiedFilter[item].indexOf(option.id);

      if (indexOfCurrentOption === -1) {
        copiedFilter[item].push(option.id);
      } else {
        copiedFilter[item].splice(indexOfCurrentOption, 1);
        // Remove the key if array is empty
        if (copiedFilter[item].length === 0) {
          delete copiedFilter[item];
        }
      }
    }

    setFilter(copiedFilter);
    sessionStorage.setItem("filters", JSON.stringify(copiedFilter));
  };

  // console.log(filter, "filter state");
  
  if(loading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          className="w-full h-screen flex items-center justify-center"
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0.7, transition: { duration: 0.5 } }}
        >
          <ClipLoader
            color="#000000"
            loading={loading}
            size={50}
            speedMultiplier={4}
            data-testid="loader"
        />
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }} 
        className="mx-6 p-4"
      >
        <h1 className="text-3xl font-bold mb-4">All Courses</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <aside className="w-full md:w-64 space-y-4">
            <div className="space-y-4">
              {Object.keys(filterOptions).map((keyItem) => (
                <div key={keyItem.id} className="p-4 space-y-4">
                  <h3 className="font-bold mb-3">{keyItem.toUpperCase()}</h3>
                  <div className="grid gap-2 mt-2">
                    {filterOptions[keyItem].map((option) => (
                      <Label
                        key={option.id}
                        className="flex font-medium items-center gap-3"
                      >
                        <Checkbox
                          checked={
                            filter &&
                            Object.keys(filter).length > 0 &&
                            filter[keyItem] &&
                            filter[keyItem].indexOf(option.id) > -1
                          }
                          onCheckedChange={() =>
                            handleFilterOnChange(keyItem, option)
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
              <span className="text-sm text-gray-800 font-bold">{studentCourseList.length} Results</span>
            </div>

            <div className="space-y-4">
              { 
                studentCourseList && studentCourseList.length > 0 ? (
                studentCourseList.map((courseItem) => (
                  <Card onClick = {() => navigate(`/course/details/${courseItem?._id}`)} className="cursor-pointer" key={courseItem?._id}>
                    <CardContent className="flex gap-4 p-4">
                      <div className="w-48 h-32 flex-shrink-0">
                        <img
                          className="w-full h-full object-cover"
                          src={courseItem?.image}
                          alt="course thumbnail"
                        />
                      </div>

                      <div className="flex-1 ">
                        <CardTitle className="text-xl mb-2">
                          {courseItem?.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mb-1">
                          created by{" "}
                          <span className="font-bold text-gray-700">
                            {courseItem?.instructorName}
                          </span>
                        </p>
                        <p className="text-[17px] text-gray-600 mt-3 mb-2">
                          {`${courseItem?.curriculum?.length} ${
                            courseItem?.curriculum?.length <= 1
                              ? "Lecture"
                              : "Lectures"
                          } - ${courseItem?.level?.toUpperCase()} Level`}
                        </p>
                        <p className="font-bold text-lg">
                          ${courseItem?.pricing}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <h1 className="font-extrabold text-4xl">No Courses Found</h1>
              )}
            </div>
          </main>
        </div>
      </motion.div>
      </AnimatePresence>
  );
}

export default StudentCoursesPage;
