import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstructorContext } from "../../../context/instructor-context/instructorContext.jsx";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch.jsx";
import { Label } from "@/components/ui/label.jsx";
import { courseCurriculumInitialFormData } from "@/config/index.js";
import { mediaUploadService } from "../../../services/services.js";
import { MultiStepLoader } from "@/components/ui/multi-step-loader.jsx";
import VideoPlayer from "@/components/video-player/VideoPlayer.jsx";

function Curriculum() {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
  } = useContext(InstructorContext);

  const [loading, setLoading] = useState(false);

  const loadingStates = [
    {
      text: "uploading file",
    },
    {
      text: "fetching details",
    },
    {
      text: "rendering file data",
    },
  ];

  // console.log(courseCurriculumFormData);

  // this adds new lecture everytime "Add New Lecture" button is clicked
  const handleNewLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  };

  const handleCourseTitleChange = (e, index) => {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    copyCourseCurriculumFormData[index] = {
      ...copyCourseCurriculumFormData[index],
      title: e.target.value,
    };
    // setCourseCurriculumFormData(copyCourseCurriculumFormData)
    // console.log(copyCourseCurriculumFormData);
    setCourseCurriculumFormData(copyCourseCurriculumFormData);
  };

  const handleFreePreview = (value, index) => {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    copyCourseCurriculumFormData[index] = {
      ...copyCourseCurriculumFormData[index],
      freePreview: value,
    };
    setCourseCurriculumFormData(copyCourseCurriculumFormData);
  };

  const handleSingleLectureUpload = async (e, index) => {
    console.log(e.target.files);
    const selectedFile = e.target.files[0];

    let videoFormData;
    if (selectedFile) {
      videoFormData = new FormData();
      videoFormData.append("file", selectedFile);
    }

    try {
      setLoading(true);

      const response = await mediaUploadService(videoFormData);
      console.log(response);

      if (response.success) {
        let copyCourseCurriculumFormData = [...courseCurriculumFormData];
        copyCourseCurriculumFormData[index] = {
          ...copyCourseCurriculumFormData[index],
          videoUrl: response?.data.url,
          public_id: response?.data.public_id,
        };
        setCourseCurriculumFormData(copyCourseCurriculumFormData);
        setLoading(false);
      }
    } catch (error) {
      console.log("error in handle upload method, in curriculum file", error);
    }
  };
  // console.log(courseCurriculumFormData, 'main state data');

  const isCourseFormDataValid = () => {
    return courseCurriculumFormData.every((item) => {
      console.log(item, "item in function");
      console.log(typeof item, "type of every item");

      return (
        item &&
        typeof item === "object" &&
        item.title?.trim() !== "" &&
        item.videoUrl?.trim() !== ""
      );
    });
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          disabled={!isCourseFormDataValid()} // 'disabled' not 'disbaled'
          onClick={handleNewLecture}
        >
          Add Lecture
        </Button>
        {loading ? (
          <MultiStepLoader
            loadingStates={loadingStates}
            loading={loading}
            duration={2000}
          />
        ) : null}
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div key={index} className="border p-5 rounded-md">
              <div className="flex items-center gap-5">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  onChange={(e) => handleCourseTitleChange(e, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={courseCurriculumFormData[index]?.freePreview}
                    id={`freePreview-${index + 1}`}
                    onCheckedChange={(value) => handleFreePreview(value, index)}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>

              <div className="mt-4">
                {courseCurriculumFormData[index]?.videoUrl ? (
                  <div className="flex flex-col gap-3">
                    <VideoPlayer
                      url={courseCurriculumFormData[index]?.videoUrl}
                      width="430px"
                      height="260px"
                    />
                    <Button className="w-[30%]">Replace Video</Button>
                    <Button className="w-[30%]" variant="destructive">
                      Delete Lecture
                    </Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*,.mkv"
                    onChange={(e) => handleSingleLectureUpload(e, index)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Curriculum;
