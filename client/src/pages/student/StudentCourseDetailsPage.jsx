import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/video-player/VideoPlayer";
import { studentContext } from "@/context/student-context/studentContext";
import { createPaymentService, fetchStudentCourseDetailsService } from "@/services/services";
import { AnimatePresence, motion } from "framer-motion";
import {
  BaggageClaim,
  CheckCircle,
  Globe,
  Lock,
  PlayCircle,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import UseAnimations from "react-useanimations";
import alertTriangle from "react-useanimations/lib/alertTriangle";
import airplay from "react-useanimations/lib/airplay";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AuthContext } from "@/context/auth-context";

function StudentCourseDetailsPage() {
  const {
    currentCourseId,
    setCurrentCourseId,
    currentCourseDetails,
    setCurrentCourseDetails,
  } = useContext(studentContext);

  const [loading, setLoading] = useState(true);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false)
  const [freePreviewVideoUrl, setFreePreviewVideoUrl] = useState([])
  // const [isCoursePurchased, setIsCoursePurchased] = useState(false)
  const navigate = useNavigate();

  const { id } = useParams();
  const location = useLocation();
  const [approvalUrl, setApprovalUrl] = useState('')

  function isValidMongoId(id) {
    return typeof id === "string" && /^[a-f\d]{24}$/i.test(id);
  }

  // useEffect(() => {
  //   if (location.pathname.includes("courses")) {
  //     setCurrentCourseDetails(null);
  //     setCurrentCourseId('');
  //   }
  // }, []);

  useEffect(() => {
  if (id && isValidMongoId(id)) {
    setCurrentCourseId(id);
  } else {
    console.warn("id is not valid ObjectId");
    setCurrentCourseId(null); // or skip fetching
  }
}, [id]);


  const fetchCurrentCourseDetails = async () => {
    // console.log('fetching data using id');
    try {

      
      if (!currentCourseId ) {
        console.error('cannot find course id, cannot fetch course details');
        setLoading(false);
        return;
      }

      if(!isValidMongoId(currentCourseId)) {
        console.error('invalid course id, cannot fetch course details');
        setLoading(false);
        return;
      }

      const response = await fetchStudentCourseDetailsService(currentCourseId, auth?.user?._id);

      // console.log(response, 'reponse in useEffect');

      if (response?.success) {
        if(response?.isCoursePurchased === false) {
          setCurrentCourseDetails(response.data)
        } else {
          // setIsCoursePurchased(true)
          navigate(`/course-progress`, {replace: true}) 
          // navigate(`/course-progress/${currentCourseId}`, {replace: true}) 
        }
        // setCurrentCourseDetails(response.data);
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

  const handleFreePreviewDialog = (index) => {

    const curriculumItem = currentCourseDetails?.curriculum[index]

    if(!curriculumItem) {
      console.error('curriculum Item not found')
      return
    }

    if(!curriculumItem?.freePreview) {
      return
    }

    if(!curriculumItem?.videoUrl) {
      return
    }

    setFreePreviewVideoUrl( prev => 
      prev.includes(curriculumItem?.videoUrl) ? prev : [...prev, curriculumItem?.videoUrl]
    )
  }

  useEffect( () => {
    if(freePreviewVideoUrl && freePreviewVideoUrl.length > 0) {
      setShowFreePreviewDialog(true)
    }
  }, [freePreviewVideoUrl])

  // console.log(freePreviewVideoUrl, 'video url for free preview');
  // console.log(showFreePreviewDialog, 'show dialog state');
  

  const getIndexOfFreePreview =
    currentCourseDetails !== null
    ? currentCourseDetails?.curriculum?.findIndex((item) => item.freePreview)
    : -1;

  // console.log(getIndexOfFreePreview, "free preview index");
  // console.log(currentCourseDetails?.curriculum[getIndexOfFreePreview], 'free preview index course');

  console.log(currentCourseDetails, "current course details");

  if (loading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          className=" h-screen w-full flex items-center justify-center"
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

  const { userId,
  userName,
  userEmail,
  orderStatus,
  paymentMethod,
  paymentStatus,
  orderDate,
  paymentId,
  payerId,
  instructorId,
  instructorName,
  courseImage,
  courseTitle,
  courseId,
  coursePricing,} = useContext(studentContext)

  const {auth} = useContext(AuthContext)

  async function handleCreatePayment() {
    console.log(currentCourseDetails?._id, 'current course id before creating payment');
    
    const paymentPayload = {
      userId: auth?.user?._id,
      userName:  auth?.user?.userName,
      userEmail: auth?.user?.userEmail,
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'initiated',
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: currentCourseDetails?.instructorId,
      instructorName: currentCourseDetails?.instructorName,
      courseImage: currentCourseDetails?.image,
      courseTitle: currentCourseDetails?.title,
      courseId: currentCourseDetails?._id,
      coursePricing: currentCourseDetails?.pricing,
    }

    console.log(paymentPayload, 'paymentPayload'); 
    const response = await createPaymentService(paymentPayload)
    console.log(response, 'response after creating payment');
    

    if(response?.success) {
      sessionStorage.setItem('currentOrderId', JSON.stringify(response?.data?.orderId))
      setApprovalUrl(response?.data?.approvedUrl)
    }
  }

  if(approvalUrl !== '') {
    window.location.href = approvalUrl
  }

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

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <main className="flex-grow">
            <Card>
              <CardHeader>
                <CardTitle>What you will learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {currentCourseDetails?.objectives
                    .split(",")
                    .map((objective, index) => (
                      <li className="flex items-start" key={index}>
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="my-8">
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                {currentCourseDetails?.curriculum?.map(
                  (curriculumItem, index) => (
                    <li
                      key={index}
                      className={`flex items-center mb-4`}
                      onClick={() => handleFreePreviewDialog(index)}
                    >
                      {curriculumItem?.freePreview ? (
                        <PlayCircle className="mr-2 h-4 w-4 cursor-pointer" />
                      ) : (
                        <Lock className="mr-2 h-4 w-4 cursor-not-allowed" />
                      )}
                      <span className={`${curriculumItem?.freePreview ? 'cursor-pointer' : 'cursor-not-allowed'}`}>{curriculumItem?.title}</span>
                    </li>
                  )
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                {
                  currentCourseDetails?.
                  description                  
                }
              </CardContent>
            </Card>
          </main>

          <aside className="w-full md:w-[500px] flex-shrink-0">
              <Card className='sticky top-4'>
                <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                  <span>
                    <UseAnimations animation={airplay} size={36} />
                  </span>
                  <span>
                    Free Preview
                  </span>
                </CardTitle>
                </CardHeader>
                <CardContent className="">
                  <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                    {
                      getIndexOfFreePreview !== -1
                      ? (
                        <VideoPlayer 
                        url={
                          currentCourseDetails?.curriculum[getIndexOfFreePreview].videoUrl 
                        }
                      />
                      )
                      : (
                        <div className="w-full h-full flex items-center justify-center text-black">
                          <span>No Free Preview Found</span>
                          <UseAnimations animation={alertTriangle} size={56} />
                        </div>
                      )
                    }
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full items-center justify-between">
                    <div className="font-bold text-2xl">${currentCourseDetails?.pricing}</div>                 
                    <div>
                      <Button 
                        className='transition-all hover:shadow-lg hover:scale-110 hover:duration-500 hover:bg-gray-800 hover:text-white'
                        onClick={handleCreatePayment}
                      >
                        <span>
                          <BaggageClaim size={44} strokeWidth={2} />
                        </span>
                        Buy Now
                      </Button>
                    </div>

                  </div>
                </CardFooter>
              </Card>
          </aside>
        </div>

        <Dialog open={showFreePreviewDialog}
          onOpenChange={() => {
            setShowFreePreviewDialog(false)
            setFreePreviewVideoUrl([])
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex gap-2 items-center">
                <span>
                  <UseAnimations animation={airplay} size={36} />
                </span>
                <span>
                  Free Preview
                </span>
              </DialogTitle>
            </DialogHeader>
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                  {freePreviewVideoUrl && showFreePreviewDialog ?(
                      <VideoPlayer
                        url={
                          freePreviewVideoUrl
                        }
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-black">
                        <span>No Free Preview Found</span>
                        <UseAnimations animation={alertTriangle} size={56} />
                      </div>
                    )}
                </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AnimatePresence>
  );
}

export default StudentCourseDetailsPage;
