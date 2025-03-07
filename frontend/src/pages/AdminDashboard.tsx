import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X, LogOut } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string[];
  year: string;
  details: string[];
  category: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject({ ...project });
    setSelectedImageIndex(0);
  };

  const handleSave = async () => {
    if (!editingProject) return;

    try {
      const updatedProject = {
        ...editingProject,
        image: editingProject.images?.[0] || editingProject.image
      };

      const response = await fetch(`http://localhost:3000/api/projects/${editingProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedProject),
      });

      if (!response.ok) throw new Error('Failed to update project');

      setProjects(projects.map(p => 
        p.id === updatedProject.id ? updatedProject : p
      ));
      toast.success('Project updated successfully!');
      setEditingProject(null);
    } catch (error) {
      toast.error('Failed to update project');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Logout failed');
      
      toast.success('Logged out successfully');
      navigate('/admin');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const handleDetailChange = (index: number, value: string) => {
    if (!editingProject) return;
    const newDetails = [...editingProject.details];
    newDetails[index] = value;
    setEditingProject({ ...editingProject, details: newDetails });
  };

  const handleImageChange = (index: number, value: string) => {
    if (!editingProject || !editingProject.images) return;
    const newImages = [...editingProject.images];
    newImages[index] = value;
    setEditingProject({ ...editingProject, images: newImages });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your photography projects</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="space-y-8">
          {projects.map(project => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900 rounded-xl p-6"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/2 space-y-4">
                  {/* Main Image Display */}
                  <div className="aspect-video relative overflow-hidden rounded-lg">
                    <img
                      src={editingProject?.id === project.id 
                        ? editingProject.images?.[selectedImageIndex] || editingProject.image 
                        : project.images?.[0] || project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Image Thumbnails */}
                  {(editingProject?.id === project.id ? editingProject : project).images && (
                    <div className="grid grid-cols-4 gap-2">
                      {(editingProject?.id === project.id ? editingProject : project).images?.map((img, idx) => (
                        <div
                          key={idx}
                          className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                            selectedImageIndex === idx ? 'border-white' : 'border-transparent'
                          }`}
                          onClick={() => setSelectedImageIndex(idx)}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Image URL Inputs when Editing */}
                  {editingProject?.id === project.id && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-400">Image URLs:</p>
                      {editingProject.images?.map((img, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={img}
                          onChange={(e) => handleImageChange(idx, e.target.value)}
                          className="w-full bg-black border border-zinc-700 rounded px-3 py-2 text-sm"
                          placeholder={`Image URL ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  {editingProject?.id === project.id ? (
                    <>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full bg-black border border-zinc-700 rounded px-4 py-2 text-xl font-bold"
                      />
                      <textarea
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full bg-black border border-zinc-700 rounded px-4 py-2 h-24 resize-none"
                      />
                      <div className="flex gap-4">
                        <input
                          type="text"
                          value={editingProject.year}
                          onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                          className="w-24 bg-black border border-zinc-700 rounded px-3 py-2"
                          placeholder="Year"
                        />
                        <input
                          type="text"
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-32 bg-black border border-zinc-700 rounded px-3 py-2"
                          placeholder="Category"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-400">Details:</p>
                        {editingProject.details.map((detail, index) => (
                          <input
                            key={index}
                            type="text"
                            value={detail}
                            onChange={(e) => handleDetailChange(index, e.target.value)}
                            className="w-full bg-black border border-zinc-700 rounded px-3 py-2 text-sm"
                          />
                        ))}
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditingProject(null)}
                          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold">{project.title}</h2>
                      <p className="text-gray-400">{project.description}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>{project.year}</span>
                        <span>{project.category}</span>
                      </div>
                      <ul className="space-y-1">
                        {project.details.map((detail, index) => (
                          <li key={index} className="text-gray-400">• {detail}</li>
                        ))}
                      </ul>
                      <button
                        onClick={() => handleEdit(project)}
                        className="mt-4 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                      >
                        Edit Project
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;