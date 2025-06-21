import React, { useState } from 'react';
import { LayoutDashboard, FolderOpen, User, Settings, LogOut, FileText, CheckCircle, XCircle, Clock, Upload, Eye } from 'lucide-react';
const mockAcceptedProjects = [
  {
    id: 101,
    name: "Food Security Program",
    estimatedFunds: 75000,
    status: "in-progress",
    documents: []
  },
  {
    id: 102,
    name: "Women Empowerment Initiative",
    estimatedFunds: 95000,
    status: "completed",
    documents: ["proposal.pdf", "budget.xlsx"]
  }
];
export default mockAcceptedProjects;