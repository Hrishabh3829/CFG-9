import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    darkMode: false,
    language: 'en',
    timeZone: 'UTC',
    autoSave: true,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSettingChange = (setting, value) => {
    setSettings({ ...settings, [setting]: value });
    setSnackbar({
      open: true,
      message: 'Settings updated successfully',
      severity: 'success',
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
  ];

  const timeZones = [
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Settings</h2>

      {/* Notifications Card */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-xl font-semibold mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-gray-500">Receive notifications for important updates</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              className="w-5 h-5"
            />
          </div>
          <hr />
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Email Alerts</p>
              <p className="text-sm text-gray-500">Receive email notifications for task assignments</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={(e) => handleSettingChange('emailAlerts', e.target.checked)}
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>

      {/* Appearance Card */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-xl font-semibold mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-gray-500">Toggle dark theme for the application</p>
            </div>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
              className="w-5 h-5"
            />
          </div>
          <hr />
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Language</p>
              <p className="text-sm text-gray-500">Select your preferred language</p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* System Preferences Card */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-xl font-semibold mb-4">System Preferences</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Time Zone</p>
              <p className="text-sm text-gray-500">Set your local time zone</p>
            </div>
            <select
              value={settings.timeZone}
              onChange={(e) => handleSettingChange('timeZone', e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              {timeZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
          <hr />
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Auto Save</p>
              <p className="text-sm text-gray-500">Automatically save changes</p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={() =>
            setSnackbar({
              open: true,
              message: 'All settings have been saved',
              severity: 'success',
            })
          }
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Save All Settings
        </button>
      </div>

      {/* Snackbar */}
      {snackbar.open && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          <span>{snackbar.message}</span>
          <button onClick={handleSnackbarClose} className="ml-3 font-bold">✕</button>
        </div>
      )}
    </div>
  );
};

export default Settings;
