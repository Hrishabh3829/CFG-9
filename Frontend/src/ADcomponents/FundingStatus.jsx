import React from 'react';
import { FaMoneyCheckAlt, FaDonate } from 'react-icons/fa';

const FundingStatus = () => {
  const fundingData = {
    granted: 1200000, // Amount donor agreed to fund
    received: 900000, // Amount actually received by NGO
    lastUpdated: 'June 20, 2025'
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 min-h-[200px] mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Funding Status</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Granted */}
        <div className="flex items-center space-x-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
          <FaMoneyCheckAlt className="text-yellow-600 text-3xl" />
          <div>
            <p className="text-gray-600 dark:text-yellow-300">Total Fund Granted</p>
            <p className="text-xl font-bold text-gray-800 dark:text-yellow-200">₹{fundingData.granted.toLocaleString()}</p>
          </div>
        </div>

        {/* Total Received */}
        <div className="flex items-center space-x-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg">
          <FaDonate className="text-green-700 text-3xl" />
          <div>
            <p className="text-gray-600 dark:text-green-300">Fund Received</p>
            <p className="text-xl font-bold text-gray-800 dark:text-green-200">₹{fundingData.received.toLocaleString()}</p>
          </div>
        </div>

        {/* Difference */}
        <div className="flex items-center space-x-4 p-4 bg-red-100 dark:bg-red-900 rounded-lg">
          <FaDonate className="text-red-600 text-3xl" />
          <div>
            <p className="text-gray-600 dark:text-red-300">Pending Amount</p>
            <p className="text-xl font-bold text-gray-800 dark:text-red-200">
              ₹{(fundingData.granted - fundingData.received).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Last updated: {fundingData.lastUpdated}</p>
    </div>
  );
};

export default FundingStatus;
