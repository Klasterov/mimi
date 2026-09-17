export function isVisibleByEntity(entity, item) {
  if (entity === 'articles') return item.status === 'published';
  if (entity === 'projects') return item.status === 'active';
  return item.status !== false;
}

export function getHiddenStatus(entity) {
  if (entity === 'articles') return 'draft';
  if (entity === 'projects') return 'draft';
  return false;
}

export function getVisibleStatus(entity) {
  if (entity === 'articles') return 'published';
  if (entity === 'projects') return 'active';
  return true;
}

export async function toggleOrderedVisibility({ entity, item, items, update }) {
  const wasVisible = isVisibleByEntity(entity, item);
  const visibleItems = items
    .filter((candidate) => candidate.id !== item.id && isVisibleByEntity(entity, candidate))
    .sort((left, right) => Number(left.sort_order ?? 0) - Number(right.sort_order ?? 0));

  if (wasVisible) {
    await update(item.id, { status: getHiddenStatus(entity), sort_order: 0 });
  } else {
    await update(item.id, {
      status: getVisibleStatus(entity),
      sort_order: visibleItems.length + 1,
    });
    visibleItems.push(item);
  }

  for (const [index, candidate] of visibleItems.entries()) {
    const sortOrder = index + 1;
    if (Number(candidate.sort_order) === sortOrder) continue;
    await update(candidate.id, { sort_order: sortOrder });
  }
}
