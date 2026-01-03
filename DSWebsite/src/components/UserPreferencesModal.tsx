import React, { useState } from 'react';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { FiSettings, FiX } from 'react-icons/fi';

const UserPreferencesModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { preferences, updatePreference } = useUserPreferences();

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleModal}
        className="p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors"
        aria-label="Open user preferences"
      >
        <FiSettings className="text-xl" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">User Preferences</h2>
                <button
                  onClick={toggleModal}
                  className="text-zinc-400 hover:text-white"
                  aria-label="Close preferences"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Theme Preference */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Theme
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => updatePreference('theme', 'light')}
                      className={`px-4 py-2 rounded-md ${
                        preferences.theme === 'light'
                          ? 'bg-blue-600 text-white'
                          : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                      }`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => updatePreference('theme', 'dark')}
                      className={`px-4 py-2 rounded-md ${
                        preferences.theme === 'dark'
                          ? 'bg-blue-600 text-white'
                          : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                      }`}
                    >
                      Dark
                    </button>
                  </div>
                </div>

                {/* Font Size Preference */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Font Size
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => updatePreference('fontSize', 'small')}
                      className={`px-4 py-2 rounded-md ${
                        preferences.fontSize === 'small'
                          ? 'bg-blue-600 text-white'
                          : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                      }`}
                    >
                      Small
                    </button>
                    <button
                      onClick={() => updatePreference('fontSize', 'normal')}
                      className={`px-4 py-2 rounded-md ${
                        preferences.fontSize === 'normal'
                          ? 'bg-blue-600 text-white'
                          : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                      }`}
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => updatePreference('fontSize', 'large')}
                      className={`px-4 py-2 rounded-md ${
                        preferences.fontSize === 'large'
                          ? 'bg-blue-600 text-white'
                          : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                      }`}
                    >
                      Large
                    </button>
                  </div>
                </div>

                {/* Notifications Preference */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-300">
                    Notifications
                  </span>
                  <button
                    onClick={() => updatePreference('notifications', !preferences.notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      preferences.notifications ? 'bg-blue-600' : 'bg-zinc-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Reduced Motion Preference */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-300">
                    Reduced Motion
                  </span>
                  <button
                    onClick={() => updatePreference('reducedMotion', !preferences.reducedMotion)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      preferences.reducedMotion ? 'bg-blue-600' : 'bg-zinc-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        preferences.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPreferencesModal;