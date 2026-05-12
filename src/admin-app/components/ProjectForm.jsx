import React, { useEffect, useState } from 'react';
import api, { uploadAPI } from '../api';

const ALLOWED_TAGS = [
  'Освещение',
  'Климат',
  'Мультимедиа',
  'Безопасность',
  'Шторы',
  'Кинотеатр',
];

const PROJECT_STATUS_LABELS = {
  active: 'Активный',
  draft: 'Черновик',
  archived: 'Архив',
};

const createEmptyStep = () => ({
  title: '',
  content: '',
});

const createEmptySection = () => ({
  id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title: '',
  tag: ALLOWED_TAGS[0],
  image: '',
  text: [''],
});

const createInitialFormData = () => ({
  slug: '',
  title: '',
  description: '',
  image: '',
  imageMain: '',
  tags: [],
  objectType: '',
  area: '',
  city: '',
  heroImage: '',
  status: 'active',
  steps: [],
  sections: [],
  relatedProjectSlugsText: '',
});

function normalizeTextArray(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return [''];
  }

  const items = value.map((item) => String(item ?? ''));
  return items.length ? items : [''];
}

function normalizeProject(project) {
  return {
    slug: project.slug || '',
    title: project.title || project.name || '',
    description: project.description || '',
    image: project.image || project.image_url || '',
    imageMain:
      project.image_main || project.imageMain || project.image || project.image_url || '',
    tags: Array.isArray(project.tags)
      ? project.tags.filter((tag) => ALLOWED_TAGS.includes(tag))
      : [],
    objectType: project.object_type || project.objectType || '',
    area: project.area || '',
    city: project.city || '',
    heroImage:
      project.hero_image ||
      project.heroImage ||
      project.image_main ||
      project.imageMain ||
      project.image ||
      '',
    status: project.status || 'active',
    steps:
      Array.isArray(project.steps) && project.steps.length > 0
        ? project.steps.map((step) => ({
            title: step?.title || '',
            content: step?.content || '',
          }))
        : [],
    sections:
      Array.isArray(project.sections) && project.sections.length > 0
        ? project.sections.map((section, index) => ({
            id: section?.id || `section-${index + 1}`,
            title: section?.title || '',
            tag: ALLOWED_TAGS.includes(section?.tag) ? section.tag : ALLOWED_TAGS[0],
            image: section?.image || '',
            text: normalizeTextArray(section?.text),
          }))
        : [],
    relatedProjectSlugsText: Array.isArray(project.related_project_slugs)
      ? project.related_project_slugs.join('\n')
      : Array.isArray(project.relatedProjectSlugs)
        ? project.relatedProjectSlugs.join('\n')
        : '',
  };
}

