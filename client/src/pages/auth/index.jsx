import { signUpFormControls } from "@/config/index.js";
import CommonForm from "../../components/common-form/index.jsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs.jsx";
import { GraduationCap } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">LMS Learn</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
            {/* specifies list of tabs */}
          <TabsList className="min-w-full border grid grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

            {/* specifies the content of a particular tab */}
          <TabsContent value="signin">signin</TabsContent>
          <TabsContent className="w-full " value="signup">
            <CommonForm formControls={signUpFormControls} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
