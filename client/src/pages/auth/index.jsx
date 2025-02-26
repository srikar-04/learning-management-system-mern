import { signInFormControls, signUpFormControls } from "@/config/index.js";
import CommonForm from "../../components/common-form/index.jsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs.jsx";
import { GraduationCap } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { AuthContext } from "@/context/auth-context/index.jsx";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signUpFormData,
    setSignUpFormData,
    signInFormData,
    setSignInFormData,
    handleRegisterUser,
    handleLoginUser
  } = useContext(AuthContext);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const validSignInForm = () => {
    return signInFormData && signInFormData.userEmail !== '' && signInFormData.password !== ''
  }

  const validSignUpForm = () => {
    return signUpFormData && signUpFormData.userEmail !== '' && signUpFormData.password !== '' && signUpFormData.userName !== ''
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={'/'} className="flex items-center justify-center">
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

          {/* THIS IS SIGNIN TAB */}
          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign In to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to acess your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 ">
                <CommonForm
                  formControls={signInFormControls}
                  buttonText="Sign In"
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled = {!validSignInForm()}
                  handleSubmit={(e) => handleLoginUser(e)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* THIS IS SIGNUP TAB */}
          <TabsContent className="w-full " value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 ">
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText="Sign Up"
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled = {!validSignUpForm()}
                  handleSubmit={(e) => handleRegisterUser(e)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
