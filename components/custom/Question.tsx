"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useUser } from '@clerk/nextjs'; // Clerk for user data
import axios from "axios";

export const Questionnaire: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { user } = useUser(); // Get user data from Clerk

  const handleCheckboxChange = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    if (user) {
      try {
        const response = await axios.post("/api/saveresponse", {
          userId: user.id,
          name: user.fullName || user.username,
          selectedOptions,
        });
        if (response.status === 200) {
          alert("Responses saved successfully!");
        }
      } catch (error) {
        console.error("Failed to save responses", error);
      }
    } else {
      alert("User is not logged in.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 relative">
      <div className="bg-yellow-100 p-4 rounded-md mb-6 flex items-center">
        <UserRoundIcon className="text-yellow-600 w-6 h-6 mr-2" />
        <span>Answer a few questions to improve your content recommendations</span>
      </div>

      <h2 className="text-2xl font-bold mb-4">What fields are you learning for?</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {checkboxOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              value={option.value}
              onCheckedChange={() => handleCheckboxChange(option.value)} // Use onCheckedChange
              checked={selectedOptions.includes(option.value)} // Controlled state
            />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button className="bg-yellow-500 text-black hover:bg-yellow-600" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

const checkboxOptions = [
  { value: "software-development", label: "Software Development" },
  { value: "human-resources", label: "Human Resources" },
  { value: "data-analytics", label: "Data & Analytics" },
  { value: "education-training", label: "Education & Training" },
];

const UserRoundIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
};
