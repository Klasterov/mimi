import React, { useState, useEffect } from 'react';
import type { Detector } from '@/types/detector';
import { getDetectors } from '@/api/detectors';

function DetectorsPage() {
  const [detectors, setDetectors] = useState<Detector[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetectors = async () => {
      try {
        setIsLoading(true);
        const data = await getDetectors();
        setDetectors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load detectors');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetectors();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center">Loading detectors...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="detectors-page">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {detectors.map((detector) => (
          <div
            key={detector.slug}
            className={`detector-card ${detector.bg || 'bg-white'} p-6 rounded-lg shadow`}
          >
            {detector.icon && <img src={detector.icon} alt={detector.title} className="mb-4 h-12" />}
            <h3 className="text-lg font-bold">{detector.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{detector.subtitle}</p>
            {detector.image && (
              <img src={detector.image} alt={detector.title} className="mb-4 rounded w-full" />
            )}
            {detector.detectorExample && (
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <h4 className="font-semibold">{detector.detectorExample.title}</h4>
                <p className="text-sm mt-2">{detector.detectorExample.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetectorsPage;
