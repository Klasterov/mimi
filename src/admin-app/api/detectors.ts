import type { Detector } from '@/types/detector';
import api from '../api';

export async function getDetectors(): Promise<Detector[]> {
  try {
    const response = await api.get('/detectors');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching detectors:', error);
    return [];
  }
}

export async function getDetectorBySlug(slug: string): Promise<Detector | null> {
  try {
    const response = await api.get('/detectors', { params: { search: slug } });
    const detectors = response.data.data || [];
    return detectors.find((d: Detector) => d.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching detector:', error);
    return null;
  }
}

export async function createDetector(detector: Detector): Promise<Detector | null> {
  try {
    const response = await api.post('/detectors', detector);
    return response.data;
  } catch (error) {
    console.error('Error creating detector:', error);
    throw error;
  }
}

export async function updateDetector(id: string | number, detector: Partial<Detector>): Promise<Detector | null> {
  try {
    const response = await api.put(`/detectors/${id}`, detector);
    return response.data;
  } catch (error) {
    console.error('Error updating detector:', error);
    throw error;
  }
}

export async function deleteDetector(id: string | number): Promise<boolean> {
  try {
    await api.delete(`/detectors/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting detector:', error);
    throw error;
  }
}
