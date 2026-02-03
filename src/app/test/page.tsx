import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import React from "react";

const TestPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-10">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Component Test</h1>
          <p className="text-sm text-gray-500">
            Testing the floating label animation and states.
          </p>
        </div>

        <div className="space-y-6">
          {/* 1. Standard Test: Empty initially */}
          <FloatingLabelInput 
            label="First Name" 
            id="first-name"
          />

          {/* 2. Pre-filled Test: Label should be floating on load */}
          <FloatingLabelInput 
            label="Email Address" 
            defaultValue="test@example.com" 
            type="email"
          />

           {/* 3. Password Test: ensuring dots don't break layout */}
           <FloatingLabelInput 
            label="Password" 
            type="password"
          />
        </div>

      </div>
    </div>
  );
};

export default TestPage;