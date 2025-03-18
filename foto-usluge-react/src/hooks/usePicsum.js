const usePicsum = (categoryName) => {
  // Generate a seed from the category name
  const seed = categoryName
    ? categoryName.replace(/\s+/g, "-").toLowerCase()
    : "default";
  // Return a Picsum URL with fixed dimensions (adjust as needed)
  const imageUrl = `https://picsum.photos/seed/${seed}/600/400`;
  return imageUrl;
};

export default usePicsum;
