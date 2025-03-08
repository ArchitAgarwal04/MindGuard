"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

// Validation Schema
const signupSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  licenseNumber: z.string().min(6, "License Number must be valid"),
  specialization: z.string().min(3, "Specialization is required"),
  experience: z.string().min(1, "Experience is required"),
  clinicName: z.string().min(3, "Clinic Name is required"),
  clinicAddress: z.string().min(10, "Clinic Address is required"),
  consultationFee: z.string().min(1, "Fee is required"),
  availableTimings: z.string().min(3, "Available Timings are required"),
});

export default function DoctorSignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Doctor Signup Data:", data);
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-background p-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="w-full max-w-lg p-6 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Doctor Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Details */}
            <Input {...register("fullName")} placeholder="Full Name" />
            {errors.fullName && <p className="text-destructive text-sm">{errors.fullName.message}</p>}

            <Input {...register("email")} type="email" placeholder="Email" />
            {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}

            <Input {...register("phone")} type="tel" placeholder="Phone Number" />
            {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}

            <Input {...register("password")} type="password" placeholder="Password" />
            {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}

            {/* Professional Details */}
            <Input {...register("licenseNumber")} placeholder="Medical License Number" />
            {errors.licenseNumber && <p className="text-destructive text-sm">{errors.licenseNumber.message}</p>}

            <Input {...register("specialization")} placeholder="Specialization (e.g., Cardiologist)" />
            {errors.specialization && <p className="text-destructive text-sm">{errors.specialization.message}</p>}

            <Input {...register("experience")} type="number" placeholder="Years of Experience" />
            {errors.experience && <p className="text-destructive text-sm">{errors.experience.message}</p>}

            {/* Clinic Details */}
            <Input {...register("clinicName")} placeholder="Clinic Name" />
            {errors.clinicName && <p className="text-destructive text-sm">{errors.clinicName.message}</p>}

            <Textarea {...register("clinicAddress")} placeholder="Clinic Address" />
            {errors.clinicAddress && <p className="text-destructive text-sm">{errors.clinicAddress.message}</p>}

            <Input {...register("consultationFee")} type="number" placeholder="Consultation Fee (in ₹)" />
            {errors.consultationFee && <p className="text-destructive text-sm">{errors.consultationFee.message}</p>}

            <Input {...register("availableTimings")} placeholder="Available Timings (e.g., 10 AM - 6 PM)" />
            {errors.availableTimings && <p className="text-destructive text-sm">{errors.availableTimings.message}</p>}

            <Button type="submit" className="w-full">
              Register as Doctor
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
