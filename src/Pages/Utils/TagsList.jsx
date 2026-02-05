function TagsList({ tags }) {
  if (!tags || tags.length === 0) return null;

  const visibleTags = tags.slice(0, 2);
  const remainingCount = tags.length - 2;

  return (
    <>
      {visibleTags.map((tag) => (
        <span key={tag._id} className="badge bg-label-info me-1">
          {tag.name}
        </span>
      ))}

      {remainingCount > 0 && (
        <span className="badge bg-label-secondary">+{remainingCount} more</span>
      )}
    </>
  );
}

export default TagsList;
