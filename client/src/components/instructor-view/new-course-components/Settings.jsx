import { Label } from "../../../components/ui/label.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card.jsx";
import React, { useContext, useState } from "react";
import { Input } from "../../../components/ui/input.jsx";
import { InstructorContext } from "@/context/instructor-context/instructorContext.jsx";
import { mediaUploadService } from "../../../services/services.js";
import { MultiStepLoader } from "@/components/ui/multi-step-loader.jsx";
import { Button } from "@/components/ui/button.jsx";

function Settings() {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);

  const [loading, setLoading] = useState(false);

  const loadingStates = [
    {
      text: "uploading file",
    },
    {
      text: "fetching details",
    },
  ];

  const handleImageUploadChange = async (e) => {
    setLoading(true);
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);
      try {
        const response = await mediaUploadService(imageFormData);
        console.log(response);

        if (response.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response.data.url,
          });
          setLoading(false)
        }
      } catch (error) {
        console.log("error while uploading image, in settings.jsx file", error);
        setLoading(false);
      }
    }
  }

  console.log(courseLandingFormData, 'courseLandingFormData');

  const handleImageDelete = () => {
    setCourseLandingFormData((prevData) => ({ ...prevData, image: null }));
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <MultiStepLoader
            loadingStates={loadingStates}
            loading={loading}
            duration={1500}
          />
        ) : courseLandingFormData?.image ? (
          <>
            <img
            src={courseLandingFormData.image}
            alt="Course Image"
            // onLoad tells whether the image is completely loaded or not
            onLoad={() => setLoading(false)}
            className="w-full h-auto object-cover"
          />
          <div>
            <Button 
              className='mt-4'
              variant="destructive"
              onClick={handleImageDelete}
            >
              Delete Image
            </Button>
          </div>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <Label>Upload Course Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUploadChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Settings;
