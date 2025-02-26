import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstructorContext } from "../../../context/instructor-context/instructorContext.jsx";
import React, { useContext, useRef, useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch.jsx";
import { Label } from "@/components/ui/label.jsx";
import { courseCurriculumInitialFormData } from "@/config/index.js";
import {
  mediaBulkUploadService,
  mediaDeleteService,
  mediaUploadService,
} from "../../../services/services.js";
import { MultiStepLoader } from "@/components/ui/multi-step-loader.jsx";
import VideoPlayer from "@/components/video-player/VideoPlayer.jsx";
import { Upload } from "lucide-react";

function Curriculum() {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef([]);
  const bulkUploadInputRef = useRef(null)
  const loadingStates = [
    { text: "uploading file" },
    { text: "fetching details" },
    { text: "rendering file data" },
  ];
  const updateLoadingStates = [
    { text: "fetching file" },
    { text: "sending request" },
    { text: "deleting file" },
  ];
  const handleNewLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      { ...courseCurriculumInitialFormData[0] },
    ]);
  };
  const handleCourseTitleChange = (e, index) => {
    const copy = [...courseCurriculumFormData];
    copy[index] = { ...copy[index], title: e.target.value };
    setCourseCurriculumFormData(copy);
  };
  const handleFreePreview = (value, index) => {
    const copy = [...courseCurriculumFormData];
    copy[index] = { ...copy[index], freePreview: value };
    setCourseCurriculumFormData(copy);
  };
  const handleSingleLectureUpload = async (e, index) => {
    const selectedFile = e.target.files[0];
    let videoFormData;
    if (selectedFile) {
      videoFormData = new FormData();
      videoFormData.append("file", selectedFile);
    }
    try {
      setLoading(true);
      const response = await mediaUploadService(videoFormData);
      if (response.success) {
        const copy = [...courseCurriculumFormData];
        copy[index] = {
          ...copy[index],
          videoUrl: response.data.url,
          public_id: response.data.public_id,
        };
        setCourseCurriculumFormData(copy);
        setLoading(false);
      }
    } catch (error) {
      console.log("error in handle upload method, in curriculum file", error);
    }
  };
  const isCourseFormDataValid = () => {
    return courseCurriculumFormData.every(
      (item) =>
        item &&
        typeof item === "object" &&
        item.title?.trim() !== "" &&
        item.videoUrl?.trim() !== ""
    );
  };
  const handleReplaceVideo = async (index) => {
    const copy = [...courseCurriculumFormData];
    const videoPublicId = copy[index]?.public_id;
    setLoading(true);
    await mediaDeleteService(videoPublicId);
    if (fileInputRef.current[index]) {
      fileInputRef.current[index].click();
    }
    setLoading(false);
  };

  const handleDleteLecture = async (index) => {
    let copy = [...courseCurriculumFormData];
    const videoPublicId = copy[index]?.public_id;
    setLoading(true)
    const data = await mediaDeleteService(videoPublicId);
  
    if(data?.success) {
      // copy[index].videoUrl = ""
      copy = copy.filter( (_,currIndex) => currIndex !== index)
      setCourseCurriculumFormData(copy)
    }
    setLoading(false)
  }


  const handleBulkUpload = () => {
    bulkUploadInputRef.current.click()
  }

  const isFormDataEmpty = (array) => {
    return array.every( obj => {
      return Object.entries(obj).every(([key, value])=>{
        if(typeof value === 'boolean') {
          return true
        }
        return value === ''
      })
    })
  }

  async function handleMediaBulkUpload(e) {
    const selectedFiles = Array.from(e.target.files);
    const bulkFormData = new FormData();

    selectedFiles.forEach(fileItem => bulkFormData.append('files', fileItem))

    try {

      setLoading(true)
      const response = await mediaBulkUploadService(bulkFormData)

      console.log(response, 'bulk');
      if(response.success) {
        let copy = isFormDataEmpty(courseCurriculumFormData) ? [] : [...courseCurriculumFormData]

        copy = [
          ...copy,
          ...response?.data.map( (item, index) => ({
            videoUrl: item?.url,
            public_id: item?.public_id,
            title: `Lecture ${index+copy.length+1}`,
            freePreview: false
          }))
        ]

        setCourseCurriculumFormData(copy)

        console.log(copy, 'copied version');
        
      }
      
      setLoading(false)
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <CardHeader className='flex flex-row justify-between'>
        <CardTitle>Create Course Curriculum</CardTitle>
        <div>
          <Input 
            type='file'
            ref={bulkUploadInputRef}
            accept='video/*,.mkv'
            multiple
            className='hidden'
            id='bulk-media-upload'
            onChange={handleMediaBulkUpload}
          />
          <Button
            as='label'
            htmlFor='bulk-media-upload'
            variant='outline'
            className='cursor-pointer'
            onClick={handleBulkUpload}
          >
            <Upload className="w-4 h-4 mr-2"/>
            Bulk Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Button disabled={!isCourseFormDataValid()} onClick={handleNewLecture}>
          Add Lecture
        </Button>
        {loading && (
          <MultiStepLoader
            loadingStates={loadingStates}
            loading={loading}
            duration={2000}
          />
        )}
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
                    <input
                      type="file"
                      ref={(el) => (fileInputRef.current[index] = el)}
                      onChange={(e) => handleSingleLectureUpload(e, index)}
                      accept="video/*,.mkv"
                      style={{ display: "none" }}
                    />
                    <Button
                      className="w-[30%]"
                      onClick={() => handleReplaceVideo(index)}
                    >
                      Replace Video
                    </Button>
                    <Button 
                      className="w-[30%]" 
                      variant="destructive"
                      onClick={() => handleDleteLecture(index)}
                    >
                      Delete Lecture
                    </Button>
                  </div>
                ) : (
                  <div>
                    <input
                    type="file"
                    ref={(el) => (fileInputRef.current[index] = el)}
                    accept="video/*,.mkv"
                    onChange={(e) => handleSingleLectureUpload(e, index)}
                  />
                  </div>
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
