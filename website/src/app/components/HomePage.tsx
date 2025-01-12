"use client";

import React from 'react';
import Link from 'next/link';

export const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Willkommen bei Ferien-Planung</h1>
        <p className="text-xl mb-8">
          Planen Sie Ihre Ferien und Brückentage effizient mit unserem Ferien-Planer.
        </p>
        <div className="space-y-4">
          <Link 
            href="https://app.ferien-planung.de" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Zum Ferien-Planer
          </Link>
          <div className="mt-4">
            <Link 
              href="/states" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Oder informieren Sie sich über die Ferientermine in Ihrem Bundesland
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 