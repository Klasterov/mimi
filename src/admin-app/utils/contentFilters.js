export const normalizeSearch = (value) => String(value ?? '').trim().toLocaleLowerCase('ru');

export function matchesEquipment(item, search) {
  const query = normalizeSearch(search);
  return [item.cap, item.model, item.descr, item.full_description]
    .some((value) => normalizeSearch(value).includes(query));
}

export function matchesDetector(item, search) {
  const query = normalizeSearch(search);
  return [item.title, item.subtitle, item.slug]
    .some((value) => normalizeSearch(value).includes(query));
}

export function matchesArticle(article, search) {
  const query = normalizeSearch(search);
  return [article.title, article.description].some((value) => normalizeSearch(value).includes(query));
}

export function projectField(project, key) {
  if (key === 'objectType') return String(project.object_type || project.objectType || '').trim();
  if (key === 'housingClass') return String(project.housing_class || project.housingClass || '').trim();
  return String(project[key] ?? '').trim();
}

export function matchesProject(project, search, filters) {
  const query = normalizeSearch(search);
  if (![project.title || project.name, project.slug, project.description, project.city]
    .some((value) => normalizeSearch(value).includes(query))) return false;
  if (['objectType', 'housingClass', 'city'].some((key) => filters[key] && projectField(project, key) !== filters[key])) return false;
  if (filters.tag && !(project.tags || []).includes(filters.tag)) return false;
  if (filters.areaMin !== '' || filters.areaMax !== '') {
    const match = String(project.area ?? '').replace(/\s/g, '').replace(',', '.').match(/^\d+(?:\.\d+)?/);
    if (!match) return false;
    const area = Number(match[0]);
    if (filters.areaMin !== '' && area < Number(filters.areaMin)) return false;
    if (filters.areaMax !== '' && area > Number(filters.areaMax)) return false;
  }
  return true;
}

// Load every page so filters also find records beyond the first API page.
export async function loadAllItems(api, entity) {
  const items = [];
  let page = 1;
  let pages = 1;
  do {
    const response = await api.get(`/${entity}`, { params: { page, limit: 100 } });
    items.push(...(Array.isArray(response.data) ? response.data : response.data.data || []));
    pages = Number(response.data.pagination?.pages) || 1;
    page += 1;
  } while (page <= pages);
  return items;
}
