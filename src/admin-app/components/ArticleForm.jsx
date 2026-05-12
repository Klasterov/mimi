import React, { useEffect, useState } from 'react';
import api from '../api';

const ARTICLE_STATUS_LABELS = {
  draft: 'Черновик',
  published: 'Опубликовано',
  archived: 'Архив',
};

const createInitialFormData = () => ({
  slug: '',
  title: '',
  description: '',
  content: '',
  author: '',
  date: new Date().toISOString().split('T')[0],
  tag: '',
  image: '',
  category: 'article',
  status: 'draft',
  likes: 0,
  tgLink: '',
  dzenLink: '',
  youtubeLink: '',
  vkLink: '',
  sections: [
    {
      id: 'intro',
      title: 'Введение',
      content: '',
      image: '',
    },
  ],
});

function ArticleForm() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState(createInitialFormData);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await api.get('/articles');
      setArticles(response.data.data || []);
    } catch (err) {
      setError('Не удалось загрузить статьи.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article) => {
    setFormData({
      slug: article.slug || '',
      title: article.title || '',
      description: article.description || '',
      content: article.content || '',
      author: article.author || '',
      date: article.date || new Date().toISOString().split('T')[0],
      tag: article.tag || '',
      image: article.image || '',
      category: article.category || 'article',
      status: article.status || 'draft',
      likes: article.likes || 0,
      tgLink: article.tg_link || '',
      dzenLink: article.dzen_link || '',
      youtubeLink: article.youtube_link || '',
      vkLink: article.vk_link || '',
      sections: article.sections || [
        { id: 'intro', title: 'Введение', content: '', image: '' },
      ],
    });
    setEditingId(article.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить эту статью?')) return;
    setError('');
    setSuccess('');
    try {
      await api.delete(`/articles/${id}`);
      setSuccess('Статья успешно удалена.');
      fetchArticles();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.error || err.message || 'Не удалось удалить статью.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = {
        slug: formData.slug,
        title: formData.title,
        description: formData.description,
        content: formData.content,
        author: formData.author,
        date: formData.date,
        tag: formData.tag,
        image: formData.image,
        category: formData.category,
        status: formData.status,
        likes: parseInt(formData.likes, 10) || 0,
        tg_link: formData.tgLink,
        dzen_link: formData.dzenLink,
        youtube_link: formData.youtubeLink,
        vk_link: formData.vkLink,
        sections: formData.sections,
        published_at: formData.status === 'published' ? new Date().toISOString() : null,
      };

      if (editingId) {
        await api.put(`/articles/${editingId}`, payload);
        setSuccess('Статья успешно обновлена.');
      } else {
        await api.post('/articles', payload);
        setSuccess('Статья успешно создана.');
      }

      setShowForm(false);
      setEditingId(null);
      setFormData(createInitialFormData());
      fetchArticles();
    } catch (err) {
      console.error('Save error:', err);
      setError(err.response?.data?.error || err.message || 'Не удалось сохранить статью.');
    }
  };

  const updateNestedField = (path, value) => {
    setFormData((prev) => {
      const keys = path.split('.');
      const obj = { ...prev };
      let current = obj;

      for (let i = 0; i < keys.length - 1; i += 1) {
        const key = keys[i];
        if (Array.isArray(current[key])) {
          current[key] = current[key].map((item) =>
            typeof item === 'object' ? { ...item } : item
          );
        } else if (typeof current[key] === 'object' && current[key] !== null) {
          current[key] = { ...current[key] };
        }
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;
      return obj;
    });
  };

  const addSection = () => {
    const newId = `section-${Date.now()}`;
    updateNestedField('sections', [
      ...formData.sections,
      {
        id: newId,
        title: '',
        content: '',
        image: '',
      },
    ]);
  };

  const removeSection = (index) => {
    updateNestedField(
      'sections',
      formData.sections.filter((_, i) => i !== index)
    );
  };

  const updateSection = (index, field, value) => {
    const sections = [...formData.sections];
    sections[index][field] = value;
    updateNestedField('sections', sections);
  };

  if (loading) return <div className="article-form-container">Загрузка...</div>;

  return (
    <div className="article-form-container">
      <div className="article-header">
        <h2>Управление статьями</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingId(null);
            setFormData(createInitialFormData());
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Отмена' : '+ Добавить статью'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <form className="article-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Основная информация</h3>
            <div className="form-grid">
              <div>
                <label>Слаг *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  placeholder="article-slug"
                />
              </div>
              <div className="full-width">
                <label>Заголовок *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Заголовок статьи"
                />
              </div>
              <div>
                <label>Автор</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Имя автора"
                />
              </div>
              <div>
                <label>Дата</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label>Тег</label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="например, Умный дом"
                />
              </div>
              <div>
                <label>Категория</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="article">Статья</option>
                  <option value="news">Новости</option>
                  <option value="blog">Блог</option>
                  <option value="tutorial">Инструкция</option>
                </select>
              </div>
              <div>
                <label>Статус</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="draft">Черновик</option>
                  <option value="published">Опубликовано</option>
                  <option value="archived">Архив</option>
                </select>
              </div>
              <div className="full-width">
                <label>Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Короткое описание для превью..."
                />
              </div>
              <div className="full-width">
                <label>Вступительный текст</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  placeholder="Основной текст статьи или вступление..."
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Изображения</h3>
            <div className="form-grid">
              <div className="full-width">
                <label>URL главного изображения</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/article/main.jpg"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Ссылки на соцсети</h3>
            <div className="form-grid">
              <div>
                <label>Ссылка Telegram</label>
                <input
                  type="url"
                  value={formData.tgLink}
                  onChange={(e) => setFormData({ ...formData, tgLink: e.target.value })}
                  placeholder="https://t.me/..."
                />
              </div>
              <div>
                <label>Ссылка Dzen</label>
                <input
                  type="url"
                  value={formData.dzenLink}
                  onChange={(e) => setFormData({ ...formData, dzenLink: e.target.value })}
                  placeholder="https://dzen.ru/..."
                />
              </div>
              <div>
                <label>Ссылка YouTube</label>
                <input
                  type="url"
                  value={formData.youtubeLink}
                  onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })}
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div>
                <label>Ссылка VK</label>
                <input
                  type="url"
                  value={formData.vkLink}
                  onChange={(e) => setFormData({ ...formData, vkLink: e.target.value })}
                  placeholder="https://vk.com/..."
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Секции статьи</h3>
            {formData.sections?.map((section, idx) => (
              <div key={section.id} className="subsection">
                <div className="subsection-header">
                  <h4>Секция {idx + 1}</h4>
                  {formData.sections.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-small"
                      onClick={() => removeSection(idx)}
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
                      onChange={(e) => updateSection(idx, 'id', e.target.value)}
                      placeholder="section-id"
                    />
                  </div>
                  <div>
                    <label>Заголовок секции</label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(idx, 'title', e.target.value)}
                      placeholder="Заголовок секции"
                    />
                  </div>
                  <div className="full-width">
                    <label>Контент секции</label>
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(idx, 'content', e.target.value)}
                      rows={5}
                      placeholder="Контент секции..."
                    />
                  </div>
                  <div className="full-width">
                    <label>URL изображения секции</label>
                    <input
                      type="text"
                      value={section.image}
                      onChange={(e) => updateSection(idx, 'image', e.target.value)}
                      placeholder="/images/article/section.jpg"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addSection}>
              + Добавить секцию
            </button>
          </div>

          <div className="form-section">
            <h3>Метаинформация</h3>
            <div className="form-grid">
              <div>
                <label>Количество лайков</label>
                <input
                  type="number"
                  value={formData.likes}
                  onChange={(e) =>
                    setFormData({ ...formData, likes: parseInt(e.target.value, 10) || 0 })
                  }
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Сохранить статью' : 'Создать статью'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Отмена
            </button>
          </div>
        </form>
      )}

      <div className="articles-list">
        <h3>Все статьи ({articles.length})</h3>
        {articles.length === 0 ? (
          <p>Статей пока нет</p>
        ) : (
          <div className="articles-table">
            {articles.map((article) => (
              <div key={article.id} className="article-card">
                <div className="article-card-header">
                  <h4>{article.title}</h4>
                  <span className={`status ${article.status}`}>
                    {ARTICLE_STATUS_LABELS[article.status] || 'Черновик'}
                  </span>
                </div>
                <p className="article-description">{article.description}</p>
                <div className="article-meta">
                  {article.date && <span>{article.date}</span>}
                  {article.tag && <span>{article.tag}</span>}
                  {article.author && <span>{article.author}</span>}
                </div>
                <div className="article-actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(article)}>
                    Изменить
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(article.id)}>
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

export default ArticleForm;
