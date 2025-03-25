
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ProfileSetupProps {
  onComplete: (profileData: any) => void;
  gender: "male" | "female";
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete, gender }) => {
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      name,
      age,
      weight,
      height,
      fitnessLevel: "beginner", // Default value
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-arfit-purple">Complete Your Profile</CardTitle>
        <CardDescription className="text-center">
          Tell us a bit about yourself so we can create your personalized plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="glass-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Age: {age} years</Label>
            <Slider
              id="age"
              min={16}
              max={80}
              step={1}
              value={[age]}
              onValueChange={(value) => setAge(value[0])}
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">Weight: {weight} kg</Label>
            <Slider
              id="weight"
              min={40}
              max={150}
              step={1}
              value={[weight]}
              onValueChange={(value) => setWeight(value[0])}
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">Height: {height} cm</Label>
            <Slider
              id="height"
              min={140}
              max={220}
              step={1}
              value={[height]}
              onValueChange={(value) => setHeight(value[0])}
              className="py-4"
            />
          </div>
          
          <Button type="submit" className="w-full glass-button">
            Complete Setup
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSetup;