function ProjectForm() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingField, setUploadingField] = useState('');
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState(createInitialFormData);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get('/projects');
      setProjects(response.data.data || []);
    } catch (err) {
      setError('Не удалось загрузить проекты.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredProjects = () => {
    if (!search.trim()) return projects;
    const searchLower = search.toLowerCase();
    return projects.filter(
      (project) =>
        (project.title || project.name || '').toLowerCase().includes(searchLower) ||
        (project.slug || '').toLowerCase().includes(searchLower) ||
        (project.description || '').toLowerCase().includes(searchLower) ||
        (project.city || '').toLowerCase().includes(searchLower),
    );
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(createInitialFormData());
  };

  const handleToggleForm = () => {
    setError('');
    setSuccess('');

    if (showForm) {
      setShowForm(false);
      resetForm();
      return;
    }

    resetForm();
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setError('');
    setSuccess('');
    setEditingId(project.id);
    setFormData(normalizeProject(project));
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить этот проект?')) return;

    setError('');
    setSuccess('');

    try {
      await api.delete(`/projects/${id}`);
      setSuccess('Проект успешно удалён.');
      fetchProjects();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.error || err.message || 'Не удалось удалить проект.');
    }
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateStep = (index, field, value) => {
    setFormData((prev) => {
      const steps = [...prev.steps];
      steps[index] = { ...steps[index], [field]: value };
      return { ...prev, steps };
    });
  };

  const addStep = () => {
    setFormData((prev) => ({ ...prev, steps: [...prev.steps, createEmptyStep()] }));
  };

  const removeStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const updateSection = (index, field, value) => {
    setFormData((prev) => {
      const sections = [...prev.sections];
      sections[index] = { ...sections[index], [field]: value };
      return { ...prev, sections };
    });
  };

  const updateSectionText = (sectionIndex, textIndex, value) => {
    setFormData((prev) => {
      const sections = [...prev.sections];
      const currentText = [...sections[sectionIndex].text];
      currentText[textIndex] = value;
      sections[sectionIndex] = { ...sections[sectionIndex], text: currentText };
      return { ...prev, sections };
    });
  };

  const addSection = () => {
    setFormData((prev) => ({ ...prev, sections: [...prev.sections, createEmptySection()] }));
  };

  const removeSection = (index) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const addSectionParagraph = (sectionIndex) => {
    setFormData((prev) => {
      const sections = [...prev.sections];
      sections[sectionIndex] = {
        ...sections[sectionIndex],
        text: [...sections[sectionIndex].text, ''],
      };
      return { ...prev, sections };
    });
  };

  const removeSectionParagraph = (sectionIndex, textIndex) => {
    setFormData((prev) => {
      const sections = [...prev.sections];
      const nextText = sections[sectionIndex].text.filter((_, index) => index !== textIndex);
      sections[sectionIndex] = {
        ...sections[sectionIndex],
        text: nextText.length > 0 ? nextText : [''],
      };
      return { ...prev, sections };
    });
  };

  const toggleTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((item) => item !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleImageUpload = async (field, file, sectionIndex = null) => {
    if (!file) return;

    const uploadKey = sectionIndex === null ? field : `${field}-${sectionIndex}`;
    setUploadingField(uploadKey);
    setError('');

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);
      uploadFormData.append('folder', 'projects');

      const response = await uploadAPI.uploadImage(uploadFormData);
      const imageUrl = response.data.file.url;

      if (sectionIndex === null) {
        updateField(field, imageUrl);
      } else {
        updateSection(sectionIndex, field, imageUrl);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || err.message || 'Не удалось загрузить изображение.');
    } finally {
      setUploadingField('');
    }
  };

  const buildPayload = () => ({
    name: formData.title.trim(),
    slug: formData.slug.trim(),
    title: formData.title.trim(),
    description: formData.description.trim(),
    image: formData.image.trim(),
    image_url: formData.image.trim(),
    imageMain: formData.imageMain.trim(),
    tags: formData.tags,
    objectType: formData.objectType.trim(),
    area: formData.area.trim(),
    city: formData.city.trim(),
    heroImage: formData.heroImage.trim(),
    status: formData.status,
    steps: formData.steps
      .map((step) => ({
        title: step.title.trim(),
        content: step.content.trim(),
      }))
      .filter((step) => step.title || step.content),
    sections: formData.sections
      .map((section) => ({
        id: section.id.trim(),
        title: section.title.trim(),
        tag: section.tag,
        image: section.image.trim(),
        text: section.text.map((item) => item.trim()).filter(Boolean),
      }))
      .filter((section) => section.id || section.title || section.image || section.text.length),
    relatedProjectSlugs: formData.relatedProjectSlugsText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.slug.trim() || !formData.title.trim()) {
      setError('Слаг и заголовок обязательны.');
      return;
    }

    if (formData.tags.length === 0) {
      setError('Выберите хотя бы один тег проекта.');
      return;
    }

    try {
      const payload = buildPayload();

      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
        setSuccess('Проект успешно обновлён.');
      } else {
        await api.post('/projects', payload);
        setSuccess('Проект успешно создан.');
      }

      setShowForm(false);
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error('Save error:', err);
      setError(err.response?.data?.error || err.message || 'Не удалось сохранить проект.');
    }
  };

  if (loading) {
    return <div className="project-form-container">Загрузка...</div>;
  }

  return (
    <div className="project-form-container">
      <div className="project-header">
        <h2>Управление проектами</h2>
        <button className="btn btn-primary" onClick={handleToggleForm}>
          {showForm ? 'Отмена' : '+ Добавить проект'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <form className="project-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Основная информация</h3>
            <div className="form-grid">
              <div>
                <label>Слаг *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => updateField('slug', e.target.value)}
                  required
                  placeholder="big-house-family"
                />
              </div>
              <div>
                <label>Статус</label>
                <select
                  value={formData.status}
                  onChange={(e) => updateField('status', e.target.value)}
                >
                  <option value="active">Активный</option>
                  <option value="draft">Черновик</option>
                  <option value="archived">Архив</option>
                </select>
              </div>
              <div className="full-width">
                <label>Заголовок *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  required
                  placeholder="Большой дом для всей семьи"
                />
              </div>
              <div className="full-width">
                <label>Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={3}
                  placeholder="Короткое описание проекта для карточки"
                />
              </div>
              <div>
                <label>Тип объекта</label>
                <input
                  type="text"
                  value={formData.objectType}
                  onChange={(e) => updateField('objectType', e.target.value)}
                  placeholder="Дом"
                />
              </div>
              <div>
                <label>Площадь</label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => updateField('area', e.target.value)}
                  placeholder="650 м2"
                />
              </div>
              <div>
                <label>Город</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="Москва"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Теги</h3>
            <div className="tags-grid">
              {ALLOWED_TAGS.map((tag) => (
                <label
                  key={tag}
                  className={`tag-chip ${formData.tags.includes(tag) ? 'active' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={formData.tags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Изображения</h3>
            <div className="form-grid">
              <div className="full-width">
                <label>Изображение карточки</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => updateField('image', e.target.value)}
                  placeholder="/images/cases/3.jpg"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('image', e.target.files?.[0])}
                />
                {uploadingField === 'image' && (
                  <span className="field-help">Загрузка изображения...</span>
                )}
              </div>
              <div className="full-width">
                <label>Главное изображение портфолио</label>
                <input
                  type="text"
                  value={formData.imageMain}
                  onChange={(e) => updateField('imageMain', e.target.value)}
                  placeholder="/images/cases/1-big.jpg"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('imageMain', e.target.files?.[0])}
                />
                {uploadingField === 'imageMain' && (
                  <span className="field-help">Загрузка изображения...</span>
                )}
              </div>
              <div className="full-width">
                <label>Hero-изображение</label>
                <input
                  type="text"
                  value={formData.heroImage}
                  onChange={(e) => updateField('heroImage', e.target.value)}
                  placeholder="/images/project-page/hero.jpg"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('heroImage', e.target.files?.[0])}
                />
                {uploadingField === 'heroImage' && (
                  <span className="field-help">Загрузка изображения...</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Этапы работ</h3>
            {formData.steps.length === 0 && (
              <p className="empty-note">
                Этапов пока нет. Добавьте их, если у проекта есть блок "Этапы работ".
              </p>
            )}
            {formData.steps.map((step, index) => (
              <div key={`step-${index}`} className="subsection">
                <div className="subsection-header">
                  <h4>Этап {index + 1}</h4>
                  {formData.steps.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-small"
                      onClick={() => removeStep(index)}
                    >
                      Удалить
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div>
                    <label>Заголовок</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => updateStep(index, 'title', e.target.value)}
                      placeholder="Проектирование"
                    />
                  </div>
                  <div className="full-width">
                    <label>Контент</label>
                    <textarea
                      value={step.content}
                      onChange={(e) => updateStep(index, 'content', e.target.value)}
                      rows={4}
                      placeholder="Текст этапа"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addStep}>
              + Добавить этап
            </button>
          </div>

          <div className="form-section">
            <h3>Секции проекта</h3>
            {formData.sections.length === 0 && (
              <p className="empty-note">
                Секций пока нет. Добавьте только те блоки, которые должны быть на странице проекта.
              </p>
            )}
            {formData.sections.map((section, sectionIndex) => (
              <div key={section.id || `section-${sectionIndex}`} className="subsection">
                <div className="subsection-header">
                  <h4>Секция {sectionIndex + 1}</h4>
                  {formData.sections.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-small"
                      onClick={() => removeSection(sectionIndex)}
                    >
                      Удалить
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div>
                    <label>ID секции</label>
                    <input
                      type="text"
                      value={section.id}
                      onChange={(e) => updateSection(sectionIndex, 'id', e.target.value)}
                      placeholder="lighting"
                    />
                  </div>
                  <div>
                    <label>Заголовок</label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                      placeholder="Освещение"
                    />
                  </div>
                  <div>
                    <label>Тег</label>
                    <select
                      value={section.tag}
                      onChange={(e) => updateSection(sectionIndex, 'tag', e.target.value)}
                    >
                      {ALLOWED_TAGS.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="full-width">
                    <label>Изображение секции</label>
                    <input
                      type="text"
                      value={section.image}
                      onChange={(e) => updateSection(sectionIndex, 'image', e.target.value)}
                      placeholder="/images/project-page/1.jpg"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload('image', e.target.files?.[0], sectionIndex)
                      }
                    />
                    {uploadingField === `image-${sectionIndex}` && (
                      <span className="field-help">Загрузка изображения...</span>
                    )}
                  </div>
                  <div className="full-width">
                    <label>Текстовые абзацы</label>
                    <div className="stack-list">
                      {section.text.map((paragraph, textIndex) => (
                        <div key={`${section.id}-text-${textIndex}`} className="inline-row">
                          <textarea
                            value={paragraph}
                            onChange={(e) =>
                              updateSectionText(sectionIndex, textIndex, e.target.value)
                            }
                            rows={3}
                            placeholder="Абзац текста"
                          />
                          {section.text.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-danger btn-small"
                              onClick={() => removeSectionParagraph(sectionIndex, textIndex)}
                            >
                              Удалить
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => addSectionParagraph(sectionIndex)}
                    >
                      + Добавить абзац
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addSection}>
              + Добавить секцию
            </button>
          </div>

          <div className="form-section">
            <h3>Связанные проекты</h3>
            <div className="form-grid">
              <div className="full-width">
                <label>Слаги связанных проектов</label>
                <textarea
                  value={formData.relatedProjectSlugsText}
                  onChange={(e) => updateField('relatedProjectSlugsText', e.target.value)}
                  rows={4}
                  placeholder={'park-avenue-house\ncountry-house-family'}
                />
                <span className="field-help">Один слаг на строку.</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Сохранить проект' : 'Создать проект'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleToggleForm}>
              Отмена
            </button>
          </div>
        </form>
      )}

      <div className="projects-list">
        <h3>Все проекты ({projects.length})</h3>
        
        <div className="projects-filters">
          <input
            type="text"
            placeholder="Поиск по названию, городу или slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {getFilteredProjects().length === 0 ? (
          <p>{search ? 'Проектов не найдено' : 'Проектов пока нет'}</p>
        ) : (
          <div className="projects-table">
            {getFilteredProjects().map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-card-header">
                  <h4>{project.title || project.name}</h4>
                  <span className={`status ${project.status || 'active'}`}>
                    {PROJECT_STATUS_LABELS[project.status || 'active'] || 'Активный'}
                  </span>
                </div>
                <p className="project-description">
                  {project.description || 'Описание пока не заполнено'}
                </p>
                <div className="project-meta">
                  {project.slug && <span>{project.slug}</span>}
                  {(project.object_type || project.objectType) && (
                    <span>{project.object_type || project.objectType}</span>
                  )}
                  {project.area && <span>{project.area}</span>}
                  {project.city && <span>{project.city}</span>}
                </div>
                <div className="project-tags">
                  {(Array.isArray(project.tags) ? project.tags : []).map((tag) => (
                    <span key={`${project.id}-${tag}`} className="project-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(project)}>
                    Изменить
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(project.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectForm;
