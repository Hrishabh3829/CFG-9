import React, { useState } from 'react';
import { LayoutDashboard, FolderOpen, User, Settings, LogOut, FileText, CheckCircle, XCircle, Clock, Upload, Eye } from 'lucide-react';
const mockProjects = [
  {
    id: 1,
    name: "Clean Water Initiative",
    description: "Providing clean water access to rural communities",
    estimatedFunds: 50000,
    status: "pending",
    submittedDate: "2024-06-15"
  },
  {
    id: 2,
    name: "Education for All",
    description: "Building schools in underserved areas",
    estimatedFunds: 120000,
    status: "pending",
    submittedDate: "2024-06-18"
  },
  {
    id: 3,
    name: "Healthcare Outreach",
    description: "Mobile health clinics for remote villages",
    estimatedFunds: 80000,
    status: "pending",
    submittedDate: "2024-06-20"
  }
];
export default mockProjects;